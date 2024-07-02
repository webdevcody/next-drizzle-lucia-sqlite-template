import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");
  redirect("/sign-in");
}
