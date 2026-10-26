import { router, Stack } from 'expo-router';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Colors, transactionFormStyles as styles } from '@/constants/styles';
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
          placeholderTextColor={Colors.secondary}
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
          placeholderTextColor={Colors.secondary}
          value={category}
          onChangeText={setCategory}
        />
        {errors.category ? <Text style={styles.error}>{errors.category}</Text> : null}
        <Text style={styles.label}>Date</Text>
        <TextInput
          accessibilityLabel="Date"
          style={styles.input}
          placeholder="Date"
          placeholderTextColor={Colors.secondary}
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
          placeholderTextColor={Colors.secondary}
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
