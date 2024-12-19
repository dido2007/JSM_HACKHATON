/**
 * @module AlterFinances
 * @description A component that allows users to alter and manage finances.
 */

"use client";

import { useForm } from "react-hook-form";
import React, { useState, useEffect, useMemo } from "react";

import { Finances } from "@prisma/client";

import { toast } from "@/../src/components/ui/use-toast";
import { Input } from "@/../src/components/ui/input";
import { Button } from "@/../src/components/ui/button";
import { ScrollArea } from "@/../src/components/ui/scroll-area";
import { FinancesCard } from "@/../src/app/(protected)/_components/finances/finances-card";
import {
  getFinancesById,
  alterFinances,
  deleteFinance,
} from "@/../actions/finances-actions";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/../src/components/ui/resizable";
import { Card, CardHeader, CardContent } from "@/../src/components/ui/card";
import { DatePickerWithRange } from "@/../src/components/ui/date-range-picker";
import { DatePickerWithPresets } from "@/../src/components/ui/date-picker-presets";

/**
 * A component that allows users to alter and manage finances.
 */
const AlterFinances: React.FC = () => {
  // State variables
  const [finances, setFinances] = useState<Finances[]>([]);
  const [selectedFinance, setSelectedFinance] = useState<Finances | null>(null);
  const [editFinance, setEditFinance] = useState<Finances | undefined>(
    undefined
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<
    { from: Date; to: Date } | undefined
  >(undefined);

    // Initialises useForm.
    const formMethods = useForm({
      defaultValues: {
        income: 0,
        date: new Date(),
      },
    });

  useEffect(() => {
    /**
     * Load finances data from the server.
     */
    const loadFinances = async () => {
      const response = await getFinancesById(); // Remove the argument from the function call
      if (response.success && response.finances) {
        setFinances(response.finances);
      } else {
        toast({ title: response.error });
      }
    };
    loadFinances();
  }, []);

  /**
   * Handle the selection of a finance item.
   * @param finance - The selected finance item.
   */
  const handleSelectFinance = (finance: Finances) => {
    setSelectedFinance(finance);
    setEditFinance(finance);
  };

  /**
   * Handle the change of an input field.
   * @param field - The field to be changed.
   * @param value - The new value of the field.
   */
  const handleInputChange = (field: keyof Finances, value: any) => {
    if (editFinance) {
      setEditFinance({ ...editFinance, [field]: value });
    }
  };

  /**
   * Save the changes made to the finance item.
   */
  const saveChanges = async () => {
    if (editFinance) {
      const response = await alterFinances(editFinance); // Using alterFinances here
      if (response.success) {
        toast({ title: "🎉 Income updated successfully!" });
        setFinances((prev) =>
          prev.map((f) => (f.id === editFinance.id ? editFinance : f))
        );
        setSelectedFinance(null); // Reset selection.
      } else {
        toast({
          title: "😵‍💫 Failed to update income!",
          description: response.error,
        });
      }
    }
  };


  /**
   * Filter the finances based on the search term and date range.
   */
  const filteredFinances = useMemo(() => {
    return finances
      .filter((finance) => {
        const financeDate = new Date(finance.date);
        return (
          !dateRange ||
          (financeDate >= dateRange.from && financeDate <= dateRange.to)
        );
      })
      .filter((finance) => finance.income.toString().includes(searchTerm));
  }, [finances, dateRange, searchTerm]);

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>
        <div className="p-4 flex items-center gap-4">
          <DatePickerWithRange
            onSelect={(range) =>
              setDateRange(
                range ? { from: range.from!, to: range.to! } : undefined
              )
            }
          />
          <Input
            type="text"
            placeholder="Search incomes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ScrollArea>
          <div className="flex flex-col gap-4 p-4">
            {filteredFinances.map((finance) => (
              <div
                key={finance.id}
                className="flex items-center w-full"
                onClick={() => handleSelectFinance(finance)}
              >
                <FinancesCard finances={finance} className="flex-1" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        {editFinance && (
          <Card className="m-4">
            <CardHeader>
              <p className="text-3xl font-semibold text-center">
                ✏️ Edit Income ✏️
              </p>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveChanges();
                }}
              >
                <div className="flex space-x-4 justify-center mb-2">
                  <DatePickerWithPresets
                    value={editFinance ? editFinance.date : new Date()}
                    onChange={(newDate) => handleInputChange("date", newDate)}
                  />
                  <Input
                    type="number"
                    value={editFinance.income}
                    onChange={(e) =>
                      handleInputChange("income", parseFloat(e.target.value))
                    }
                    placeholder="Income"
                    className="mb-2"
                  />
                </div>
                <div className="flex justify-between">
                  <Button type="submit" className="flex-1 mr-2">
                    Save Changes
                  </Button>
                  <Button
                    className="flex-1 ml-2 bg-red-500"
                    type="button"
                    onClick={async (e) => {
                      e.preventDefault();
                      if (selectedFinance) {
                        const response = await deleteFinance(selectedFinance.id);
                        if (response.success) {
                          setFinances(
                            finances.filter((b) => b.id !== selectedFinance.id)
                          );
                          setSelectedFinance(null);
                          toast({
                            title: "👋 Income deleted successfully!",
                          });
                          formMethods.reset(); // Clear the form.
                        } else {
                          toast({
                            title: "😵‍💫 Failed to delete income",
                          });
                        }
                      }
                    }}
                    >
                    Delete
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default AlterFinances;

/**
 * Documentation generated with GitHub Copilot.
 */
