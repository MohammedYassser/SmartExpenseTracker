import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, ui } from '@/constants/styles';
import type { Transaction } from '@/models/Transaction';

interface TransactionItemProps {
  transaction: Transaction;
  onPress: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function TransactionItem({ transaction, onPress, onEdit, onDelete }: TransactionItemProps) {
  const isIncome = transaction.type === 'income';
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  return (
    <View style={styles.card}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`View transaction: ${transaction.category}, ${transaction.date}`}
        accessibilityHint="Opens transaction details"
        onPress={onPress}
        style={({ pressed }) => [styles.row, pressed && { opacity: 0.8 }]}>
        <View style={styles.details}>
          <Text style={styles.category}>{transaction.category}</Text>
          {transaction.note ? <Text style={styles.note}>{transaction.note}</Text> : null}
          <Text style={styles.date}>{transaction.date}</Text>
        </View>
        <Text style={[styles.amount, isIncome ? styles.income : styles.expense]}>
          {isIncome ? '+ ' : '- '}
          {transaction.amount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
      </Pressable>
      {confirmingDelete && onDelete ? (
        <View>
          <Text style={styles.note}>Delete this transaction? This cannot be undone.</Text>
          <View style={styles.row}>
            <Pressable accessibilityRole="button" onPress={() => setConfirmingDelete(false)} style={styles.action}>
              <Text style={styles.editText}>Cancel</Text>
            </Pressable>
            <Pressable accessibilityRole="button" onPress={onDelete} style={styles.action}>
              <Text style={styles.expense}>Confirm Delete</Text>
            </Pressable>
          </View>
        </View>
      ) : onEdit || onDelete ? (
        <View style={styles.row}>
          {onEdit ? (
            <Pressable accessibilityRole="button" onPress={onEdit} style={styles.action}>
              <Text style={styles.editText}>Edit</Text>
            </Pressable>
          ) : null}
          {onDelete ? (
            <Pressable accessibilityRole="button" onPress={() => setConfirmingDelete(true)} style={styles.action}>
              <Text style={styles.expense}>Delete</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  ...ui,
  card: { ...ui.card, padding: 16, gap: 12, marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  action: { minHeight: 44, paddingHorizontal: 12, justifyContent: 'center', borderRadius: 6, backgroundColor: Colors.background },
  editText: ui.link,
  details: { flex: 1, gap: 5 },
  category: { fontSize: 16, fontWeight: '600', color: Colors.text },
  note: { fontSize: 14, lineHeight: 21, color: Colors.secondary },
  date: { fontSize: 12, color: Colors.secondary },
  amount: { flexShrink: 1, fontSize: 16, fontWeight: '600', color: Colors.text },
});
