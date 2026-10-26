import { Stack } from 'expo-router';

import { Colors } from '@/constants/styles';
import { BudgetsProvider } from '@/context/budgets';
import { TransactionsProvider } from '@/context/transactions';

export default function RootLayout() {
  return (
    <TransactionsProvider>
      <BudgetsProvider>
        <Stack screenOptions={{
          headerShown: false,
          headerStyle: { backgroundColor: Colors.surface },
          headerTintColor: Colors.accent,
          headerTitleStyle: { color: Colors.text, fontWeight: '600' },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: Colors.background },
        }} />
      </BudgetsProvider>
    </TransactionsProvider>
  );
}
