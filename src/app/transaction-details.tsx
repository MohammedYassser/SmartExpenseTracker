import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useTransactions } from '@/context/transactions';

export default function TransactionDetailsScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { transactions } = useTransactions();
  const transaction = typeof id === 'string'
    ? transactions.find((item) => item.id === id)
    : undefined;

  function goBackToTransactions() {
    if (router.canGoBack()) router.back();
    else router.replace('/transactions');
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: 'Transaction Details' }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {transaction ? (
          <View style={styles.card}>
            <Text style={styles.label}>Type</Text>
            <Text style={styles.value}>{transaction.type === 'income' ? 'Income' : 'Expense'}</Text>
            <Text style={styles.label}>Amount</Text>
            <Text style={[styles.amount, transaction.type === 'income' ? styles.income : styles.expense]}>
              {transaction.type === 'income' ? '+ ' : '- '}
              {transaction.amount.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
            <Text style={styles.label}>Category</Text>
            <Text style={styles.value}>{transaction.category}</Text>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{transaction.date}</Text>
            {transaction.note.trim() ? (
              <View>
                <Text style={styles.label}>Note</Text>
                <Text style={styles.value}>{transaction.note}</Text>
              </View>
            ) : null}
          </View>
        ) : (
          <Text style={styles.value}>Transaction not found</Text>
        )}
        <Pressable
          accessibilityRole="button"
          onPress={goBackToTransactions}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
          <Text style={styles.backText}>Back to Transactions</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  content: { padding: 20, paddingBottom: 40 },
  card: { padding: 16, borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12, backgroundColor: '#ffffff' },
  label: { marginTop: 12, marginBottom: 4, fontSize: 14, fontWeight: '600', color: '#475569' },
  value: { fontSize: 16, color: '#0f172a' },
  amount: { fontSize: 24, fontWeight: '600' },
  income: { color: '#15803d' },
  expense: { color: '#b91c1c' },
  backButton: {
    minHeight: 48, marginTop: 24, padding: 14, alignItems: 'center',
    justifyContent: 'center', borderRadius: 10, backgroundColor: '#1d4ed8',
  },
  pressed: { opacity: 0.8 },
  backText: { fontSize: 16, fontWeight: '600', color: '#ffffff' },
});
