import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import AppIcon from '@/components/AppIcon';
import { useDashboardViewModel } from '@/features/dashboard/viewmodels/useDashboardViewModel';
import { Colors, ui } from '@/constants/styles';
import TransactionItem from '@/features/transactions/components/TransactionItem';

export default function DashboardScreen() {
  const { totalIncome, totalExpenses, totalBalance, recentTransactions } = useDashboardViewModel();
  const amountFormat = { minimumFractionDigits: 2, maximumFractionDigits: 2 };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headingRow}>
        <View style={styles.headingText}>
          <Text style={styles.greeting}>Good day, John</Text>
          <Text style={ui.subtitle}>Here's your financial overview.</Text>
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel="Profile" onPress={() => router.push('/profile')} style={({ pressed }) => [styles.profileAction, pressed && ui.pressed]}>
          <AppIcon name="profile" size={28} />
        </Pressable>
      </View>
      <View style={[styles.card, styles.balanceCard]}>
        <View style={ui.iconRow}>
          <AppIcon name="wallet" size={18} />
          <Text style={styles.balanceLabel}>Total Balance</Text>
        </View>
        <Text style={styles.currency}>EGP</Text>
        <Text style={styles.balanceAmount}>{totalBalance.toLocaleString('en-US', amountFormat)}</Text>
      </View>
      <View style={styles.summaryRow}>
        <View style={[styles.card, styles.summaryCard]}>
          <View style={ui.iconRow}><AppIcon name="income" color={Colors.income} size={16} /><Text style={styles.label}>Total Income</Text></View>
          <Text style={[styles.amount, styles.income]}>{totalIncome.toLocaleString('en-US', amountFormat)}</Text>
        </View>
        <View style={[styles.card, styles.summaryCard]}>
          <View style={ui.iconRow}><AppIcon name="expense" color={Colors.expense} size={16} /><Text style={styles.label}>Total Expenses</Text></View>
          <Text style={[styles.amount, styles.expense]}>{totalExpenses.toLocaleString('en-US', amountFormat)}</Text>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickRow}>
        <Pressable accessibilityRole="button" onPress={() => router.push('/add-transaction')} style={({ pressed }) => [styles.quickAction, styles.primaryAction, pressed && ui.pressed]}>
          <AppIcon name="add" color={Colors.surface} />
          <Text style={styles.primaryActionText}>Add Transaction</Text>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={() => router.navigate('/transactions')} style={({ pressed }) => [styles.quickAction, pressed && ui.pressed]}>
          <AppIcon name="transactions" />
          <Text style={styles.quickText}>View Transactions</Text>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={() => router.navigate('/budget')} style={({ pressed }) => [styles.quickAction, pressed && ui.pressed]}>
          <AppIcon name="wallet" />
          <Text style={styles.quickText}>Budget</Text>
        </Pressable>
      </View>
      <View style={styles.sectionRow}>
        <Text style={[styles.sectionTitle, styles.recentTitle]}>Recent Transactions</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="View all transactions" onPress={() => router.navigate('/transactions')} style={styles.viewAll}>
          <Text style={ui.link}>View all</Text>
          <AppIcon name="forward" size={14} />
        </Pressable>
      </View>
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
      <Pressable accessibilityRole="button" onPress={() => router.push('/login')} style={ui.linkButton}>
        <Text style={ui.link}>Login</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ...ui,
  content: { ...ui.content, paddingHorizontal: 20, gap: 16 },
  headingRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  headingText: { flex: 1, gap: 4 },
  greeting: { fontSize: 24, lineHeight: 31, fontWeight: '700', color: Colors.text },
  profileAction: { minWidth: 48, minHeight: 48, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.border, borderRadius: 10, backgroundColor: Colors.surface },
  currency: { fontSize: 12, color: Colors.secondary, marginTop: 8 },
  quickRow: { flexDirection: 'row', gap: 10 },
  quickAction: { flex: 1, minHeight: 88, padding: 10, gap: 8, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.border, borderRadius: 8, backgroundColor: Colors.surface },
  primaryAction: { backgroundColor: Colors.accent, borderColor: Colors.accent },
  primaryActionText: { fontSize: 12, lineHeight: 17, fontWeight: '600', color: Colors.surface, textAlign: 'center' },
  quickText: { fontSize: 12, lineHeight: 17, fontWeight: '600', color: Colors.accent, textAlign: 'center' },
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  recentTitle: { flex: 1 },
  viewAll: { ...ui.iconRow, minHeight: 44, justifyContent: 'center', gap: 4 },
  summaryRow: { flexDirection: 'row', gap: 12 },
  summaryCard: { flex: 1, padding: 16 },
  card: { ...ui.card, gap: 8 },
  balanceCard: { backgroundColor: Colors.accentLight, borderColor: Colors.border },
  balanceLabel: { fontSize: 15, color: Colors.accent },
  balanceAmount: { fontSize: 36, fontWeight: '700', color: Colors.text },
  label: { flexShrink: 1, fontSize: 13, color: Colors.secondary },
  amount: { fontSize: 21, fontWeight: '600' },
});
