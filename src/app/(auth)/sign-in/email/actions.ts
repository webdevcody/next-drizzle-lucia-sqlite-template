"use server";

import { afterLoginUrl } from "@/app-config";
import { setSession } from "@/app/api/login/google/callback/route";
import { rateLimitByKey } from "@/lib/limiter";
import { unauthenticatedAction } from "@/lib/safe-action";
import { signInUseCase } from "@/use-cases/users";
import { redirect } from "next/navigation";
import { z } from "zod";

export const signInAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(8),
    })
  )
  .handler(async ({ input }) => {
    await rateLimitByKey({ key: input.email, limit: 3, window: 10000 });
    const user = await signInUseCase(input.email, input.password);

    if (!user) {
      return {
        errors: "Invalid login.",
      };
    }

    await setSession(user.id);

    redirect(afterLoginUrl);
  });
