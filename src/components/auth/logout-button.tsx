/**
 * @module LogoutButton
 * @description Function used for logging out.
 */

"use client";

import { signOutAction } from "@/../actions/authentication-actions";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    signOutAction();
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

/**
 * Documentation generated with GitHub Copilot.
 */
