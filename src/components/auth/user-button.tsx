/**
 * @description Component that represents a user button with dropdown menu options.
 *
 * Source code between Avatar tag taken from Shadcn/ui
 * @see https://ui.shadcn.com/docs/components/avatar
 *
 * Avatar image generated using Notion Avatar Maker.
 * @see https://notion-avatar.vercel.app/
 */

"use client";

import Link from "next/link";

import { ExitIcon, IdCardIcon } from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/../src/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/../src/components/ui/avatar";
import { LogoutButton } from "@/../src/components/auth/logout-button";

export const UserButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="/notion-avatar.png" alt="notion avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-35" align="end">
        <DropdownMenuItem>
          <IdCardIcon className="h-5 w-5 mr-2" />
          <Link
            className="hover:text-green-600 focus:outline-none"
            href="/account-settings"
          >
            Account
          </Link>
        </DropdownMenuItem>
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-5 w-5 mr-2 hover:text-red-600" />
            Sign-Out
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

/**
 * Documentation generated with GitHub Copilot.
 */
