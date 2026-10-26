import { useState } from 'react';

import { useTransactions } from '@/context/transactions';
import type { Transaction } from '@/models/Transaction';

interface FormErrors {
  amount?: string;
  category?: string;
  date?: string;
}

export function useAddTransactionViewModel() {
  const { addTransaction } = useTransactions();
  const [type, setType] = useState<Transaction['type']>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  function submit() {
    const nextErrors: FormErrors = {};
    const numericAmount = Number(amount.trim());

    if (!amount.trim()) {
      nextErrors.amount = 'Amount is required.';
    } else if (!/^\d*\.?\d+$/.test(amount.trim()) || !Number.isFinite(numericAmount) || numericAmount <= 0) {
      nextErrors.amount = 'Please enter a valid amount.';
    }
    if (!category.trim()) nextErrors.category = 'Category is required.';
    if (!date.trim()) nextErrors.date = 'Date is required.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return false;

    const transaction: Transaction = {
      id: Date.now().toString(),
      type,
      amount: numericAmount,
      category: category.trim(),
      date: date.trim(),
      note: note.trim(),
    };
    addTransaction(transaction);
    return true;
  }

  return {
    type, setType, amount, setAmount, category, setCategory,
    date, setDate, note, setNote, errors, submit,
  };
}
