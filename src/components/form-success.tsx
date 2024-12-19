/**
 * This module exports the FormSuccess component.
 * It displays a success message with a check icon.
 */

import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="bg-green-900 p-3 rounded-md flex items-center gap-x-2 text-sm text-green-500">
      <CheckCircledIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

/**
 * Documentation generated with GitHub Copilot.
 */
