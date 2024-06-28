import { env } from "@/env";
import { assertAuthenticated } from "@/lib/session";
import { createServerActionProcedure } from "zsa";
import { AuthenticationError, EmailInUseError } from "../use-cases/errors";

export class ActionError extends Error {
  constructor(message: string, public code: string) {
    super(message);
  }
}

const whiteListErrors = [EmailInUseError, AuthenticationError];

function shapeErrors({ err }: any) {
  const isAllowedError = whiteListErrors.some((error) => err instanceof error);
  // let's all errors pass through to the UI so debugging locally is easier
  const isDev = env.NODE_ENV === "development";
  if (isAllowedError || isDev) {
    console.error(err);
    return {
      code: err.code ?? "ERROR",
      message: `${isDev ? "DEV ONLY ENABLED - " : ""}${err.message}`,
    };
  } else {
    return {
      code: "ERROR",
      message: "Something went wrong",
    };
  }
}

export const authenticatedAction = createServerActionProcedure()
  .experimental_shapeError(shapeErrors)
  .handler(async () => {
    const user = await assertAuthenticated();
    return { user };
  });

export const unauthenticatedAction = createServerActionProcedure()
  .experimental_shapeError(shapeErrors)
  .handler(async () => {
    return { user: undefined };
  });
