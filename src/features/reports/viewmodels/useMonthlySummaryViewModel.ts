import { useTransactions } from '@/context/transactions';
import type { Transaction } from '@/models/Transaction';

export function useMonthlySummaryViewModel(year: number, month: number) {
  const { transactions } = useTransactions();
  const today = new Date();
  let latestMonth = today.getFullYear() * 12 + today.getMonth();
  const selectedMonth = year * 12 + month;
  let totalIncome = 0;
  let totalExpenses = 0;
  let incomeCount = 0;
  let expenseCount = 0;
  let largestIncome: Transaction | undefined;
  let largestExpense: Transaction | undefined;
  const categories: { category: string; amount: number }[] = [];

  for (const transaction of transactions) {
    const date = transaction.date.trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) continue;
    const transactionYear = Number(date.slice(0, 4));
    const transactionMonth = Number(date.slice(5, 7)) - 1;
    const day = Number(date.slice(8, 10));
    if (transactionYear < 1 || transactionMonth < 0 || transactionMonth > 11 || day < 1 ||
      day > new Date(transactionYear, transactionMonth + 1, 0).getDate()) continue;

    const transactionMonthIndex = transactionYear * 12 + transactionMonth;
    if (transactionMonthIndex > latestMonth) latestMonth = transactionMonthIndex;
    if (transactionMonthIndex !== selectedMonth) continue;

    if (transaction.type === 'income') {
      totalIncome += transaction.amount;
      incomeCount += 1;
      if (!largestIncome || transaction.amount > largestIncome.amount) largestIncome = transaction;
    } else {
      totalExpenses += transaction.amount;
      expenseCount += 1;
      if (!largestExpense || transaction.amount > largestExpense.amount) largestExpense = transaction;
      const category = transaction.category.trim();
      const existing = categories.find((item) => item.category.toLowerCase() === category.toLowerCase());
      if (existing) existing.amount += transaction.amount;
      else categories.push({ category, amount: transaction.amount });
    }
  }

  const categoryReports = categories.map((item) => ({
    ...item,
    percentage: totalExpenses > 0 ? Math.min(100, Math.max(0, item.amount / totalExpenses * 100)) : 0,
  }));
  let topCategory: typeof categoryReports[number] | undefined;
  for (const category of categoryReports) {
    if (!topCategory || category.amount > topCategory.amount) topCategory = category;
  }

  return {
    totalIncome,
    totalExpenses,
    netBalance: totalIncome - totalExpenses,
    totalCount: incomeCount + expenseCount,
    incomeCount,
    expenseCount,
    categoryReports,
    topCategory,
    largestIncome,
    largestExpense,
    canGoNext: selectedMonth < latestMonth,
  };
}
