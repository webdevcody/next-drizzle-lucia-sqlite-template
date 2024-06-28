import { generateRandomToken } from "@/data-access/utils";
import { db } from "@/db";
import { magicLinks } from "@/db/schema";
import { eq } from "drizzle-orm";

export const TOKEN_LENGTH = 32;
export const TOKEN_TTL = 1000 * 60 * 5; // 5 min
export const VERIFY_EMAIL_TTL = 1000 * 60 * 60 * 24 * 7; // 7 days

export async function upsertMagicLink(email: string) {
  const token = await generateRandomToken(TOKEN_LENGTH);
  const tokenExpiresAt = new Date(Date.now() + TOKEN_TTL);

  await db
    .insert(magicLinks)
    .values({
      email,
      token,
      tokenExpiresAt,
    })
    .onConflictDoUpdate({
      target: magicLinks.email,
      set: {
        token,
        tokenExpiresAt,
      },
    });

  return token;
}

export async function getMagicLinkByToken(token: string) {
  const existingToken = await db.query.magicLinks.findFirst({
    where: eq(magicLinks.token, token),
  });

  return existingToken;
}

export async function deleteMagicToken(token: string) {
  await db.delete(magicLinks).where(eq(magicLinks.token, token));
}
