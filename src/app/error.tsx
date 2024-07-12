"use client";

import { pageTitleStyles } from "@/styles/common";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className="container mx-auto min-h-screen space-y-8 py-12">
      <>
        <h1 className={pageTitleStyles}>Oops! Something went wrong</h1>
        <p className="text-lg">{error.message}</p>
      </>
    </div>
  );
}
