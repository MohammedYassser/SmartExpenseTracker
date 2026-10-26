import { useTransactions } from '@/context/transactions';
import type { Transaction } from '@/models/Transaction';

export function useTransactionStatisticsViewModel() {
  const { transactions } = useTransactions();
  let totalIncome = 0;
  let totalExpenses = 0;
  let incomeCount = 0;
  let expenseCount = 0;
  let highestIncome: Transaction | undefined;
  let highestExpense: Transaction | undefined;
  const categories: { category: string; amount: number }[] = [];

  for (const transaction of transactions) {
    if (transaction.type === 'income') {
      totalIncome += transaction.amount;
      incomeCount += 1;
      if (!highestIncome || transaction.amount > highestIncome.amount) highestIncome = transaction;
    } else {
      totalExpenses += transaction.amount;
      expenseCount += 1;
      if (!highestExpense || transaction.amount > highestExpense.amount) highestExpense = transaction;
      const category = transaction.category.trim();
      const existing = categories.find((item) => item.category.toLowerCase() === category.toLowerCase());
      if (existing) existing.amount += transaction.amount;
      else categories.push({ category, amount: transaction.amount });
    }
  }

  const categoryBreakdown = categories.map((item) => ({
    ...item,
    percentage: totalExpenses > 0 ? Math.min(100, Math.max(0, item.amount / totalExpenses * 100)) : 0,
  }));
  let topCategory: typeof categoryBreakdown[number] | undefined;
  for (const category of categoryBreakdown) {
    if (!topCategory || category.amount > topCategory.amount) topCategory = category;
  }
  const totalAmount = totalIncome + totalExpenses;

  return {
    totalCount: transactions.length,
    totalIncome,
    totalExpenses,
    averageAmount: transactions.length > 0 ? totalAmount / transactions.length : 0,
    incomeCount,
    expenseCount,
    incomePercentage: totalAmount > 0 ? totalIncome / totalAmount * 100 : 0,
    expensePercentage: totalAmount > 0 ? totalExpenses / totalAmount * 100 : 0,
    categoryBreakdown,
    topCategory,
    highestIncome,
    highestExpense,
  };
}
