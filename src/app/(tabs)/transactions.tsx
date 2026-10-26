import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import AppIcon from '@/components/AppIcon';
import { Colors, ui } from '@/constants/styles';
import TransactionItem from '@/features/transactions/components/TransactionItem';
import { useTransactionsViewModel } from '@/features/transactions/viewmodels/useTransactionsViewModel';

export default function TransactionsScreen() {
  const { searchText, setSearchText, filteredTransactions, deleteTransaction } =
    useTransactionsViewModel();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
        <Pressable accessibilityRole="button" onPress={() => router.push('/transaction-statistics')} style={[ui.linkButton, ui.iconRow]}>
          <AppIcon name="info" size={18} />
          <Text style={ui.link}>Statistics</Text>
        </Pressable>
      </View>
      <Text style={styles.subtitle}>Manage your income and expenses.</Text>
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
      <Pressable
        accessibilityRole="button"
        onPress={() => router.push('/add-transaction')}
        style={({ pressed }) => [styles.addButton, ui.iconRow, pressed && ui.pressed]}>
        <AppIcon name="add" color={Colors.surface} size={18} /><Text style={styles.addButtonText}>Add Transaction</Text>
      </Pressable>
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
  title: { ...ui.title, marginBottom: 8 },
  header: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', columnGap: 8 },
  subtitle: { ...ui.subtitle, marginBottom: 20 },
  searchInput: { ...ui.input, marginBottom: 12 },
  addButton: { ...ui.button, marginBottom: 16 },
  addButtonText: ui.buttonText,
  listContent: { paddingBottom: 24 },
});
