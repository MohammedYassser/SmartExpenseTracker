import { Text, View } from 'react-native';

import { ui } from '@/constants/styles';

export default function BudgetScreen() {
  return (
    <View style={[ui.container, ui.content]}>
      <Text style={ui.title}>Budget</Text>
      <Text style={[ui.subtitle, { marginTop: 8, marginBottom: 24 }]}>A little planning goes a long way.</Text>
      <View style={ui.card}>
        <Text style={ui.sectionTitle}>Coming soon</Text>
        <Text style={[ui.subtitle, { marginTop: 8 }]}>This section is not available yet.</Text>
      </View>
    </View>
  );
}
