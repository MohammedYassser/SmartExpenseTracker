import { useTransactions } from '@/context/transactions';

export function useDashboardViewModel() {
  const { transactions } = useTransactions();
  let totalIncome = 0;
  let totalExpenses = 0;

  for (const transaction of transactions) {
    if (transaction.type === 'income') totalIncome += transaction.amount;
    else totalExpenses += transaction.amount;
  }

  const totalBalance = totalIncome - totalExpenses;

  return { totalIncome, totalExpenses, totalBalance };
}
