import { invalidateSession, validateRequest }  from "@/lib/auth";
import { redirect } from "next/navigation";

export async function GET(): Promise<Response> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { session } = await validateRequest();
  if (!session) {
    redirect("/sign-in");
  }
  await invalidateSession(session.id);
 
  redirect("/signed-out");
}