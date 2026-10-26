import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors, ui } from '@/constants/styles';
import { budgetCategories, useBudgetFormViewModel } from '@/features/budget/viewmodels/useBudgetFormViewModel';
import type { Budget } from '@/models/Budget';

interface BudgetFormProps {
  budget?: Budget;
  onSaved: () => void;
  onCancel?: () => void;
}

export default function BudgetForm({ budget, onSaved, onCancel }: BudgetFormProps) {
  const { category, setCategory, customCategory, setCustomCategory, amount, setAmount, errors, submit } = useBudgetFormViewModel(budget);

  function save() {
    if (submit()) onSaved();
  }

  return (
    <View>
      <Text style={ui.label}>Category</Text>
      <View style={styles.options}>
        {[...budgetCategories, 'Other'].map((option) => (
          <Pressable
            key={option}
            accessibilityRole="button"
            accessibilityState={{ selected: category === option }}
            onPress={() => setCategory(option)}
            style={[styles.option, category === option && styles.selected]}>
            <Text style={[ui.subtitle, category === option && ui.link]}>{option}</Text>
          </Pressable>
        ))}
      </View>
      {category === 'Other' ? (
        <>
          <Text style={ui.label}>Custom Category</Text>
          <TextInput
            accessibilityLabel="Custom Category"
            style={ui.input}
            placeholder="e.g. Pet Care"
            placeholderTextColor={Colors.secondary}
            value={customCategory}
            onChangeText={setCustomCategory}
          />
        </>
      ) : null}
      {errors.category ? <Text style={ui.error}>{errors.category}</Text> : null}
      <Text style={ui.label}>Budget Amount</Text>
      <TextInput
        accessibilityLabel="Budget Amount"
        style={ui.input}
        placeholder="Budget amount"
        placeholderTextColor={Colors.secondary}
        keyboardType="decimal-pad"
        value={amount}
        onChangeText={setAmount}
      />
      {errors.amount ? <Text style={ui.error}>{errors.amount}</Text> : null}
      <Pressable accessibilityRole="button" onPress={save} style={({ pressed }) => [ui.button, styles.save, pressed && ui.pressed]}>
        <Text style={ui.buttonText}>Save Budget</Text>
      </Pressable>
      {onCancel ? (
        <Pressable accessibilityRole="button" onPress={onCancel} style={ui.linkButton}>
          <Text style={ui.link}>Cancel</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  option: { minHeight: 46, paddingHorizontal: 14, justifyContent: 'center', borderWidth: 1, borderColor: Colors.border, borderRadius: 8, backgroundColor: Colors.surface },
  selected: { borderColor: Colors.accent, backgroundColor: Colors.accentLight },
  save: { marginTop: 28 },
});
