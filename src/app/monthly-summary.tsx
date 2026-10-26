import { router, Stack } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import AppIcon from '@/components/AppIcon';
import { Colors, ui } from '@/constants/styles';
import { useMonthlySummaryViewModel } from '@/features/reports/viewmodels/useMonthlySummaryViewModel';

function formatAmount(amount: number) {
  return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function MonthlySummaryScreen() {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const year = selectedMonth.getFullYear();
  const month = selectedMonth.getMonth();
  const summary = useMonthlySummaryViewModel(year, month);
  const monthLabel = selectedMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  function returnToReports() {
    if (router.canGoBack()) router.back();
    else router.replace('/reports');
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: 'Monthly Summary' }} />
      <ScrollView style={ui.container} contentContainerStyle={styles.content}>
        <View style={ui.iconRow}>
          <View style={ui.iconBadge}><AppIcon name="wallet" /></View>
          <Text style={styles.eyebrow}>YOUR MONTH IN REVIEW</Text>
        </View>
        <Text style={ui.title}>Monthly Summary</Text>
        <Text style={ui.subtitle}>Income, spending and activity for your selected month.</Text>

        <View style={[ui.card, styles.selector]}>
          <Pressable accessibilityRole="button" accessibilityLabel="Previous month" onPress={() => setSelectedMonth(new Date(year, month - 1, 1))} style={({ pressed }) => [styles.monthButton, pressed && ui.pressed]}>
            <View style={styles.previousIcon}><AppIcon name="forward" /></View>
          </Pressable>
          <Text accessibilityLiveRegion="polite" style={styles.monthLabel}>{monthLabel}</Text>
          <Pressable accessibilityRole="button" accessibilityLabel="Next month" accessibilityState={{ disabled: !summary.canGoNext }} disabled={!summary.canGoNext} onPress={() => setSelectedMonth(new Date(year, month + 1, 1))} style={({ pressed }) => [styles.monthButton, !summary.canGoNext && styles.disabled, pressed && ui.pressed]}>
            <AppIcon name="forward" />
          </Pressable>
        </View>

        {summary.totalCount === 0 ? (
          <View style={[ui.card, styles.group]}>
            <AppIcon name="transactions" size={26} />
            <Text style={ui.sectionTitle}>No transactions this month</Text>
            <Text style={ui.subtitle}>There are no transactions recorded for {monthLabel}.</Text>
            <Pressable accessibilityRole="button" onPress={() => router.navigate('/transactions')} style={ui.button}>
              <Text style={ui.buttonText}>View Transactions</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <View style={[ui.card, styles.balanceCard]}>
              <Text style={ui.subtitle}>Monthly Balance</Text>
              <Text style={[styles.balance, summary.netBalance < 0 && ui.expense]}>{formatAmount(summary.netBalance)} <Text style={styles.currency}>EGP</Text></Text>
              <Text style={styles.caption}>Income minus expenses in {monthLabel}</Text>
              <View style={styles.divider} />
              <View style={styles.row}>
                <View style={styles.metric}>
                  <View style={ui.iconRow}><AppIcon name="income" color={Colors.income} size={16} /><Text style={ui.subtitle}>Income</Text></View>
                  <Text style={[styles.value, ui.income]}>{formatAmount(summary.totalIncome)}</Text>
                </View>
                <View style={styles.metric}>
                  <View style={ui.iconRow}><AppIcon name="expense" color={Colors.expense} size={16} /><Text style={ui.subtitle}>Expenses</Text></View>
                  <Text style={[styles.value, ui.expense]}>{formatAmount(summary.totalExpenses)}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.heading}>Monthly Activity</Text>
            <View style={[ui.card, styles.row]}>
              {[
                { label: 'Transactions', value: summary.totalCount },
                { label: 'Income', value: summary.incomeCount },
                { label: 'Expenses', value: summary.expenseCount },
              ].map((activity) => (
                <View key={activity.label} style={styles.metric}>
                  <Text style={styles.activityValue}>{activity.value}</Text>
                  <Text style={styles.caption}>{activity.label}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.heading}>Spending by Category</Text>
            <View style={[ui.card, styles.group]}>
              {summary.topCategory ? (
                <>
                  <View style={styles.insight}>
                    <Text style={styles.eyebrow}>TOP CATEGORY THIS MONTH</Text>
                    <Text style={ui.sectionTitle}>{summary.topCategory.category}</Text>
                    <Text style={styles.value}>{formatAmount(summary.topCategory.amount)} EGP</Text>
                  </View>
                  {summary.categoryReports.map((category) => (
                    <View key={category.category} style={styles.group}>
                      <View style={styles.row}>
                        <Text style={styles.categoryLabel}>{category.category}</Text>
                        <Text style={styles.categoryAmount}>{formatAmount(category.amount)}</Text>
                      </View>
                      <View accessibilityRole="progressbar" accessibilityLabel={`${category.category} share of monthly expenses`} accessibilityValue={{ min: 0, max: 100, now: category.percentage }} style={styles.track}>
                        <View style={[styles.fill, { width: `${category.percentage}%` }]} />
                      </View>
                      <Text style={styles.caption}>{category.percentage.toFixed(1)}% of this month's expenses</Text>
                    </View>
                  ))}
                </>
              ) : <Text style={ui.subtitle}>No expenses recorded for {monthLabel}.</Text>}
            </View>

            <Text style={styles.heading}>Largest Transactions This Month</Text>
            <View style={[ui.card, styles.group]}>
              {[
                { label: 'Largest expense', transaction: summary.largestExpense, icon: 'expense' as const, color: Colors.expense },
                { label: 'Largest income', transaction: summary.largestIncome, icon: 'income' as const, color: Colors.income },
              ].map((item) => (
                <View key={item.label} style={styles.largest}>
                  <View style={ui.iconRow}><AppIcon name={item.icon} color={item.color} size={18} /><Text style={styles.categoryLabel}>{item.label}</Text></View>
                  {item.transaction ? (
                    <>
                      <Text style={[styles.value, { color: item.color }]}>{formatAmount(item.transaction.amount)} EGP</Text>
                      <Text style={ui.subtitle}>{item.transaction.category} · {item.transaction.date}</Text>
                      {item.transaction.note ? <Text style={styles.caption}>{item.transaction.note}</Text> : null}
                    </>
                  ) : <Text style={ui.subtitle}>No {item.icon} transactions this month.</Text>}
                </View>
              ))}
            </View>
            <Text style={styles.caption}>All amounts in EGP. This report includes only {monthLabel}.</Text>
          </>
        )}
        <Pressable accessibilityRole="button" onPress={returnToReports} style={[ui.secondaryButton, styles.back]}>
          <Text style={ui.link}>Back to Reports</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: { ...ui.content, gap: 12 },
  eyebrow: { color: Colors.accent, fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  selector: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 8, marginVertical: 8 },
  monthButton: { minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 8, backgroundColor: Colors.accentLight },
  previousIcon: { transform: [{ rotate: '180deg' }] },
  monthLabel: { flex: 1, textAlign: 'center', fontSize: 17, fontWeight: '600', color: Colors.text },
  disabled: { opacity: 0.35 },
  balanceCard: { backgroundColor: Colors.accentLight, gap: 12 },
  balance: { fontSize: 32, fontWeight: '700', color: Colors.accent },
  currency: { fontSize: 14, fontWeight: '600' },
  caption: { color: Colors.secondary, fontSize: 12, lineHeight: 18 },
  divider: { height: 1, backgroundColor: Colors.border, marginVertical: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  metric: { flex: 1, gap: 8 },
  value: { fontSize: 21, fontWeight: '700', color: Colors.text },
  heading: { ...ui.sectionTitle, marginTop: 14 },
  activityValue: { fontSize: 24, fontWeight: '700', color: Colors.accent },
  group: { gap: 16 },
  insight: { padding: 14, borderRadius: 8, backgroundColor: Colors.accentLight, gap: 6 },
  categoryLabel: { flexShrink: 1, fontSize: 15, fontWeight: '600', color: Colors.text },
  categoryAmount: { flexShrink: 1, fontSize: 15, fontWeight: '600', color: Colors.text, textAlign: 'right' },
  track: { height: 8, borderRadius: 4, overflow: 'hidden', backgroundColor: Colors.accentLight },
  fill: { height: '100%', backgroundColor: Colors.accent },
  largest: { gap: 8, paddingVertical: 4 },
  back: { marginTop: 12 },
});
