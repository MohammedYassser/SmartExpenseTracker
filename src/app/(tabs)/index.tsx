import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useDashboardViewModel } from '@/features/dashboard/viewmodels/useDashboardViewModel';
import TransactionItem from '@/features/transactions/components/TransactionItem';

export default function DashboardScreen() {
  const { totalIncome, totalExpenses, totalBalance, recentTransactions } = useDashboardViewModel();
  const amountFormat = { minimumFractionDigits: 2, maximumFractionDigits: 2 };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Smart Expense Tracker</Text>
      <View style={[styles.card, styles.balanceCard]}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>{totalBalance.toLocaleString('en-US', amountFormat)}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Total Income</Text>
        <Text style={[styles.amount, styles.income]}>{totalIncome.toLocaleString('en-US', amountFormat)}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Total Expenses</Text>
        <Text style={[styles.amount, styles.expense]}>{totalExpenses.toLocaleString('en-US', amountFormat)}</Text>
      </View>
      <Text style={styles.sectionTitle}>Recent Transactions</Text>
      <View>
        {recentTransactions.length === 0 ? (
          <Text style={styles.label}>No recent transactions.</Text>
        ) : (
          recentTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onPress={() => router.push({ pathname: '/transaction-details', params: { id: transaction.id } })}
            />
          ))
        )}
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={() => router.navigate('/transactions')}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
        <Text style={styles.buttonText}>View Transactions</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: { padding: 20, paddingBottom: 40, gap: 16 },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0f172a',
  },
  card: { padding: 20, gap: 8, borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12, backgroundColor: '#ffffff' },
  sectionTitle: { fontSize: 20, fontWeight: '600', color: '#0f172a' },
  balanceCard: { backgroundColor: '#1d4ed8', borderColor: '#1d4ed8' },
  balanceLabel: { fontSize: 16, color: '#ffffff' },
  balanceAmount: { fontSize: 36, fontWeight: '700', color: '#ffffff' },
  label: { fontSize: 16, color: '#475569' },
  amount: { fontSize: 24, fontWeight: '600' },
  income: { color: '#15803d' },
  expense: { color: '#b91c1c' },
  button: {
    minHeight: 48, padding: 14, alignItems: 'center', justifyContent: 'center',
    borderRadius: 10, backgroundColor: '#1d4ed8',
  },
  pressed: { opacity: 0.8 },
  buttonText: { fontSize: 16, fontWeight: '600', color: '#ffffff' },
});
