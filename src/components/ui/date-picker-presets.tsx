/**
  * Component taken from shadcn/ui component library.

 *
 * Aletered the presets values, added interface and altered function arguments to fit  use case.
 *
 * @see https://ui.shadcn.com/docs/components/date-picker
 */

"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";

import { combineClassNames } from "@/lib/style-utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Alteration of the DatePicker component to include presets.
interface DatePickerWithPresetsProps {
  value?: Date; // Making value optional to handle no initial date.
  onChange: (newDate: Date | undefined) => void; // TS error fix: onChange function should accept undefined.
  disabled?: boolean; // Alteration – added a disabled property.
}

// Alteration of the DatePicker component to include presets.
export function DatePickerWithPresets({
  value,
  onChange,
  disabled = false, // Set default value for disabled
}: DatePickerWithPresetsProps) {
  const handleValueChange = (value: string) => {
    const newDate = addDays(new Date(), parseInt(value));
    onChange(newDate); // Update the date using the passed onChange function.
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={combineClassNames(
            "w-[240px] justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-auto flex-col space-y-2 p-2"
      >
        <Select onValueChange={handleValueChange} disabled={disabled}>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="7">In a week</SelectItem>
            {/* Changed the presets values to fit budget use case. */}
            <SelectItem value="30">In a month</SelectItem>
            <SelectItem value="90">In 3 months</SelectItem>
            <SelectItem value="180">In 6 months</SelectItem>
            <SelectItem value="365">In a year</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar mode="single" selected={value} onSelect={onChange} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
