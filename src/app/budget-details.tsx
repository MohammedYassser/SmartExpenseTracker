import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { ui } from '@/constants/styles';
import BudgetCard from '@/features/budget/components/BudgetCard';
import BudgetForm from '@/features/budget/components/BudgetForm';
import { useBudgetViewModel } from '@/features/budget/viewmodels/useBudgetViewModel';

export default function BudgetDetailsScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { budgetSummaries, deleteBudget } = useBudgetViewModel();
  const summary = typeof id === 'string' ? budgetSummaries.find((item) => item.budget.id === id) : undefined;
  const [editing, setEditing] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  function returnToBudget() {
    if (router.canGoBack()) router.back();
    else router.replace('/budget');
  }

  function confirmDelete() {
    if (!summary) return;
    deleteBudget(summary.budget.id);
    returnToBudget();
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: editing ? 'Edit Budget' : 'Budget Details' }} />
      <ScrollView style={ui.container} contentContainerStyle={ui.content} keyboardShouldPersistTaps="handled" automaticallyAdjustKeyboardInsets>
        {!summary ? (
          <>
            <Text style={ui.emptyText}>Budget not found.</Text>
            <Pressable accessibilityRole="button" onPress={() => router.replace('/budget')} style={ui.button}>
              <Text style={ui.buttonText}>Back to Budget</Text>
            </Pressable>
          </>
        ) : editing ? (
          <BudgetForm key={summary.budget.id} budget={summary.budget} onSaved={returnToBudget} onCancel={() => setEditing(false)} />
        ) : (
          <>
            <BudgetCard budget={summary.budget} spent={summary.spent} />
            {confirmingDelete ? (
              <View style={ui.card}>
                <Text style={ui.sectionTitle}>Delete this budget?</Text>
                <Text style={[ui.subtitle, { marginVertical: 12 }]}>This cannot be undone.</Text>
                <Pressable accessibilityRole="button" onPress={confirmDelete} style={ui.button}>
                  <Text style={ui.buttonText}>Delete</Text>
                </Pressable>
                <Pressable accessibilityRole="button" onPress={() => setConfirmingDelete(false)} style={ui.linkButton}>
                  <Text style={ui.link}>Cancel</Text>
                </Pressable>
              </View>
            ) : (
              <>
                <Pressable accessibilityRole="button" onPress={() => setEditing(true)} style={ui.button}>
                  <Text style={ui.buttonText}>Edit Budget</Text>
                </Pressable>
                <Pressable accessibilityRole="button" onPress={() => setConfirmingDelete(true)} style={ui.linkButton}>
                  <Text style={[ui.link, ui.expense]}>Delete Budget</Text>
                </Pressable>
              </>
            )}
          </>
        )}
      </ScrollView>
    </>
  );
}
