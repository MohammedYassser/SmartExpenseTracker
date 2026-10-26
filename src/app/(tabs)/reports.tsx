import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import AppIcon from '@/components/AppIcon';
import { Colors, ui } from '@/constants/styles';
import CategoryReportItem from '@/features/reports/components/CategoryReportItem';
import { useReportsViewModel } from '@/features/reports/viewmodels/useReportsViewModel';

function ReportRow({ label, value }: { label: string; value: string | number }) {
  return (
    <View style={styles.row}>
      <Text style={[ui.subtitle, styles.rowLabel]}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

export default function ReportsScreen() {
  const report = useReportsViewModel();
  const format = (amount: number) => amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <FlatList
      style={ui.container}
      contentContainerStyle={ui.content}
      data={report.categoryReports}
      keyExtractor={(item) => item.category.toLowerCase()}
      renderItem={({ item }) => <CategoryReportItem report={item} />}
      ListHeaderComponent={
        <View>
          <Text style={ui.title}>Reports</Text>
          <Text style={[ui.subtitle, styles.intro]}>Understand where your money is going.</Text>
          <Pressable accessibilityRole="button" onPress={() => router.push('/monthly-summary')} style={({ pressed }) => [ui.secondaryButton, ui.iconRow, styles.section, pressed && ui.pressed]}>
            <AppIcon name="wallet" size={18} />
            <Text style={ui.link}>Monthly Summary</Text>
            <AppIcon name="forward" size={18} />
          </Pressable>
          {report.totalCount === 0 ? (
            <View style={[ui.card, styles.section]}>
              <Text style={ui.sectionTitle}>No transaction data yet.</Text>
              <Text style={[ui.subtitle, { marginVertical: 12 }]}>Add transactions to start seeing your financial reports.</Text>
              <Pressable accessibilityRole="button" onPress={() => router.navigate('/transactions')} style={({ pressed }) => [ui.button, pressed && ui.pressed]}>
                <Text style={ui.buttonText}>View Transactions</Text>
              </Pressable>
            </View>
          ) : null}
          <View style={[ui.card, styles.section]}>
            <Text style={ui.subtitle}>Total Income</Text>
            <Text style={[styles.amount, ui.income]}>{format(report.totalIncome)}</Text>
          </View>
          <View style={[ui.card, styles.section]}>
            <Text style={ui.subtitle}>Total Expenses</Text>
            <Text style={[styles.amount, ui.expense]}>{format(report.totalExpenses)}</Text>
          </View>
          <View style={[ui.card, styles.section, styles.balanceCard]}>
            <Text style={ui.subtitle}>Net Balance</Text>
            <Text style={[styles.amount, styles.balance]}>{format(report.netBalance)}</Text>
          </View>
          <Text style={[ui.sectionTitle, styles.section]}>Spending by Category</Text>
        </View>
      }
      ListEmptyComponent={<Text style={ui.emptyText}>No expense data yet.</Text>}
      ListFooterComponent={
        <View>
          <View style={[ui.card, styles.section]}>
            <Text style={ui.sectionTitle}>Top Spending Category</Text>
            {report.topCategory ? (
              <ReportRow label={report.topCategory.category} value={format(report.topCategory.amount)} />
            ) : <Text style={[ui.subtitle, { marginTop: 12 }]}>No expenses yet.</Text>}
          </View>
          <View style={[ui.card, styles.section]}>
            <Text style={ui.sectionTitle}>Transaction Summary</Text>
            <ReportRow label="Income Transactions" value={report.incomeCount} />
            <ReportRow label="Expense Transactions" value={report.expenseCount} />
            <ReportRow label="Total Transactions" value={report.totalCount} />
          </View>
          <View style={ui.card}>
            <Text style={ui.sectionTitle}>Budget Summary</Text>
            {report.hasBudgets ? (
              <>
                <ReportRow label="Total Budget" value={format(report.totalBudget)} />
                <ReportRow label="Total Spent" value={format(report.budgetSpent)} />
                <ReportRow label="Remaining Budget" value={format(report.remainingBudget)} />
                <Text style={ui.hint}>Spending in your budget categories.</Text>
              </>
            ) : <Text style={[ui.subtitle, { marginTop: 12 }]}>No budgets available.</Text>}
            <Pressable accessibilityRole="button" onPress={() => router.navigate('/budget')} style={ui.linkButton}>
              <Text style={ui.link}>View Budget</Text>
            </Pressable>
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  intro: { marginTop: 8, marginBottom: 24 },
  section: { marginBottom: 16 },
  amount: { fontSize: 28, fontWeight: '600', marginTop: 8 },
  balanceCard: { backgroundColor: Colors.accentLight },
  balance: { color: Colors.accent },
  row: { flexDirection: 'row', gap: 12, justifyContent: 'space-between', marginTop: 12 },
  rowLabel: { flex: 1 },
  rowValue: { flexShrink: 1, fontSize: 15, fontWeight: '600', color: Colors.text, textAlign: 'right' },
});
