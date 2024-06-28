import "server-only";
import { validateRequest } from "@/lib/auth";
import { cache } from "react";
import { AuthenticationError } from "./errors";

export const getCurrentUser = cache(async () => {
  const session = await validateRequest();
  if (!session.user) {
    return undefined;
  }
  return session.user;
});

export const assertAuthenticated = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new AuthenticationError();
  }
  return user;
};
