/**
 * @module Header
 * @description This module contains the Header component, which displays a title and a label.
 */

/* eslint-disable react/no-unescaped-entities */
import { Karla } from "next/font/google";

import { combineClassNames } from "@/../src/lib/style-utils";

const font = Karla({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

/**
 * The Header component displays a title and a label.
 * @param {HeaderProps} props - The props for the Header component.
 * @param {string} props.label - The label to be displayed.
 * @returns {JSX.Element} The rendered Header component.
 */
export const Header = ({ label }: HeaderProps): JSX.Element => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1
        className={combineClassNames("text-3xl font-semibold", font.className)}
      >
        Savin'IT
      </h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};

/**
 * Documentation generated with GitHub Copilot.
 */
