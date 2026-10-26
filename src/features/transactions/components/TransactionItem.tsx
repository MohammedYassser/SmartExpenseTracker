import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

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
  card: {
    gap: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  action: { minHeight: 44, paddingHorizontal: 12, justifyContent: 'center' },
  editText: { color: '#1d4ed8', fontSize: 14, fontWeight: '600' },
  details: { flex: 1, gap: 4 },
  category: { fontSize: 16, fontWeight: '600', color: '#0f172a' },
  note: { fontSize: 14, color: '#475569' },
  date: { fontSize: 13, color: '#64748b' },
  amount: { flexShrink: 1, fontSize: 16, fontWeight: '600' },
  income: { color: '#15803d' },
  expense: { color: '#b91c1c' },
});
