import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/styles';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors.accent,
      tabBarInactiveTintColor: Colors.secondary,
      tabBarActiveBackgroundColor: Colors.accentLight,
      tabBarLabelPosition: 'below-icon',
      tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      tabBarItemStyle: { borderRadius: 10, marginHorizontal: 4, overflow: 'hidden' },
      tabBarStyle: {
        height: 68 + insets.bottom,
        paddingTop: 6,
        paddingBottom: Math.max(insets.bottom, 6),
        paddingHorizontal: 8,
        backgroundColor: Colors.surface,
        borderTopColor: Colors.border,
        borderTopWidth: 1,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
      },
      headerStyle: { backgroundColor: Colors.surface },
      headerTintColor: Colors.accent,
      headerTitleStyle: { color: Colors.text, fontWeight: '600' },
      headerShadowVisible: false,
    }}>
      <Tabs.Screen name="index" options={{
        title: 'Dashboard',
        tabBarIcon: ({ color }) => <SymbolView name={{ ios: 'house', android: 'home', web: 'home' }} tintColor={color} size={20} />,
      }} />
      <Tabs.Screen name="transactions" options={{
        title: 'Transactions',
        tabBarIcon: ({ color }) => <SymbolView name={{ ios: 'arrow.left.arrow.right', android: 'swap_horiz', web: 'swap_horiz' }} tintColor={color} size={20} />,
      }} />
      <Tabs.Screen name="budget" options={{
        title: 'Budget',
        tabBarIcon: ({ color }) => <SymbolView name={{ ios: 'wallet.pass', android: 'account_balance_wallet', web: 'account_balance_wallet' }} tintColor={color} size={20} />,
      }} />
      <Tabs.Screen name="reports" options={{
        title: 'Reports',
        tabBarIcon: ({ color }) => <SymbolView name={{ ios: 'chart.bar', android: 'bar_chart', web: 'bar_chart' }} tintColor={color} size={20} />,
      }} />
    </Tabs>
  );
}
