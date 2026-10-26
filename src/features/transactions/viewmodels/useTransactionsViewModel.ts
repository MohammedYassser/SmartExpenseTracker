import { useState } from 'react';

import { useTransactions } from '@/context/transactions';

export function useTransactionsViewModel() {
  const { transactions } = useTransactions();
  const [searchText, setSearchText] = useState('');
  const query = searchText.trim().toLowerCase();
  const filteredTransactions = transactions.filter((transaction) =>
    [transaction.category, transaction.note, transaction.date].some((value) =>
      value.toLowerCase().includes(query)
    )
  );

  return { searchText, setSearchText, filteredTransactions };
}
