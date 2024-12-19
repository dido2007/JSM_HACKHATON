"use client";

import { useForm } from "react-hook-form";
import React, { useState, useEffect, useMemo } from "react";

import { Bills } from "@prisma/client";
import { Input } from "@/../src/components/ui/input";
import { Button } from "@/../src/components/ui/button";
import { toast } from "@/../src/components/ui/use-toast";
import { ScrollArea } from "@/../src/components/ui/scroll-area";
import { RecurringBillsCard } from "@/../src/app/(protected)/_components/expenses/recurring-bills-card";
import {
  findBillsById,
  deleteBills,
  alterBills,
} from "@/../actions/bill-actions";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/../src/components/ui/resizable";
import { Card, CardHeader, CardContent } from "@/../src/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/../src/components/ui/select";
import { DatePickerWithRange } from "@/../src/components/ui/date-range-picker";
import { DatePickerWithPresets } from "@/../src/components/ui/date-picker-presets";

/**
 * Component for altering bills.
 */
const AlterRecurringBills: React.FC = () => {
  // State variables
  const [bills, setBills] = useState<Bills[]>([]);
  const [selectedBill, setSelectedBill] = useState<Bills | null>(null);
  const [editBill, setEditBill] = useState<Bills | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<
    { from: Date; to: Date } | undefined
  >(undefined);

  // Initialises useForm.
  const formMethods = useForm({
    defaultValues: {
      title: "",
      amount: 0,
      category: "",
      date: new Date(),
      endDate: new Date(),
      frequency: "",
      description: "",
    },
  });

  useEffect(() => {
    const loadBills = async () => {
      const response = await findBillsById();
      if (response && Array.isArray(response)) {
        setBills(response);
      } else {
        setBills([]);
      }
    };

    loadBills();
  }, []);

  /**
   * Handles the selection of a bill.
   * @param bill - The selected bill.
   */
  const handleSelectBill = (bill: Bills) => {
    setSelectedBill(bill);
    setEditBill({ ...bill });
  };

  /**
   * Handles the change of an input field.
   * @param field - The field to be changed.
   * @param value - The new value of the field.
   */
  const handleInputChange = (field: keyof Bills, value: any) => {
    setEditBill((prev) => ({
      ...prev!,
      [field]: value,
    }));
  };

  /**
   * Saves the changes made to the bill.
   */
  const saveChanges = async () => {
    if (!editBill) return;

    const response = await alterBills(editBill);
    if (response.success) {
      toast({
        title: "🎉 Bill updated successfully!",
      });
      // Reflect the changes in the local state.
      setBills((prev) =>
        prev.map((bill) => (bill.id === editBill.id ? editBill : bill))
      );
      setSelectedBill(null); // Reset selection.
    } else {
      toast({
        title: "😵‍💫 Failed to update bill!",
        description: response.error,
      });
    }
  };

  // useMemo hook to compute filtered bills on changes to `bills` or `dateRange`.
  const filteredBills = useMemo(
    () =>
      bills.filter((bill) => {
        const inDateRange = dateRange
          ? new Date(bill.date) >= dateRange.from &&
            new Date(bill.endDate) <= dateRange.to
          : true;
        return (
          inDateRange &&
          (bill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bill.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bill.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bill.amount.toString().includes(searchTerm))
        );
      }),
    [bills, searchTerm, dateRange]
  );

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>
        <div className="p-4 flex items-center gap-4">
          <DatePickerWithRange
            onSelect={(range) => {
              if (range && range.from && range.to) {
                setDateRange({
                  from: range.from,
                  to: range.to,
                });
              } else {
                setDateRange(undefined);
              }
            }}
          />
          <Input
            type="text"
            placeholder="Search by title/category/description/amount"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ScrollArea>
          <div className="flex flex-col gap-4 p-4">
            {filteredBills
              .filter(
                (bill) =>
                  bill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  bill.category
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  bill.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  bill.amount.toFixed(2).includes(searchTerm)
              )
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .map((bill) => (
                <div
                  key={bill.id}
                  className="flex items-center w-full"
                  onClick={() => handleSelectBill(bill)}
                >
                  <RecurringBillsCard
                    bill={bill}
                    className="flex-1"
                    key={""}
                    onClick={function (): void {
                      throw new Error("Function not implemented.");
                    }}
                  />
                </div>
              ))}
          </div>
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        {selectedBill && (
          <Card className="m-4">
            <CardHeader>
              <p className="text-3xl font-semibold text-center">
                ✏️ Edit Bill ✏️
              </p>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveChanges();
                }}
              >
                <Input
                  value={editBill?.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Title"
                  className="mb-2"
                />
                <Input
                  type="number"
                  value={editBill?.amount}
                  onChange={(e) =>
                    handleInputChange("amount", parseFloat(e.target.value))
                  }
                  placeholder="Amount"
                  className="mb-2"
                />
                <Select
                  value={editBill?.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                  aria-label="Category"
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Utilities",
                      "Groceries",
                      "Transport",
                      "Investment",
                      "Entertainment",
                      "Dining",
                      "Shopping",
                      "Travel",
                      "Health",
                      "Personal",
                      "Other",
                    ].map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex space-x-4 justify-center mb-2">
                  <DatePickerWithPresets
                    value={editBill?.date}
                    onChange={(value) => handleInputChange("date", value)}
                  />
                  <DatePickerWithPresets
                    value={editBill?.endDate}
                    onChange={(value) => handleInputChange("endDate", value)}
                  />
                  <Select
                    value={editBill?.frequency}
                    onValueChange={(value) =>
                      handleInputChange("frequency", value)
                    }
                    aria-label="Frequency"
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "One-Off",
                        "Weekly",
                        "Monthly",
                        "Quarterly",
                        "Annually",
                      ].map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Input
                  value={editBill?.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="description"
                  className="mb-2"
                />
                <div className="flex justify-between">
                  <Button type="submit" className="flex-1 mr-2">
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 ml-2 bg-red-500"
                    onClick={async (e) => {
                      e.preventDefault();
                      if (selectedBill) {
                        const response = await deleteBills(selectedBill.id);
                        if (response.success) {
                          setBills(
                            bills.filter((b) => b.id !== selectedBill.id)
                          );
                          setSelectedBill(null);
                          toast({
                            title: "👋 Bill deleted successfully!",
                          });
                          formMethods.reset(); // Clear the form.
                        } else {
                          toast({
                            title: "😵‍💫 Failed to delete bill",
                          });
                        }
                      }
                    }}
                  >
                    Delete Bill
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

export default AlterRecurringBills;

/**
 * Documentation generated with GitHub Copilot.
 */
