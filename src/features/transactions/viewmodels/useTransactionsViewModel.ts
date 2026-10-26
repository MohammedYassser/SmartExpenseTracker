import { useState } from 'react';

import type { Transaction } from '@/models/Transaction';

export function useTransactionsViewModel(transactions: Transaction[]) {
  const [searchText, setSearchText] = useState('');
  const query = searchText.trim().toLowerCase();
  const filteredTransactions = transactions.filter((transaction) =>
    [transaction.category, transaction.note, transaction.date].some((value) =>
      value.toLowerCase().includes(query)
    )
  );

  return { searchText, setSearchText, filteredTransactions };
}
