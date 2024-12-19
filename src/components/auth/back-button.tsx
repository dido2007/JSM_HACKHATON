/**
 * @module BackButton
 * @description A button component that serves as a back button with a link.
 */

"use client";

import Link from "next/link";

import { Button } from "@/../src/components/ui/button";

interface BackButtonProps {
  href: string;
  label: string;
}

/**
 * Renders a back button with a link.
 * @param {BackButtonProps} props - The props for the BackButton component.
 * @returns {JSX.Element} The rendered BackButton component.
 */
export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button variant="link" className="font-normal w-full" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};

/**
 * Documentation generated with GitHub Copilot.
 */
