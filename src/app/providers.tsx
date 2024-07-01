"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { User } from "lucia";
import AuthProvider from "./auth-provider";

export function Providers({
  children,
  user,
}: {
  children: ReactNode;
  user: User | null;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider user={user}>{children}</AuthProvider>
    </ThemeProvider>
  );
}
