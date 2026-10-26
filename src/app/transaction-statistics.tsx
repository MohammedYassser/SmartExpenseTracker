import { router, Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import AppIcon from '@/components/AppIcon';
import { Colors, ui } from '@/constants/styles';
import { useTransactionStatisticsViewModel } from '@/features/transactions/viewmodels/useTransactionStatisticsViewModel';

function formatAmount(amount: number) {
  return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function TransactionStatisticsScreen() {
  const statistics = useTransactionStatisticsViewModel();

  function returnToTransactions() {
    if (router.canGoBack()) router.back();
    else router.replace('/transactions');
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: 'Statistics' }} />
      <ScrollView style={ui.container} contentContainerStyle={styles.content}>
        <View style={ui.iconRow}>
          <View style={ui.iconBadge}><AppIcon name="transactions" /></View>
          <Text style={styles.eyebrow}>ALL TRANSACTIONS</Text>
        </View>
        <Text style={ui.title}>Transaction Statistics</Text>
        <Text style={ui.subtitle}>Your overall income, spending and transaction patterns.</Text>

        {statistics.totalCount === 0 ? (
          <View style={[ui.card, styles.empty]}>
            <AppIcon name="wallet" size={30} />
            <Text style={ui.sectionTitle}>No transaction data yet</Text>
            <Text style={styles.emptyText}>Your statistics will appear here after you add transactions.</Text>
            <Pressable accessibilityRole="button" onPress={() => router.push('/add-transaction')} style={ui.button}>
              <Text style={ui.buttonText}>Add Transaction</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <Text style={styles.heading}>Overview</Text>
            <View style={[ui.card, styles.overview]}>
              <View style={styles.metrics}>
                <View style={styles.metric}>
                  <Text style={ui.subtitle}>Total transactions</Text>
                  <Text style={styles.mainValue}>{statistics.totalCount}</Text>
                </View>
                <View style={styles.metric}>
                  <Text style={ui.subtitle}>Average amount</Text>
                  <Text style={styles.value}>{formatAmount(statistics.averageAmount)}</Text>
                </View>
              </View>
              <View style={styles.divider} />
              <View style={styles.metrics}>
                <View style={styles.metric}>
                  <Text style={ui.subtitle}>Total income</Text>
                  <Text style={[styles.value, ui.income]}>{formatAmount(statistics.totalIncome)}</Text>
                </View>
                <View style={styles.metric}>
                  <Text style={ui.subtitle}>Total expenses</Text>
                  <Text style={[styles.value, ui.expense]}>{formatAmount(statistics.totalExpenses)}</Text>
                </View>
              </View>
              <Text style={styles.caption}>Amounts in EGP. Average includes income and expenses.</Text>
            </View>

            <Text style={styles.heading}>Income vs Expenses</Text>
            <View style={[ui.card, styles.group]}>
              <Text style={ui.subtitle}>Share of total transaction amount</Text>
              {[
                { label: 'Income', icon: 'income' as const, count: statistics.incomeCount, percentage: statistics.incomePercentage, color: Colors.income },
                { label: 'Expenses', icon: 'expense' as const, count: statistics.expenseCount, percentage: statistics.expensePercentage, color: Colors.expense },
              ].map((type) => (
                <View key={type.label} style={styles.group}>
                  <View style={styles.row}>
                    <View style={ui.iconRow}><AppIcon name={type.icon} color={type.color} size={18} /><Text style={styles.rowTitle}>{type.label}</Text></View>
                    <Text style={ui.subtitle}>{type.count} {type.count === 1 ? 'transaction' : 'transactions'}</Text>
                  </View>
                  <View accessibilityRole="progressbar" accessibilityLabel={`${type.label} share of total amount`} accessibilityValue={{ min: 0, max: 100, now: type.percentage }} style={styles.track}>
                    <View style={[styles.fill, { width: `${type.percentage}%`, backgroundColor: type.color }]} />
                  </View>
                  <Text style={styles.caption}>{type.percentage.toFixed(1)}% of total amount</Text>
                </View>
              ))}
            </View>

            <Text style={styles.heading}>Spending by Category</Text>
            <View style={[ui.card, styles.group]}>
              {statistics.topCategory ? (
                <>
                  <View style={styles.insight}>
                    <Text style={styles.eyebrow}>TOP SPENDING CATEGORY</Text>
                    <Text style={ui.sectionTitle}>{statistics.topCategory.category}</Text>
                    <Text style={styles.value}>{formatAmount(statistics.topCategory.amount)} EGP</Text>
                  </View>
                  {statistics.categoryBreakdown.map((category) => (
                    <View key={category.category} style={styles.category}>
                      <View style={styles.row}>
                        <Text style={styles.rowTitle}>{category.category}</Text>
                        <Text style={styles.categoryAmount}>{formatAmount(category.amount)}</Text>
                      </View>
                      <View accessibilityRole="progressbar" accessibilityLabel={`${category.category} share of expenses`} accessibilityValue={{ min: 0, max: 100, now: category.percentage }} style={styles.track}>
                        <View style={[styles.fill, { width: `${category.percentage}%` }]} />
                      </View>
                      <Text style={styles.caption}>{category.percentage.toFixed(1)}% of total expenses</Text>
                    </View>
                  ))}
                </>
              ) : <Text style={ui.subtitle}>No expenses yet. Category insights will appear after you add an expense.</Text>}
            </View>

            <Text style={styles.heading}>Largest Transactions</Text>
            <View style={[ui.card, styles.group]}>
              {[
                { label: 'Highest income', transaction: statistics.highestIncome, icon: 'income' as const, color: Colors.income },
                { label: 'Highest expense', transaction: statistics.highestExpense, icon: 'expense' as const, color: Colors.expense },
              ].map((item) => (
                <View key={item.label} style={styles.largest}>
                  <View style={ui.iconRow}><AppIcon name={item.icon} color={item.color} size={18} /><Text style={styles.rowTitle}>{item.label}</Text></View>
                  {item.transaction ? (
                    <>
                      <Text style={[styles.value, { color: item.color }]}>{formatAmount(item.transaction.amount)} EGP</Text>
                      <Text style={ui.subtitle}>{item.transaction.category} · {item.transaction.date}</Text>
                      {item.transaction.note ? <Text style={styles.caption}>{item.transaction.note}</Text> : null}
                    </>
                  ) : <Text style={ui.subtitle}>No {item.icon} transactions yet.</Text>}
                </View>
              ))}
            </View>
          </>
        )}
        <Pressable accessibilityRole="button" onPress={returnToTransactions} style={[ui.secondaryButton, styles.back]}>
          <Text style={ui.link}>Back to Transactions</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: { ...ui.content, gap: 12 },
  eyebrow: { color: Colors.accent, fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  heading: { ...ui.sectionTitle, marginTop: 14 },
  overview: { gap: 16 },
  metrics: { flexDirection: 'row', gap: 18 },
  metric: { flex: 1, gap: 6 },
  mainValue: { fontSize: 30, fontWeight: '700', color: Colors.accent },
  value: { fontSize: 21, fontWeight: '700', color: Colors.text },
  divider: { height: 1, backgroundColor: Colors.border },
  caption: { color: Colors.secondary, fontSize: 12, lineHeight: 18 },
  group: { gap: 12 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  rowTitle: { fontSize: 15, fontWeight: '600', color: Colors.text, flexShrink: 1 },
  categoryAmount: { fontSize: 15, fontWeight: '600', color: Colors.text },
  track: { height: 8, borderRadius: 4, overflow: 'hidden', backgroundColor: Colors.accentLight },
  fill: { height: '100%', backgroundColor: Colors.accent },
  insight: { padding: 14, borderRadius: 8, backgroundColor: Colors.accentLight, gap: 6 },
  category: { gap: 8, paddingTop: 8 },
  largest: { gap: 8, paddingVertical: 6 },
  empty: { marginTop: 20, gap: 16 },
  emptyText: { ...ui.subtitle, lineHeight: 24 },
  back: { marginTop: 12 },
});
