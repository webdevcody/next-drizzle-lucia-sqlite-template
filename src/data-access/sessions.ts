import { db } from "@/db";
import { sessions } from "@/db/schema";
import { UserId } from "@/use-cases/types";
import { eq } from "drizzle-orm";

export async function deleteSessionForUser(userId: UserId, trx = db) {
  await trx.delete(sessions).where(eq(sessions.userId, userId));
}
