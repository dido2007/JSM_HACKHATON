"use client";

import React, { useState } from "react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const linkStyle =
    "text-lg font-bold transition-colors hover:text-green-600 text-muted-foreground";

  return (
    <nav className="relative bg-white ">
      {/* Barre de navigation principale */}
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <span className="text-xl font-bold">Menu</span>
          </Link>
        </div>

        {/* Hamburger button pour les mobiles */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-center w-10 h-10 focus:outline-none"
          >
            <span className="sr-only">Toggle menu</span>
            <div className="space-y-2">
              <span className="block w-8 h-1 bg-gray-800"></span>
              <span className="block w-8 h-1 bg-gray-800"></span>
              <span className="block w-8 h-1 bg-gray-800"></span>
            </div>
          </button>
        </div>

        {/* Liens sur grand écran */}
        <div className="hidden lg:flex space-x-6">
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
                <Link href="/my-expenses" className={`${linkStyle} block px-4 py-2`}>
                  My Expenses
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BackpackIcon className="h-5 w-5 mr-2" />
                <Link href="/my-finances" className={`${linkStyle} block px-4 py-2`}>
                  Configure Finances
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link" className={`${linkStyle} focus:outline-none`}>
                LEARNIN'IT
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="shadow-lg rounded-lg py-1">
              <DropdownMenuItem>
                <Crosshair2Icon className="h-5 w-5 mr-2" />
                <Link href="/learn-savings" className={`${linkStyle} block px-4 py-2`}>
                  Learn Savings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PieChartIcon className="h-5 w-5 mr-2" />
                <Link href="/learn-budgeting" className={`${linkStyle} block px-4 py-2`}>
                  Learn Budgeting
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BarChartIcon className="h-5 w-5 mr-2" />
                <Link href="/learn-investment" className={`${linkStyle} block px-4 py-2`}>
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

          <Link href="/get-started" className={`${linkStyle} link-hover`}>
            Get Started
          </Link>
        </div>
      </div>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-white shadow-md z-10">
          <div className="flex flex-col space-y-4 p-4">
            <Link href="/my-budgets" className="text-gray-800 text-lg">
              My Budgets
            </Link>
            <Link href="/my-expenses" className="text-gray-800 text-lg">
              My Expenses
            </Link>
            <Link href="/my-finances" className="text-gray-800 text-lg">
              Configure Finances
            </Link>
            <div className="border-t pt-4">
              <Link href="/get-started" className="text-primary text-lg font-bold">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default MainNav;