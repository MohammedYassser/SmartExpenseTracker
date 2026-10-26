import { StyleSheet, Text, View } from 'react-native';

import type { Transaction } from '@/models/Transaction';

interface TransactionItemProps {
  transaction: Transaction;
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const isIncome = transaction.type === 'income';

  return (
    <View style={styles.card}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  details: { flex: 1, gap: 4 },
  category: { fontSize: 16, fontWeight: '600', color: '#0f172a' },
  note: { fontSize: 14, color: '#475569' },
  date: { fontSize: 13, color: '#64748b' },
  amount: { flexShrink: 1, fontSize: 16, fontWeight: '600' },
  income: { color: '#15803d' },
  expense: { color: '#b91c1c' },
});
