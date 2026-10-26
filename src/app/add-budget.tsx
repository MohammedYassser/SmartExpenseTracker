import { router, Stack } from 'expo-router';
import { ScrollView, Text } from 'react-native';

import { ui } from '@/constants/styles';
import BudgetForm from '@/features/budget/components/BudgetForm';

export default function AddBudgetScreen() {
  function returnToBudget() {
    if (router.canGoBack()) router.back();
    else router.replace('/budget');
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: 'Add Budget' }} />
      <ScrollView style={ui.container} contentContainerStyle={ui.content} keyboardShouldPersistTaps="handled" automaticallyAdjustKeyboardInsets>
        <Text style={ui.subtitle}>Choose a category and set your spending limit.</Text>
        <BudgetForm onSaved={returnToBudget} />
      </ScrollView>
    </>
  );
}
