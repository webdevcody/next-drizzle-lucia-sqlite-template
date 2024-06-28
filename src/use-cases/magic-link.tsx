import { applicationName } from "@/app-config";
import {
  deleteMagicToken,
  getMagicLinkByToken,
  upsertMagicLink,
} from "@/data-access/magic-links";
import { createProfile } from "@/data-access/profiles";
import {
  createMagicUser,
  getUserByEmail,
  setEmailVerified,
} from "@/data-access/users";
import { MagicLinkEmail } from "@/emails/magic-link";
import { sendEmail } from "@/lib/email";
import { generateRandomName } from "@/lib/names";
import { animals, colors, uniqueNamesGenerator } from "unique-names-generator";

export async function sendMagicLinkUseCase(email: string) {
  const token = await upsertMagicLink(email);

  await sendEmail(
    email,
    `Your magic login link for ${applicationName}`,
    <MagicLinkEmail token={token} />
  );
}

export async function loginWithMagicLinkUseCase(token: string) {
  console.log("----");
  console.log("----");
  console.log("----");
  console.log("----");
  console.log("token", token);
  const magicLinkInfo = await getMagicLinkByToken(token);
  console.log(magicLinkInfo);
  if (!magicLinkInfo) {
    throw new Error("Token not found");
  }

  if (magicLinkInfo.tokenExpiresAt! < new Date()) {
    throw new Error("Token expired");
  }

  const existingUser = await getUserByEmail(magicLinkInfo.email);

  if (existingUser) {
    await setEmailVerified(existingUser.id);
    await deleteMagicToken(token);
    return existingUser;
  } else {
    const newUser = await createMagicUser(magicLinkInfo.email);
    await deleteMagicToken(token);
    await createProfile(newUser.id, generateRandomName());
    return newUser;
  }
}
