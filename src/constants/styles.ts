import { StyleSheet } from 'react-native';

export const Colors = {
  background: '#F5F8FC',
  surface: '#FFFFFF',
  text: '#1D2C43',
  secondary: '#64758B',
  border: '#DCE5F0',
  accent: '#356BA8',
  accentLight: '#E6F0FC',
  income: '#32714B',
  expense: '#AF4340',
};

export const ui = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 24, paddingBottom: 40 },
  title: { fontSize: 26, lineHeight: 34, fontWeight: '700', color: Colors.text },
  subtitle: { fontSize: 15, lineHeight: 23, color: Colors.secondary },
  sectionTitle: { fontSize: 19, lineHeight: 26, fontWeight: '600', color: Colors.text },
  card: { padding: 20, borderWidth: 1, borderColor: Colors.border, borderRadius: 10, backgroundColor: Colors.surface },
  label: { fontSize: 14, fontWeight: '600', color: Colors.text, marginTop: 20, marginBottom: 8 },
  input: {
    minHeight: 50, paddingHorizontal: 14, paddingVertical: 13, borderWidth: 1,
    borderColor: Colors.border, borderRadius: 8, backgroundColor: Colors.surface, color: Colors.text, fontSize: 16,
  },
  button: {
    minHeight: 50, padding: 14, alignItems: 'center', justifyContent: 'center',
    borderRadius: 8, backgroundColor: Colors.accent,
  },
  buttonText: { fontSize: 16, fontWeight: '600', color: Colors.surface },
  pressed: { opacity: 0.75 },
  link: { color: Colors.accent, fontSize: 15, fontWeight: '600' },
  linkButton: { minHeight: 44, justifyContent: 'center', alignItems: 'center' },
  error: { marginTop: 6, color: Colors.expense, fontSize: 14, lineHeight: 20 },
  hint: { marginTop: 6, marginBottom: 8, color: Colors.secondary, fontSize: 13, lineHeight: 20 },
  emptyText: { paddingVertical: 32, textAlign: 'center', color: Colors.secondary, fontSize: 15, lineHeight: 23 },
  income: { color: Colors.income },
  expense: { color: Colors.expense },
  authContent: { flexGrow: 1, padding: 24, paddingTop: 48, paddingBottom: 40, justifyContent: 'center' },
  brand: { fontSize: 16, fontWeight: '700', color: Colors.accent, marginBottom: 32 },
  authTitle: { fontSize: 30, lineHeight: 38, fontWeight: '700', color: Colors.text, marginBottom: 8 },
  authButton: { marginTop: 28 },
  authFooter: { marginTop: 16 },
  demoNote: { marginTop: 24, textAlign: 'center', fontSize: 12, lineHeight: 19, color: Colors.secondary },
});

export const transactionFormStyles = StyleSheet.create({
  ...ui,
  typeRow: { flexDirection: 'row', gap: 12 },
  typeButton: {
    flex: 1, minHeight: 48, padding: 12, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: Colors.border, borderRadius: 8, backgroundColor: Colors.surface,
  },
  selectedType: { backgroundColor: Colors.accentLight, borderColor: Colors.accent },
  typeText: { fontSize: 15, fontWeight: '600', color: Colors.secondary },
  selectedTypeText: { color: Colors.accent },
  noteInput: { minHeight: 100 },
  submitButton: { ...ui.button, marginTop: 28 },
  submitText: ui.buttonText,
});
