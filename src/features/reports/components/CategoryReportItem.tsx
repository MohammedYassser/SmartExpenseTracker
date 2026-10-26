import { StyleSheet, Text, View } from 'react-native';

import { Colors, ui } from '@/constants/styles';
import type { CategoryReport } from '@/features/reports/viewmodels/useReportsViewModel';

export default function CategoryReportItem({ report }: { report: CategoryReport }) {
  return (
    <View style={[ui.card, styles.card]}>
      <Text style={ui.sectionTitle}>{report.category}</Text>
      <Text style={styles.amount}>
        {report.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </Text>
      <Text style={ui.subtitle}>{report.percentage.toFixed(1)}% of total expenses</Text>
      <View
        accessibilityRole="progressbar"
        accessibilityLabel={`${report.category} share of expenses`}
        accessibilityValue={{ min: 0, max: 100, now: report.percentage }}
        style={styles.track}>
        <View style={[styles.fill, { width: `${report.percentage}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { gap: 8, marginBottom: 16 },
  amount: { fontSize: 20, fontWeight: '600', color: Colors.text },
  track: { height: 8, marginTop: 4, borderRadius: 4, overflow: 'hidden', backgroundColor: Colors.accentLight },
  fill: { height: '100%', backgroundColor: Colors.accent },
});
