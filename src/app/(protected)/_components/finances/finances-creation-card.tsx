/**
 * @module FinancesCreationCard
 * @description A component for creating finances, including income and valuation date.
 */

"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";

import { Input } from "@/../src/components/ui/input";
import { Button } from "@/../src/components/ui/button";
import { toast } from "@/../src/components/ui/use-toast";
import { Card, CardHeader, CardContent } from "@/../src/components/ui/card";
import { DatePickerWithPresets } from "@/../src/components/ui/date-picker-presets";

import { createFinances } from "@/../actions/finances-actions";

interface FinanceFormInputs {
  amount: number;
  date: Date;
}

/**
 * A component for creating finances, including income and valuation date.
 */
const FinancesCreationCard = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FinanceFormInputs>({
    defaultValues: {
      amount: 0,
      date: new Date(),
    },
  });

  const onSubmit = async (data: FinanceFormInputs) => {
    const response = await createFinances({
      finances: {
        amount: data.amount,
        startDate: data.date, // Ensure this matches your backend expected field.
      },
    });
    if (response.success) {
      toast({
        title: "💸 Income Created Successfully!",
        description: "Your new income has been added.",
      });
    } else {
      toast({
        title: "😢 Failed to create income!",
        description: response.error || "🤷 An unexpected error occurred.",
      });
    }
  };

  return (
    <div className="flex h-screen justify-center items-start pt-4">
      <Card className="flex flex-col w-[800px]">
        <CardHeader>
          <p className="text-3xl font-semibold text-center">
            📨 What is your Income 📨
          </p>
        </CardHeader>
        <CardContent className="mt-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="amount">Amount</label>
              <Input
                id="amount"
                type="number"
                {...register("amount", { required: true, min: 1 })}
              />
              {errors.amount && (
                <p className="text-red-500">
                  This field is required and must be greater than zero.
                </p>
              )}
            </div>
            <div className="flex space-x-4 flex-col items-center justify-center">
              <label htmlFor="date">Valuation Date</label>
              <Controller
                name="date"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <DatePickerWithPresets
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.date && <p className="text-red-500">Date is required.</p>}
            </div>
            <Button type="submit" className="w-full mt-4">
              Confirm
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancesCreationCard;

/**
 * Documentation generated with GitHub Copilot.
 */
