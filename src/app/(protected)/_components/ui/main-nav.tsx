/**
 * This module contains is MainNav component, which represents the top navigation bar of the application.
 */

/* eslint-disable react/no-unescaped-entities */

import React from "react";
import Link from "next/link";

import {
  IconJarLogoIcon,
  ActivityLogIcon,
  Crosshair2Icon,
  PieChartIcon,
  BarChartIcon,
  MixerVerticalIcon,
  BackpackIcon,
} from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/../src/components/ui/dropdown-menu";
import { Button } from "@/../src/components/ui/button";

export function MainNav() {
  const linkStyle =
    "text-lg font-bold transition-colors hover:text-green-600 text-muted-foreground";

  return (
    <nav className="flex items-center space-x-5 lg:space-x-4">
      {/* SAVIN'IT DROPDOWN FOR BUDGETS, EXPENSES AND FINANCES */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="link" className={`${linkStyle} focus:outline-none`}>
            SAVIN'IT
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="shadow-lg rounded-lg py-1">
          <DropdownMenuItem>
            <IconJarLogoIcon className="h-5 w-5 mr-2" />
            <Link href="/my-budgets" className={`${linkStyle} block px-4 py-2`}>
              My Budgets
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ActivityLogIcon className="h-5 w-5 mr-2" />
            <Link
              href="/my-expenses"
              className={`${linkStyle} block px-4 py-2`}
            >
              My Expenses
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BackpackIcon className="h-5 w-5 mr-2" />
            <Link
              href="/my-finances"
              className={`${linkStyle} block px-4 py-2`}
            >
              Configure Finances
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* LEARNIN'IT DROPDOWN FOR LEARNING ARTICLES */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="link" className={`${linkStyle} focus:outline-none`}>
            LEARNIN'IT
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="shadow-lg rounded-lg py-1">
          <DropdownMenuItem>
            <Crosshair2Icon className="h-5 w-5 mr-2" />
            <Link
              href="/learn-savings"
              className={`${linkStyle} block px-4 py-2`}
            >
              Learn Savings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PieChartIcon className="h-5 w-5 mr-2" />
            <Link
              href="/learn-budgeting"
              className={`${linkStyle} block px-4 py-2`}
            >
              Learn Budgeting
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BarChartIcon className="h-5 w-5 mr-2" />
            <Link
              href="/learn-investment"
              className={`${linkStyle} block px-4 py-2`}
            >
              Learn Investing
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MixerVerticalIcon className="h-5 w-5 mr-2" />
            <Link href="/learn-debt" className={`${linkStyle} block px-4 py-2`}>
              Learn Debt Management
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* REDIRECT TO GET-STARTED PAGE */}
      <Button variant="link" className={`${linkStyle} focus:outline-none`}>
        <Link href="/get-started">GET-STARTED</Link>
      </Button>
    </nav>
  );
}

export default MainNav;
