import { useState } from 'react';

import { useBudgets } from '@/context/budgets';
import type { Budget } from '@/models/Budget';

export const budgetCategories = ['Food', 'Transport', 'Shopping', 'Entertainment'];

export function useBudgetFormViewModel(budget?: Budget) {
  const { addBudget, updateBudget } = useBudgets();
  const isCustomCategory = budget !== undefined && !budgetCategories.includes(budget.category);
  const [category, setCategory] = useState(isCustomCategory ? 'Other' : budget?.category ?? '');
  const [customCategory, setCustomCategory] = useState(isCustomCategory ? budget.category : '');
  const [amount, setAmount] = useState(budget?.amount.toString() ?? '');
  const [errors, setErrors] = useState<{ category?: string; amount?: string }>({});

  function submit() {
    const nextErrors: { category?: string; amount?: string } = {};
    const savedCategory = category === 'Other' ? customCategory.trim() : category;
    const numericAmount = Number(amount.trim());
    if (!category) nextErrors.category = 'Please select a category.';
    else if (!savedCategory) nextErrors.category = 'Custom category is required.';
    if (!amount.trim()) nextErrors.amount = 'Budget amount is required.';
    else if (!/^\d*\.?\d+$/.test(amount.trim()) || !Number.isFinite(numericAmount) || numericAmount <= 0) {
      nextErrors.amount = 'Please enter a valid budget amount greater than 0.';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return false;

    const nextBudget: Budget = { id: budget?.id ?? Date.now().toString(), category: savedCategory, amount: numericAmount };
    if (budget) updateBudget(nextBudget);
    else addBudget(nextBudget);
    return true;
  }

  return { category, setCategory, customCategory, setCustomCategory, amount, setAmount, errors, submit };
}
