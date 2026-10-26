import { useState } from 'react';

import type { Transaction } from '@/models/Transaction';

interface FormErrors {
  amount?: string;
  category?: string;
  date?: string;
}

export function useAddTransactionViewModel() {
  const [type, setType] = useState<Transaction['type']>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedTransaction, setSubmittedTransaction] = useState<Transaction | null>(null);

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
    setSubmittedTransaction(null);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmittedTransaction({
      id: Date.now().toString(),
      type,
      amount: numericAmount,
      category: category.trim(),
      date: date.trim(),
      note: note.trim(),
    });
  }

  return {
    type, setType, amount, setAmount, category, setCategory,
    date, setDate, note, setNote, errors, submittedTransaction, submit,
  };
}
