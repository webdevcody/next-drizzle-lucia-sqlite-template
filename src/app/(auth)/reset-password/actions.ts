"use server";

import { unauthenticatedAction } from "@/lib/safe-action";
import { changePasswordUseCase } from "@/use-cases/users";
import { z } from "zod";

export const changePasswordAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      token: z.string(),
      password: z.string().min(8),
    })
  )
  .handler(async ({ input: { token, password } }) => {
    try {
      await changePasswordUseCase(token, password);
    } catch (err) {
      const error = err as Error;
      const errorMessage = error.message.includes("Invalid token")
        ? "The token was invalid or expired. Please try to reset your password again"
        : "Something went wrong";
      throw new Error(errorMessage);
    }
  });
