import { StyleSheet, Text, View } from 'react-native';

export default function BudgetScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budget</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000000',
  },
});
