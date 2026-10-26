import { createContext, useContext, useState, type ReactNode } from 'react';

import type { Transaction } from '@/models/Transaction';

interface TransactionsContextValue {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
}

const TransactionsContext = createContext<TransactionsContextValue | undefined>(undefined);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', type: 'expense', amount: 150, category: 'Food', date: '2026-10-25', note: 'Lunch' },
    { id: '2', type: 'expense', amount: 300, category: 'Transport', date: '2026-10-24', note: 'Taxi' },
    { id: '3', type: 'income', amount: 5000, category: 'Salary', date: '2026-10-01', note: 'Monthly salary' },
  ]);

  function addTransaction(transaction: Transaction) {
    setTransactions((currentTransactions) => [transaction, ...currentTransactions]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (!context) throw new Error('useTransactions must be used within TransactionsProvider.');
  return context;
}
