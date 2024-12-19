/**
 * RecurringBillsCreationCard component represents a form for creating bills.
 * It allows users to input expense details such as title, amount, category, date, endDate and frequency.
 * When the form is submitted, it calls the createBills function to create the bill.
 */

"use client";

import React from "react";
import { createBills } from "@/../actions/bill-actions";
import { useForm, FormProvider, Controller } from "react-hook-form";

import { Input } from "@/../src/components/ui/input";
import { Button } from "@/../src/components/ui/button";
import { toast } from "@/../src/components/ui/use-toast";
import { Card, CardHeader, CardContent } from "@/../src/components/ui/card";
import { FormError } from "@/../src/components/form-error";
import {
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

interface BillFormInputs {
  title: string;
  amount: number;
  category: string;
  date: Date | null;
  endDate: Date | null;
  description: string;
  frequency: string;
}

const RecurringBillsCreationCard = () => {
  const formMethods = useForm<BillFormInputs>({
    defaultValues: {
      title: "",
      amount: 0,
      category: "",
      date: null,
      endDate: null,
      description: "",
      frequency: "",
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

  const onSubmit = async (data: BillFormInputs) => {
    // Convert amount to a number.
    const preparedData = {
      ...data,
      amount: Number(data.amount),
    };

    console.log("Submitting data:", preparedData);
    if (Object.keys(errors).length === 0) {
      const response = await createBills({ bill: preparedData });
      if (response.success) {
        toast({
          title: "💸 Recurring Bill Created Successfully!",
          description: "Your new recurring bill has been added.",
        });
      } else {
        toast({
          title: "😢 Failed to create recurring bill!",
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
            🧾 Create Bill 🧾
          </p>
        </CardHeader>
        <CardContent className="mt-4">
          <FormProvider {...formMethods}>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <FormField
                name="title"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Bill Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Electricity Bill"
                        type="text"
                      />
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
                          <SelectValue placeholder="Select category" />
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
                      <FormLabel>Start Date</FormLabel>
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
                  name="endDate"
                  render={({ field, fieldState }) => (
                    <FormItem className="flex flex-col text-center">
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <DatePickerWithPresets
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      {errors.endDate && (
                        <FormError message={errors.endDate.message} />
                      )}
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  name="frequency"
                  render={({ field }) => (
                    <FormItem className="flex flex-col text-center">
                      <FormLabel>Frequency</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger aria-label="Frequency">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="One-Off">One-Off</SelectItem>
                            <SelectItem value="Weekly">Weekly</SelectItem>
                            <SelectItem value="Monthly">Monthly</SelectItem>
                            <SelectItem value="Quarterly">Quarterly</SelectItem>
                            <SelectItem value="Annually">Annually</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      {errors.frequency && (
                        <FormError message={errors.frequency.message} />
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                name="description"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Scottish Power"
                        type="text"
                      />
                    </FormControl>
                    {errors.description && (
                      <FormError message={errors.description.message} />
                    )}
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <Button className="justify-center w-full" type="submit">
                Create Bill
              </Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecurringBillsCreationCard;

/**
 * Documentation generated with GitHub Copilot.
 */
