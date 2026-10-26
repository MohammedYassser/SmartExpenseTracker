import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import TransactionItem from '@/features/transactions/components/TransactionItem';
import { useTransactionsViewModel } from '@/features/transactions/viewmodels/useTransactionsViewModel';
import type { Transaction } from '@/models/Transaction';

export default function TransactionsScreen() {
  const sampleTransactions: Transaction[] = [
    { id: '1', type: 'expense', amount: 150, category: 'Food', date: '2026-10-25', note: 'Lunch' },
    { id: '2', type: 'expense', amount: 300, category: 'Transport', date: '2026-10-24', note: 'Taxi' },
    { id: '3', type: 'income', amount: 5000, category: 'Salary', date: '2026-10-01', note: 'Monthly salary' },
  ];
  const { searchText, setSearchText, filteredTransactions } =
    useTransactionsViewModel(sampleTransactions);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => router.push('/add-transaction')}
        style={({ pressed }) => [styles.addButton, pressed && { opacity: 0.8 }]}>
        <Text style={styles.addButtonText}>Add Transaction</Text>
      </Pressable>
      <TextInput
        style={styles.searchInput}
        placeholder="Search transactions..."
        placeholderTextColor="#64748b"
        accessibilityLabel="Search transactions"
        value={searchText}
        onChangeText={setSearchText}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {filteredTransactions.length === 0 ? (
        <Text style={styles.emptyText}>No transactions found.</Text>
      ) : (
        <FlatList
          data={filteredTransactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionItem transaction={item} />}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    color: '#0f172a',
  },
  searchInput: {
    minHeight: 48,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    color: '#0f172a',
    fontSize: 16,
  },
  addButton: {
    minHeight: 48,
    padding: 14,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#1d4ed8',
  },
  addButtonText: { fontSize: 16, fontWeight: '600', color: '#ffffff' },
  listContent: { paddingBottom: 24 },
  emptyText: { paddingVertical: 32, textAlign: 'center', color: '#475569', fontSize: 16 },
});
