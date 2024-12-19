/**
 * This module calculates and displays the next bill due date.
 * It fetches the bills from the server and computes the closest coming date date comapred to today's date
 * and the bill's frequency.
 */

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
  frequency: string;
}

const getNextComingBill = (
  bills: Bill[]
): { bill: Bill | null; daysUntil: number } => {
  const today = new Date();
  let closestBill: Bill | null = null;
  let closestTimeDiff = Infinity;
  let daysUntil = 0;

  bills.forEach((bill) => {
    let dueDate = new Date(bill.date);
    if (bill.frequency !== "One-Off") {
      dueDate = adjustDateByFrequency(dueDate, bill.frequency);
    }
    const timeDiff = dueDate.getTime() - today.getTime();
    if (timeDiff > 0 && timeDiff < closestTimeDiff) {
      closestBill = bill;
      closestTimeDiff = timeDiff;
      daysUntil = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    }
  });

  return { bill: closestBill, daysUntil };
};

const adjustDateByFrequency = (date: Date, frequency: string): Date => {
  const newDate = new Date(date);
  switch (frequency) {
    case "Weekly":
      newDate.setDate(newDate.getDate() + 7);
      break;
    case "Monthly":
      newDate.setMonth(newDate.getMonth() + 1);
      break;
    case "Quarterly":
      newDate.setMonth(newDate.getMonth() + 3);
      break;
    case "Annually":
      newDate.setFullYear(newDate.getFullYear() + 1);
      break;
  }
  return newDate;
};

const NextComingBillCard = () => {
  const [nextBillTitle, setNextBillTitle] = useState("");
  const [daysUntilNextBill, setDaysUntilNextBill] = useState(0);

  useEffect(() => {
    const fetchBills = async () => {
      const bills = await findBillsById();
      if (bills && Array.isArray(bills)) {
        const { bill, daysUntil } = getNextComingBill(bills);
        setNextBillTitle(bill ? bill.title : "No upcoming bills");
        setDaysUntilNextBill(daysUntil);
      } else {
        console.error("Failed to fetch bills");
      }
    };

    fetchBills();
  }, []);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center w-full">
          <CardTitle>Next Upcoming Bill</CardTitle>
          <svg
            width="18"
            height="18"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5 13.95C13.7485 13.95 13.95 13.7485 13.95 13.5C13.95 13.2514 13.7485 13.05 13.5 13.05L1.49995 13.05C1.25142 
              13.05 1.04995 13.2514 1.04995 13.5C1.04995 13.7485 1.25142 13.95 1.49995 13.95L13.5 13.95ZM11.0681 7.5683C11.2439 
              7.39257 11.2439 7.10764 11.0681 6.93191C10.8924 6.75617 10.6075 6.75617 10.4317 6.93191L7.94993 9.41371L7.94993 
              1.49998C7.94993 1.25146 7.74846 1.04998 7.49993 1.04998C7.2514 1.04998 7.04993 1.25146 7.04993 1.49998L7.04993 
              9.41371L4.56813 6.93191C4.39239 6.75617 4.10746 6.75617 3.93173 6.93191C3.75599 7.10764 3.75599 7.39257 3.93173 
              7.5683L7.18173 10.8183C7.35746 10.994 7.64239 10.994 7.81812 10.8183L11.0681 7.5683Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <CardDescription>
          {nextBillTitle !== "No upcoming bills"
            ? `${daysUntilNextBill} days until next due date`
            : ""}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-xl font-bold" style={{ color: "#32CD32" }}>
          {nextBillTitle}
        </div>
      </CardContent>
    </Card>
  );
};

export default NextComingBillCard;

/**
 * Documentation generated with GitHub Copilot.
 */
