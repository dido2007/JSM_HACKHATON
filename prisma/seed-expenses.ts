// import { PrismaClient, Prisma } from "@prisma/client";

// const prisma = new PrismaClient();

// function getRandomAmount(maxTotal: number, numberOfEntries: number) {
//   let amounts = [];
//   let total = 0;

//   for (let i = 0; i < numberOfEntries; i++) {
//     if (i === numberOfEntries - 1) {
//       amounts.push(maxTotal - total);
//     } else {
//       let max = Math.min(200, maxTotal - total - (numberOfEntries - i - 1));
//       let amount = Math.random() * max;
//       total += amount;
//       amounts.push(amount);
//     }
//   }

//   return amounts.map((a) => Math.round((a + Number.EPSILON) * 100) / 100);
// }

// function generateExpensesData(userId: string) {
//   const categories = [
//     "Utilities",
//     "Groceries",
//     "Transport",
//     "Investment",
//     "Entertainment",
//     "Dining",
//     "Shopping",
//     "Travel",
//     "Health",
//     "Personal",
//     "Other",
//   ];
//   const expensesData: Prisma.ExpensesCreateInput[] = [];

//   for (let month = 0; month < 12; month++) {
//     const date = new Date(2024, month, 1);
//     const daysInMonth = new Date(2024, month + 1, 0).getDate();
//     let monthlyAmounts = getRandomAmount(900, 5); // Adjust the total monthly limit here

//     for (let i = 0; i < 5; i++) {
//       expensesData.push({
//         user: { connect: { id: userId } },
//         title: `${categories[i % categories.length]} Expense`,
//         amount: monthlyAmounts[i],
//         date: new Date(
//           2024,
//           month,
//           Math.floor(Math.random() * daysInMonth) + 1
//         ),
//         category: categories[i % categories.length],
//         description: `Randomly generated expense for ${
//           categories[i % categories.length]
//         }`,
//       });
//     }
//   }

//   return expensesData;
// }

// async function main() {
//   console.log(`Start seeding expenses...`);
//   const expensesData = generateExpensesData("clv481ora000010njdc7con9w");
//   for (const data of expensesData) {
//     const expense = await prisma.expenses.create({
//       data,
//     });
//     console.log(`Created expense with ID: ${expense.id}`);
//   }
//   console.log(`Seeding expenses finished.`);
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
