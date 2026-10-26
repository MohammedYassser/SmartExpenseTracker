import { createContext, useContext, useState, type ReactNode } from 'react';

import type { Budget } from '@/models/Budget';

interface BudgetsContextValue {
  budgets: Budget[];
  addBudget: (budget: Budget) => void;
  updateBudget: (budget: Budget) => void;
  deleteBudget: (id: string) => void;
}

const BudgetsContext = createContext<BudgetsContextValue | undefined>(undefined);

export function BudgetsProvider({ children }: { children: ReactNode }) {
  const [budgets, setBudgets] = useState<Budget[]>([
    { id: '1', category: 'Food', amount: 1000 },
    { id: '2', category: 'Transport', amount: 600 },
    { id: '3', category: 'Shopping', amount: 800 },
    { id: '4', category: 'Entertainment', amount: 400 },
  ]);

  function addBudget(budget: Budget) {
    setBudgets((current) => [budget, ...current]);
  }

  function updateBudget(budget: Budget) {
    setBudgets((current) => current.map((item) => item.id === budget.id ? budget : item));
  }

  function deleteBudget(id: string) {
    setBudgets((current) => current.filter((item) => item.id !== id));
  }

  return (
    <BudgetsContext.Provider value={{ budgets, addBudget, updateBudget, deleteBudget }}>
      {children}
    </BudgetsContext.Provider>
  );
}

export function useBudgets() {
  const context = useContext(BudgetsContext);
  if (!context) throw new Error('useBudgets must be used within BudgetsProvider.');
  return context;
}
