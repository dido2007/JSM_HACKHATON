/**
 * @module GetStartedButton
 * @description A button component that can be used to initiate the login process past the intial page.
 */

"use client";

import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/../src/components/ui/dialog";
import { LoginForm } from "@/../src/components/auth/login-form";

interface GetStartedButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

/**
 * A button component that can be used to initiate the login process.
 * @param {GetStartedButtonProps} props - The props for the GetStartedButton component.
 * @returns {JSX.Element} The rendered GetStartedButton component.
 */
export const GetStartedButton = ({
  children,
  mode = "redirect",
  asChild,
}: GetStartedButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/login");
  };

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

/**
 * Documentation generated with GitHub Copilot.
 */
