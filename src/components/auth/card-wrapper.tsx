/**
 * @module CardWrapper
 * @description A reusable component that wraps content inside a card with a header and a footer
 * for all the authentication UI components.
 */

"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/../src/components/ui/card";
import { Header } from "@/../src/components/auth/header";
import { BackButton } from "@/../src/components/auth/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};

/**
 * Documentation generated with GitHub Copilot.
 */
