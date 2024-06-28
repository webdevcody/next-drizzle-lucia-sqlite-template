import { generateRandomToken } from "@/data-access/utils";
import { db } from "@/db";
import { verifyEmailTokens } from "@/db/schema";
import { UserId } from "@/use-cases/types";
import { eq } from "drizzle-orm";
import { TOKEN_LENGTH, TOKEN_TTL } from "./magic-links";

export async function createVerifyEmailToken(userId: UserId) {
  const token = await generateRandomToken(TOKEN_LENGTH);
  const tokenExpiresAt = new Date(Date.now() + TOKEN_TTL);

  await db
    .insert(verifyEmailTokens)
    .values({
      userId,
      token,
      tokenExpiresAt,
    })
    .onConflictDoUpdate({
      target: verifyEmailTokens.id,
      set: {
        token,
        tokenExpiresAt,
      },
    });

  return token;
}

export async function getVerifyEmailToken(token: string) {
  const existingToken = await db.query.verifyEmailTokens.findFirst({
    where: eq(verifyEmailTokens.token, token),
  });

  return existingToken;
}

export async function deleteVerifyEmailToken(token: string) {
  await db.delete(verifyEmailTokens).where(eq(verifyEmailTokens.token, token));
}
