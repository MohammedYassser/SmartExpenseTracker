import { useBudgets } from '@/context/budgets';
import { useTransactions } from '@/context/transactions';

export function useBudgetViewModel() {
  const { budgets, deleteBudget } = useBudgets();
  const { transactions } = useTransactions();
  const expenses = transactions.filter((transaction) => transaction.type === 'expense');
  const budgetSummaries = budgets.map((budget) => {
    let spent = 0;
    for (const expense of expenses) {
      if (expense.category.trim().toLowerCase() === budget.category.trim().toLowerCase()) {
        spent += expense.amount;
      }
    }
    return { budget, spent };
  });

  let totalBudget = 0;
  let totalSpent = 0;
  for (const budget of budgets) totalBudget += budget.amount;
  for (const expense of expenses) {
    if (budgets.some((budget) => budget.category.trim().toLowerCase() === expense.category.trim().toLowerCase())) {
      totalSpent += expense.amount;
    }
  }

  return { budgetSummaries, totalBudget, totalSpent, remaining: totalBudget - totalSpent, deleteBudget };
}
