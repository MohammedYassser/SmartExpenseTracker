import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors, ui } from '@/constants/styles';
import TransactionItem from '@/features/transactions/components/TransactionItem';
import { useTransactionsViewModel } from '@/features/transactions/viewmodels/useTransactionsViewModel';

export default function TransactionsScreen() {
  const { searchText, setSearchText, filteredTransactions, deleteTransaction } =
    useTransactionsViewModel();

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
        placeholderTextColor={Colors.secondary}
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
          renderItem={({ item }) => (
            <TransactionItem
              transaction={item}
              onPress={() => router.push({ pathname: '/transaction-details', params: { id: item.id } })}
              onEdit={() => router.push({ pathname: '/edit-transaction', params: { id: item.id } })}
              onDelete={() => deleteTransaction(item.id)}
            />
          )}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  ...ui,
  container: { ...ui.container, paddingHorizontal: 24, paddingTop: 24 },
  title: { ...ui.title, marginBottom: 20 },
  searchInput: { ...ui.input, marginBottom: 20 },
  addButton: { ...ui.button, marginBottom: 16 },
  addButtonText: ui.buttonText,
  listContent: { paddingBottom: 24 },
});
