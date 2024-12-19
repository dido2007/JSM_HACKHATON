/**
 * ExpenseCreationCard component represents a form for creating expenses.
 * It allows users to input expense details such as title, amount, category, date, and description.
 * When the form is submitted, it calls the createExpenses function to create the expense.
 */

"use client";

import React from "react";
import { createExpenses } from "@/../actions/expense-actions";
import { useForm, FormProvider, Controller } from "react-hook-form";

import { Input } from "@/../src/components/ui/input";
import { Button } from "@/../src/components/ui/button";
import { toast } from "@/../src/components/ui/use-toast";
import { Card, CardHeader, CardContent } from "@/../src/components/ui/card";
import { FormError } from "@/../src/components/form-error";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/../src/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/../src/components/ui/select";
import { DatePickerWithPresets } from "@/../src/components/ui/date-picker-presets";

interface ExpensesFormInputs {
  title: string;
  amount: number;
  category: string;
  date: Date | null;
  description: string;
}

const ExpenseCreationCard = () => {
  const formMethods = useForm<ExpensesFormInputs>({
    defaultValues: {
      title: "",
      amount: 1,
      category: "",
      date: null,
      description: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = formMethods;

  const onSubmit = async (data: ExpensesFormInputs) => {
    if (Object.keys(errors).length === 0) {
      const response = await createExpenses({ expenses: data });
      if (response.success) {
        toast({
          title: "💸 Expense Created Successfully!",
          description: "Your new budget has been added.",
        });
      } else {
        toast({
          title: "😢 Failed to create expense!",
          description: response.error || "🤷 An unexpected error occurred.",
        });
      }
    }
  };

  return (
    <div className="flex h-screen justify-center items-start pt-4">
      <Card className="flex flex-col w-[800px]">
        <CardHeader>
          <p className="text-3xl font-semibold text-center">
            💳 Register Expense 💳
          </p>
        </CardHeader>
        <CardContent className="mt-4">
          <FormProvider {...formMethods}>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <FormField
                name="title"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Expense Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Groceries" type="text" />
                    </FormControl>
                    {errors.title && (
                      <FormError message={errors.title.message} />
                    )}
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                name="amount"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    {errors.amount && (
                      <FormError message={errors.amount.message} />
                    )}
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger aria-label="Category">
                          <SelectValue placeholder="Pick a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Utilities">Utilities</SelectItem>
                          <SelectItem value="Groceries">Groceries</SelectItem>
                          <SelectItem value="Transport">Transport</SelectItem>
                          <SelectItem value="Investment">Investment</SelectItem>
                          <SelectItem value="Entertainment">
                            Entertainment
                          </SelectItem>
                          <SelectItem value="Dining">Dining</SelectItem>
                          <SelectItem value="Shopping">Shopping</SelectItem>
                          <SelectItem value="Travel">Travel</SelectItem>
                          <SelectItem value="Health">Health</SelectItem>
                          <SelectItem value="Personal">Personal</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    {errors.category && (
                      <FormError message={errors.category.message} />
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex space-x-4 justify-center">
                <FormField
                  name="date"
                  render={({ field, fieldState }) => (
                    <FormItem className="flex flex-col text-center">
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <DatePickerWithPresets
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      {errors.date && (
                        <FormError message={errors.date.message} />
                      )}
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  name="description"
                  render={({ field, fieldState }) => (
                    <FormItem className="flex flex-col text-justify-left">
                      <FormLabel>Expense Description</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Deliveroo" type="text" />
                      </FormControl>
                      {errors.description && (
                        <FormError message={errors.description.message} />
                      )}
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <Button
                className="justify-center w-full"
                type="submit"
              >
                Register Expense
              </Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseCreationCard;

/**
 * Documentation generated with GitHub Copilot.
 */
