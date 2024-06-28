import { env } from "@/env";
import { assertAuthenticated } from "@/lib/session";
import { createServerActionProcedure } from "zsa";

export class ActionError extends Error {
  constructor(message: string, public code: string) {
    super(message);
  }
}

function shapeErrors({ err }: any) {
  if (err instanceof ActionError || env.NODE_ENV === "development") {
    console.error(err);
    return {
      code: err.code,
      message: `DEV ONLY ENABLED - ${err.message}`,
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
