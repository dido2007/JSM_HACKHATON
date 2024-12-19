/**
 * Module Description:
 *
 * Defines validation schemas for user-related operations such as settings update,
 * password change, and authentication actions using Zod library. Ensures data integrity
 * and enforces validation rules for user inputs.
 *
 * All schema validation expanded and adapted from:
 * @see https://github.com/colinhacks/zod
 * @see https://zod.dev/
 */

import * as z from "zod";

/**
 * Schema for validating user account settings form data.
 */
export const AccountSettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    email: z.optional(z.string().email("Invalid email format")),
    password: z.optional(
      z.string().min(8, "Password must have at least 6 characters")
    ),
    newPassword: z.optional(
      z.string().min(8, "New Password must have at least 6 characters")
    ),
  })
  .refine((data) => !(data.password && !data.newPassword), {
    message: "New password is required if password is provided.",
    path: ["newPassword"],
  })
  .refine((data) => !(data.newPassword && !data.password), {
    message: "Current password is required if new password is provided.",
    path: ["password"],
  });

/**
 * Schema for validating new password form data.
 */
export const NewPasswordSchema = z.object({
  password: z.string().min(6, "Minimum of 6 characters required"),
});

/**
 * Schema for validating password reset request form data.
 */
export const PasswordResetSchema = z.object({
  email: z.string().email("Invalid email format"),
});

/**
 * Schema for validating sign-in form data.
 */
export const SignInSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password is required"),
  code: z.optional(z.string()), // For two-factor authentication if applicable
});

/**
 * Schema for validating sign-up form data.
 */
export const SignUpSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Minimum 6 characters required"),
  name: z.string().min(1, "Name is required"),
});

/**
 * Documentation generated with GitHub Copilot.
 */
