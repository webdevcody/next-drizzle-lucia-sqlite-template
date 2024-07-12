import { Button } from "@/components/ui/button";
import { pageTitleStyles } from "@/styles/common";
import Link from "next/link";

export default function VerifySuccess() {
  return (
    <div className="mx-auto max-w-[400px] space-y-6 py-24">
      <h1 className={pageTitleStyles}>Email Successfully Verified</h1>
      <p className="text-xl">
        Your email has been successfully verified. You can now sign in to your
        account.
      </p>

      <Button asChild>
        <Link href="/sign-in">Sign In</Link>
      </Button>
    </div>
  );
}
