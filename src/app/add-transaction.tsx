import { router, Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { useAddTransactionViewModel } from '@/features/transactions/viewmodels/useAddTransactionViewModel';

export default function AddTransactionScreen() {
  const {
    type, setType, amount, setAmount, category, setCategory,
    date, setDate, note, setNote, errors, submit,
  } = useAddTransactionViewModel();

  function handleSubmit() {
    if (submit()) {
      if (router.canGoBack()) router.back();
      else router.replace('/transactions');
    }
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: 'Add Transaction' }} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets>
        <Text style={styles.label}>Transaction Type</Text>
        <View style={styles.typeRow}>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: type === 'expense' }}
            onPress={() => setType('expense')}
            style={[styles.typeButton, type === 'expense' && styles.selectedType]}>
            <Text style={[styles.typeText, type === 'expense' && styles.selectedTypeText]}>Expense</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: type === 'income' }}
            onPress={() => setType('income')}
            style={[styles.typeButton, type === 'income' && styles.selectedType]}>
            <Text style={[styles.typeText, type === 'income' && styles.selectedTypeText]}>Income</Text>
          </Pressable>
        </View>

        <Text style={styles.label}>Amount</Text>
        <TextInput
          accessibilityLabel="Amount"
          style={styles.input}
          placeholder="Amount"
          placeholderTextColor="#64748b"
          keyboardType="decimal-pad"
          value={amount}
          onChangeText={setAmount}
        />
        {errors.amount ? <Text style={styles.error}>{errors.amount}</Text> : null}

        <Text style={styles.label}>Category</Text>
        <TextInput
          accessibilityLabel="Category"
          style={styles.input}
          placeholder="Category"
          placeholderTextColor="#64748b"
          value={category}
          onChangeText={setCategory}
        />
        {errors.category ? <Text style={styles.error}>{errors.category}</Text> : null}

        <Text style={styles.label}>Date</Text>
        <TextInput
          accessibilityLabel="Date"
          style={styles.input}
          placeholder="Date"
          placeholderTextColor="#64748b"
          value={date}
          onChangeText={setDate}
        />
        <Text style={styles.hint}>For example: 2026-10-26</Text>
        {errors.date ? <Text style={styles.error}>{errors.date}</Text> : null}

        <Text style={styles.label}>Note (optional)</Text>
        <TextInput
          accessibilityLabel="Note"
          style={[styles.input, styles.noteInput]}
          placeholder="Note"
          placeholderTextColor="#64748b"
          value={note}
          onChangeText={setNote}
          multiline
          textAlignVertical="top"
        />
        <Pressable
          accessibilityRole="button"
          onPress={handleSubmit}
          style={({ pressed }) => [styles.submitButton, pressed && styles.pressed]}>
          <Text style={styles.submitText}>Add Transaction</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  content: { padding: 20, paddingBottom: 40 },
  label: { fontSize: 16, fontWeight: '600', color: '#0f172a', marginTop: 16, marginBottom: 8 },
  typeRow: { flexDirection: 'row', gap: 12 },
  typeButton: {
    flex: 1, minHeight: 48, padding: 12, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 10, backgroundColor: '#ffffff',
  },
  selectedType: { backgroundColor: '#1d4ed8', borderColor: '#1d4ed8' },
  typeText: { fontSize: 16, fontWeight: '600', color: '#475569' },
  selectedTypeText: { color: '#ffffff' },
  input: {
    minHeight: 48, paddingHorizontal: 14, paddingVertical: 12, borderWidth: 1,
    borderColor: '#cbd5e1', borderRadius: 10, backgroundColor: '#ffffff', color: '#0f172a', fontSize: 16,
  },
  noteInput: { minHeight: 96 },
  error: { marginTop: 6, color: '#b91c1c', fontSize: 14 },
  hint: { marginTop: 6, marginBottom: 8, color: '#64748b', fontSize: 13 },
  submitButton: {
    minHeight: 48, marginTop: 24, padding: 14, alignItems: 'center',
    justifyContent: 'center', borderRadius: 10, backgroundColor: '#1d4ed8',
  },
  pressed: { opacity: 0.8 },
  submitText: { fontSize: 16, fontWeight: '600', color: '#ffffff' },
});
