"use client";

import React, { useEffect, useState } from "react";
import { findBillsById } from "@/../actions/bill-actions";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/../src/components/ui/card";

interface Bill {
  id: string;
  userId: string;
  title: string;
  amount: number;
  date: Date;
  category: string;
  description: string;
}

const LargestBillCategoryCard = () => {
  const [largestCategory, setLargestCategory] = useState("");
  const [percentageChange, setPercentageChange] = useState("");

  useEffect(() => {
    const fetchBills = async () => {
      const bills = await findBillsById();
      if (bills && Array.isArray(bills)) {
        computeLargestCategory(bills);
      } else {
        console.error("Failed to fetch bills");
      }
    };

    fetchBills();
  }, []);

  const computeLargestCategory = (bills: Bill[]) => {
    const currentMonth = new Date().getMonth();
    const categoryTotals: { [key: string]: number } = bills.reduce(
      (acc, bill) => {
        const billMonth = new Date(bill.date).getMonth();
        if (billMonth === currentMonth) {
          acc[bill.category] = (acc[bill.category] || 0) + bill.amount;
        }
        return acc;
      },
      {} as { [key: string]: number } // Add index signature to the type of acc
    );

    let maxCategory = "";
    let maxAmount = 0;
    let previousMax = 0;

    Object.entries(categoryTotals).forEach(([category, total]) => {
      if (total > maxAmount) {
        previousMax = maxAmount;
        maxCategory = category;
        maxAmount = total;
      }
    });

    setLargestCategory(maxCategory);
    if (previousMax > 0) {
      const change = ((maxAmount - previousMax) / previousMax) * 100;
      setPercentageChange(`${change >= 0 ? "+" : ""}${change.toFixed(2)}%`);
    } else {
      setPercentageChange("N/A");
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center w-full">
          <CardTitle>Your largest bill category this month</CardTitle>
          <svg
            width="18"
            height="18"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.35355 1.85355C3.54882 1.65829 3.54882 1.34171 3.35355 1.14645C3.15829 0.951184 2.84171 0.951184 2.64645 
              1.14645L0.646447 3.14645C0.451184 3.34171 0.451184 3.65829 0.646447 3.85355L2.64645 5.85355C2.84171 6.04882 
              3.15829 6.04882 3.35355 5.85355C3.54882 5.65829 3.54882 5.34171 3.35355 5.14645L2.20711 4H9.5C11.433 4 13 5.567 
              13 7.5C13 7.77614 13.2239 8 13.5 8C13.7761 8 14 7.77614 14 7.5C14 5.01472 11.9853 3 9.5 3H2.20711L3.35355 1.85355ZM2 
              7.5C2 7.22386 1.77614 7 1.5 7C1.22386 7 1 7.22386 1 7.5C1 9.98528 3.01472 12 5.5 12H12.7929L11.6464 13.1464C11.4512 
              13.3417 11.4512 13.6583 11.6464 13.8536C11.8417 14.0488 12.1583 14.0488 12.3536 13.8536L14.3536 11.8536C14.5488 11.6583 
              14.5488 11.3417 14.3536 11.1464L12.3536 9.14645C12.1583 8.95118 11.8417 8.95118 11.6464 9.14645C11.4512 9.34171 11.4512 
              9.65829 11.6464 9.85355L12.7929 11H5.5C3.567 11 2 9.433 2 7.5Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <CardDescription>
          {percentageChange} change from last month.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold" style={{ color: "#32CD32" }}>
          {largestCategory || "No bills this month"}
        </div>
      </CardContent>
    </Card>
  );
};

export default LargestBillCategoryCard;