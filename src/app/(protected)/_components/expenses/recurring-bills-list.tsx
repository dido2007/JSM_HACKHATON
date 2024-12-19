"use client";

import React, { useState, useEffect } from "react";

import { Bills } from "@prisma/client";
import { findBillsById } from "@/../actions/bill-actions";

import { Input } from "@/../src/components/ui/input";
import { ScrollArea } from "@/../src/components/ui/scroll-area";
import { RecurringBillsCard } from "@/app/(protected)/_components/expenses/recurring-bills-card";

const RecurringBillsList: React.FC = () => {
  const [bills, setBills] = useState<Bills[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBills = async () => {
      const response = await findBillsById();
      if (response instanceof Array) {
        setBills(response);
      } else if ("error" in response) {
        setError(response.error);
      }
    };

    loadBills();
  }, []);

  const filteredBills = bills.filter(
    (bill) =>
      bill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="p-4">
        <Input
          type="text"
          placeholder="Search bills by title or category..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {error ? (
        <div className="text-red-500 p-4">{error}</div>
      ) : (
        <ScrollArea>
          <div className="flex flex-col gap-4 p-4">
            {filteredBills.map((bill) => (
              <RecurringBillsCard key={bill.id} bill={bill} onClick={() => {}} />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default RecurringBillsList;
