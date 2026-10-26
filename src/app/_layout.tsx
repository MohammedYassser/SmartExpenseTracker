import { Stack } from 'expo-router';

import { TransactionsProvider } from '@/context/transactions';

export default function RootLayout() {
  return (
    <TransactionsProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </TransactionsProvider>
  );
}
