import { useTransactions } from '@/context/transactions';
import { useBudgetViewModel } from '@/features/budget/viewmodels/useBudgetViewModel';

export interface CategoryReport {
  category: string;
  amount: number;
  percentage: number;
}

export function useReportsViewModel() {
  const { transactions } = useTransactions();
  const budgetSummary = useBudgetViewModel();
  let totalIncome = 0;
  let totalExpenses = 0;
  let incomeCount = 0;
  let expenseCount = 0;
  const categories: { category: string; amount: number }[] = [];

  for (const transaction of transactions) {
    if (transaction.type === 'income') {
      totalIncome += transaction.amount;
      incomeCount += 1;
    } else {
      totalExpenses += transaction.amount;
      expenseCount += 1;
      const category = transaction.category.trim();
      const existing = categories.find((item) => item.category.toLowerCase() === category.toLowerCase());
      if (existing) existing.amount += transaction.amount;
      else categories.push({ category, amount: transaction.amount });
    }
  }

  const categoryReports: CategoryReport[] = categories.map((item) => ({
    ...item,
    percentage: totalExpenses > 0 ? Math.min(100, Math.max(0, item.amount / totalExpenses * 100)) : 0,
  }));
  let topCategory: CategoryReport | undefined;
  for (const category of categoryReports) {
    if (!topCategory || category.amount > topCategory.amount) topCategory = category;
  }

  return {
    totalIncome, totalExpenses, netBalance: totalIncome - totalExpenses,
    incomeCount, expenseCount, totalCount: transactions.length,
    categoryReports, topCategory,
    hasBudgets: budgetSummary.budgetSummaries.length > 0,
    totalBudget: budgetSummary.totalBudget,
    budgetSpent: budgetSummary.totalSpent,
    remainingBudget: budgetSummary.remaining,
  };
}
