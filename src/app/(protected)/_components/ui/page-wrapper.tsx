/**
 * @module PageWrapper
 * @description A wrapper component for all pages past login stage to have a constant formatting and nav bar.
 */

"use client";

import React, { ReactNode } from "react";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

import { MainNav } from "./main-nav";
import { Skeleton } from "@/../src/components/ui/skeleton";
import { UserButton } from "@/../src/components/auth/user-button";
import { ModeToggle } from "@/../src/app/(protected)/_components/ui/theme-toggle";

interface PageWrapperProps {
  children: ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  const { theme } = useTheme(); // Gets current theme for logo change based on theme.

  const logoPath =
    theme === "dark" ? "/savin-it_logo_BLK.png" : "/savin-it_logo_LGT.png";

  return (
    <>
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          {/* Conditionally renders logo based on theme colouring */}
          <Link href="/dashboard">
            <div className="shrink-0 mr-5">
              <Image
                src={logoPath}
                alt="Savin'IT Logo"
                width={125}
                height={50}
                priority={true}
              />
            </div>
          </Link>
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />
            {/* Skeleton wrapped around UserButton */}
            <Skeleton className="h-12 w-12 rounded-full flex items-center justify-center">
              <UserButton />
            </Skeleton>
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
    </>
  );
};

export default PageWrapper;
