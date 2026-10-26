import { router } from 'expo-router';
import { FlatList, Pressable, Text, View } from 'react-native';

import AppIcon from '@/components/AppIcon';
import { Colors, ui } from '@/constants/styles';
import BudgetCard from '@/features/budget/components/BudgetCard';
import { useBudgetViewModel } from '@/features/budget/viewmodels/useBudgetViewModel';

export default function BudgetScreen() {
  const { budgetSummaries, totalBudget, totalSpent, remaining } = useBudgetViewModel();
  const format = { minimumFractionDigits: 2, maximumFractionDigits: 2 };

  return (
    <FlatList
      style={ui.container}
      contentContainerStyle={ui.content}
      data={budgetSummaries}
      keyExtractor={(item) => item.budget.id}
      ListHeaderComponent={
        <View>
          <Text style={ui.title}>Budget</Text>
          <Text style={[ui.subtitle, { marginTop: 8, marginBottom: 24 }]}>Plan your spending and keep track of your limits.</Text>
          <View style={ui.card}>
            <Text style={ui.sectionTitle}>Total Budget</Text>
            <Text style={[ui.title, { marginTop: 8, color: Colors.accent }]}>{totalBudget.toLocaleString('en-US', format)}</Text>
            <View style={{ flexDirection: 'row', gap: 16 }}>
              <View style={{ flex: 1 }}>
                <Text style={ui.label}>Total Spent</Text>
                <Text style={ui.subtitle}>{totalSpent.toLocaleString('en-US', format)}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={ui.label}>Remaining</Text>
                <Text style={[ui.sectionTitle, remaining < 0 && ui.expense]}>{remaining.toLocaleString('en-US', format)}</Text>
              </View>
            </View>
            <Text style={ui.hint}>Spending in your budget categories.</Text>
          </View>
          <Pressable accessibilityRole="button" onPress={() => router.push('/add-budget')} style={({ pressed }) => [ui.button, ui.iconRow, { marginVertical: 20 }, pressed && ui.pressed]}>
            <AppIcon name="add" color={Colors.surface} size={18} /><Text style={ui.buttonText}>Add Budget</Text>
          </Pressable>
          <Text style={[ui.sectionTitle, { marginBottom: 16 }]}>Category Budgets</Text>
        </View>
      }
      renderItem={({ item }) => (
        <BudgetCard budget={item.budget} spent={item.spent} onPress={() => router.push({ pathname: '/budget-details', params: { id: item.budget.id } })} />
      )}
      ListEmptyComponent={<Text style={ui.emptyText}>No budgets yet.</Text>}
    />
  );
}
