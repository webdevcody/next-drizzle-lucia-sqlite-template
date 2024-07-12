"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookIcon, MenuIcon, SearchIcon, UsersIcon } from "lucide-react";
import Link from "next/link";

export function MenuButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MenuIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-2">
        <DropdownMenuItem asChild>
          <Link
            href="/dashboard"
            className="flex cursor-pointer items-center gap-2"
          >
            <UsersIcon className="h-4 w-4" /> Your Groups
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/browse"
            className="flex cursor-pointer items-center gap-2"
          >
            <SearchIcon className="h-4 w-4" /> Browse Groups
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/docs" className="flex cursor-pointer items-center gap-2">
            <BookIcon className="h-4 w-4" /> API Docs
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
