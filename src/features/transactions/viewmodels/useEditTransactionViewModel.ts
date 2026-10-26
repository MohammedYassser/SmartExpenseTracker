import { useState } from 'react';

import { useTransactions } from '@/context/transactions';
import type { Transaction } from '@/models/Transaction';

interface FormErrors {
  amount?: string;
  category?: string;
  date?: string;
}

export function useEditTransactionViewModel(id: string | undefined) {
  const { transactions, updateTransaction } = useTransactions();
  const transaction = transactions.find((item) => item.id === id);
  const [type, setType] = useState<Transaction['type']>(transaction?.type ?? 'expense');
  const [amount, setAmount] = useState(transaction?.amount.toString() ?? '');
  const [category, setCategory] = useState(transaction?.category ?? '');
  const [date, setDate] = useState(transaction?.date ?? '');
  const [note, setNote] = useState(transaction?.note ?? '');
  const [errors, setErrors] = useState<FormErrors>({});

  function submit() {
    if (!transaction) return false;
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

    const updatedTransaction: Transaction = {
      id: transaction.id,
      type,
      amount: numericAmount,
      category: category.trim(),
      date: date.trim(),
      note: note.trim(),
    };
    updateTransaction(updatedTransaction);
    return true;
  }

  return {
    transaction, type, setType, amount, setAmount, category, setCategory,
    date, setDate, note, setNote, errors, submit,
  };
}
