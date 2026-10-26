import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, ui } from '@/constants/styles';
import type { Budget } from '@/models/Budget';

interface BudgetCardProps {
  budget: Budget;
  spent: number;
  onPress?: () => void;
}

export default function BudgetCard({ budget, spent, onPress }: BudgetCardProps) {
  const remaining = budget.amount - spent;
  const progress = Math.min(100, Math.max(0, spent / budget.amount * 100));
  const format = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
  const content = (
    <>
      <Text style={ui.sectionTitle}>{budget.category}</Text>
      <Text style={styles.budgetAmount}>Budget: {budget.amount.toLocaleString('en-US', format)}</Text>
      <Text style={ui.subtitle}>Spent: {spent.toLocaleString('en-US', format)}</Text>
      <Text style={[ui.subtitle, remaining < 0 && ui.expense]}>Remaining: {remaining.toLocaleString('en-US', format)}</Text>
      <View
        accessibilityRole="progressbar"
        accessibilityLabel={`${budget.category} budget used`}
        accessibilityValue={{ min: 0, max: 100, now: progress }}
        style={styles.track}>
        <View style={[styles.fill, { width: `${progress}%` }, remaining < 0 && styles.exceededFill]} />
      </View>
      <Text style={ui.hint}>{Math.round(progress)}% used</Text>
      {remaining < 0 ? <Text style={ui.error}>Budget exceeded</Text> : null}
    </>
  );

  return onPress ? (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [ui.card, styles.card, pressed && ui.pressed]}>
      {content}
    </Pressable>
  ) : <View style={[ui.card, styles.card]}>{content}</View>;
}

const styles = StyleSheet.create({
  card: { marginBottom: 16, gap: 6 },
  budgetAmount: { fontSize: 17, fontWeight: '600', color: Colors.text },
  track: { height: 8, borderRadius: 4, backgroundColor: Colors.accentLight, overflow: 'hidden', marginTop: 8 },
  fill: { height: '100%', backgroundColor: Colors.accent },
  exceededFill: { backgroundColor: Colors.expense },
});
