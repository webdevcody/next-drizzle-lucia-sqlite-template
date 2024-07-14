import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import LoginForm from "./login-form";

export default async function SignInPage() {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

  return <LoginForm />;
}
