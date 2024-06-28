"use server";

import { resetPasswordUseCase } from "@/use-cases/users";
import { unauthenticatedAction } from "@/lib/safe-action";
import { z } from "zod";

export const resetPasswordAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z.string().email(),
    })
  )
  .handler(async ({ input }) => {
    await resetPasswordUseCase(input.email);
  });
