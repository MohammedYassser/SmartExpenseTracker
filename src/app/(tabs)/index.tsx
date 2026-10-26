import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useDashboardViewModel } from '@/features/dashboard/viewmodels/useDashboardViewModel';
import { Colors, ui } from '@/constants/styles';
import TransactionItem from '@/features/transactions/components/TransactionItem';

export default function DashboardScreen() {
  const { totalIncome, totalExpenses, totalBalance, recentTransactions } = useDashboardViewModel();
  const amountFormat = { minimumFractionDigits: 2, maximumFractionDigits: 2 };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headingRow}>
        <Text style={[styles.title, styles.headingTitle]}>Smart Expense Tracker</Text>
        <Pressable accessibilityRole="button" onPress={() => router.push('/login')} style={styles.loginAction}>
          <Text style={ui.link}>Login</Text>
        </Pressable>
      </View>
      <Text style={ui.subtitle}>A clear view of your money.</Text>
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
  ...ui,
  content: { ...ui.content, gap: 16 },
  headingRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  headingTitle: { flex: 1, fontSize: 24, lineHeight: 31 },
  loginAction: { minHeight: 44, paddingHorizontal: 4, justifyContent: 'center' },
  card: { ...ui.card, gap: 8 },
  balanceCard: { backgroundColor: Colors.accentLight, borderColor: Colors.border },
  balanceLabel: { fontSize: 15, color: Colors.accent },
  balanceAmount: { fontSize: 36, fontWeight: '700', color: Colors.text },
  label: { fontSize: 14, color: Colors.secondary },
  amount: { fontSize: 24, fontWeight: '600' },
});
