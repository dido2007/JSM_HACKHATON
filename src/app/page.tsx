/**
 * This module contains the main page component.
 * It displays the home page of the application.
 *
 * Gradient taken from cssgradient.io
 * @see https://cssgradient.io/
 */

/* eslint-disable react/no-unescaped-entities */
import { Karla } from "next/font/google";

import { Button } from "@/../src/components/ui/button";
import { combineClassNames } from "@/../src/lib/style-utils";
import { GetStartedButton } from "@/../src/components/auth/get-started-button";

const font = Karla({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main className="h-full flex items-center justify-center bg-[linear-gradient(176deg,_rgba(0,36,7,1)_0%,_rgba(34,75,29,1)_25%,_rgba(68,113,51,1)_50%,_rgba(69,163,21,1)_75%,_rgba(70,200,0,1)_100%)]">
      <div className="space-y-6 text-center">
        <h1
          className={combineClassNames(
            "text-6xl font-semibold text-white drop-shadow-md",
            font.className
          )}
        >
          Savin'IT
        </h1>
        <p className="text-white text-lg">
          Where everyday savings and budget are made easy!
        </p>
        <div>
          <GetStartedButton asChild>
            <Button variant="secondary" size="lg">
              Get Started
            </Button>
          </GetStartedButton>
        </div>
      </div>
    </main>
  );
}

/**
 * Documentation generated with GitHub Copilot.
 */
