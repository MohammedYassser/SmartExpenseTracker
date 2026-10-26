import { SymbolView } from 'expo-symbols';

import { Colors } from '@/constants/styles';

const icons = {
  profile: { ios: 'person.crop.circle', android: 'account_circle', web: 'account_circle' },
  add: { ios: 'plus', android: 'add', web: 'add' },
  forward: { ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' },
  transactions: { ios: 'list.bullet', android: 'receipt_long', web: 'receipt_long' },
  wallet: { ios: 'wallet.pass', android: 'account_balance_wallet', web: 'account_balance_wallet' },
  income: { ios: 'arrow.down.left', android: 'south_west', web: 'south_west' },
  expense: { ios: 'arrow.up.right', android: 'north_east', web: 'north_east' },
  settings: { ios: 'gearshape', android: 'settings', web: 'settings' },
  logout: { ios: 'rectangle.portrait.and.arrow.right', android: 'logout', web: 'logout' },
  appearance: { ios: 'sun.max', android: 'light_mode', web: 'light_mode' },
  info: { ios: 'info.circle', android: 'info', web: 'info' },
  help: { ios: 'questionmark.circle', android: 'help_outline', web: 'help_outline' },
} as const;

export default function AppIcon({ name, color = Colors.accent, size = 20 }: {
  name: keyof typeof icons;
  color?: string;
  size?: number;
}) {
  return <SymbolView name={icons[name]} tintColor={color} size={size} accessible={false} />;
}
