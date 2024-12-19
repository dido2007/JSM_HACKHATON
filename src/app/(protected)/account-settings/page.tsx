/**
 * Module Description: This module contains the implementation of the Account Settings page.
 * It allows users to update their email address, password, and enable/disable two-factor authentication.
 */

"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useTransition, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { settings } from "@/../actions/account-settings";

import { Input } from "@/../src/components/ui/input";
import { Switch } from "@/../src/components/ui/switch";
import { FormError } from "@/../src/components/form-error";
import { useCurrentUser } from "@/../hooks/use-current-user";
import { FormSuccess } from "@/../src/components/form-success";

import { Button } from "@/../src/components/ui/button";
import { AccountSettingsSchema } from "@/../schemas/validation-schemas";
import { Card, CardHeader, CardContent } from "@/../src/components/ui/card";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/../src/components/ui/form";
import PageWrapper from "@/../src/app/(protected)/_components/ui/page-wrapper";

const AccountSettingsPage = () => {
  const user = useCurrentUser();

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AccountSettingsSchema>>({
    resolver: zodResolver(AccountSettingsSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      email: user?.email || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  });

  /**
   * Handles the form submission.
   * @param values - The form values.
   */
  const onSubmit = (values: z.infer<typeof AccountSettingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <PageWrapper>
      <Card className="flexw-[800px]">
        <CardHeader>
          <p className="text-3xl font-semibold text-center">
            🧰 Account Settings 🧰
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Change your email address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="adam.smith@domain.com"
                          type="email"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Change your password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your old password"
                          type="password"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your new password"
                          type="password"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isTwoFactorEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Two-Factor Authentication</FormLabel>
                        <FormDescription>
                          Note: Recommended for greater security.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          disabled={isPending}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button
                className="justify-center w-full"
                disabled={isPending}
                type="submit"
              >
                Save
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </PageWrapper>
  );
};

export default AccountSettingsPage;

/**
 * Documentation generated with GitHub Copilot.
 */
