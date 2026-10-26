import Constants from 'expo-constants';
import { router, Stack } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import AppIcon from '@/components/AppIcon';
import { Colors, ui } from '@/constants/styles';

const features = [
  { title: 'Dashboard', description: 'A quick overview of your finances.', icon: 'wallet' },
  { title: 'Transaction management', description: 'Add, edit, search and manage income and expenses.', icon: 'transactions' },
  { title: 'Budget management', description: 'Set spending limits and track category budgets.', icon: 'wallet' },
  { title: 'Financial reports', description: 'Understand your spending and financial activity.', icon: 'transactions' },
  { title: 'Transaction statistics', description: 'Explore overall transaction patterns and insights.', icon: 'info' },
  { title: 'Monthly summaries', description: 'Review income and spending for a selected month.', icon: 'wallet' },
  { title: 'Profile and settings', description: 'View your profile and application preferences.', icon: 'profile' },
] as const;

export default function AboutScreen() {
  const version = Constants.expoConfig?.version;

  function returnToSettings() {
    if (router.canGoBack()) router.back();
    else router.replace('/settings');
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: 'About SmartExpenseTracker' }} />
      <ScrollView style={ui.container} contentContainerStyle={styles.content}>
        <View style={styles.identity}>
          <Image source={require('../../assets/images/icon.png')} accessibilityLabel="SmartExpenseTracker application icon" style={styles.logo} resizeMode="contain" />
          <Text style={styles.name}>SmartExpenseTracker</Text>
          <Text style={styles.description}>A simple and intuitive mobile application for managing personal expenses, tracking income, managing budgets, and understanding financial activity.</Text>
        </View>

        <Text style={ui.sectionTitle}>Main Features</Text>
        <View style={ui.card}>
          {features.map((feature, index) => (
            <View key={feature.title} style={[styles.feature, index > 0 && styles.divider]}>
              <View style={ui.iconBadge}><AppIcon name={feature.icon} size={18} /></View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={ui.sectionTitle}>About the Project</Text>
        <View style={[ui.card, styles.project]}>
          <View style={ui.iconRow}><AppIcon name="info" size={18} /><Text style={styles.featureTitle}>Personal finance, made simple</Text></View>
          <Text style={ui.subtitle}>SmartExpenseTracker is a mobile expense-management application developed as part of a university software development project.</Text>
          <Text style={ui.subtitle}>The project brings everyday financial tracking together in one place, from recording transactions to reviewing budgets and financial reports.</Text>
          {version ? (
            <View style={[styles.version, styles.divider]}>
              <Text style={ui.subtitle}>Application version</Text>
              <Text style={styles.featureTitle}>{version}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerName}>SmartExpenseTracker</Text>
          <Text style={styles.featureDescription}>Made for simpler financial tracking.</Text>
        </View>
        <Pressable accessibilityRole="button" onPress={returnToSettings} style={({ pressed }) => [ui.secondaryButton, pressed && ui.pressed]}>
          <Text style={ui.link}>Back to Settings</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: { ...ui.content, gap: 16 },
  identity: { alignItems: 'center', gap: 14, paddingVertical: 12, marginBottom: 8 },
  logo: { width: 88, height: 88, borderRadius: 20 },
  name: { fontSize: 24, lineHeight: 32, fontWeight: '700', color: Colors.text, textAlign: 'center' },
  description: { ...ui.subtitle, textAlign: 'center', lineHeight: 24 },
  feature: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingVertical: 14 },
  featureText: { flex: 1, gap: 4 },
  featureTitle: { fontSize: 15, lineHeight: 22, fontWeight: '600', color: Colors.text, flexShrink: 1 },
  featureDescription: { ...ui.subtitle, fontSize: 13, lineHeight: 20 },
  divider: { borderTopWidth: 1, borderTopColor: Colors.border },
  project: { gap: 14 },
  version: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, paddingTop: 14 },
  footer: { alignItems: 'center', gap: 6, paddingVertical: 8 },
  footerName: { fontSize: 14, fontWeight: '600', color: Colors.accent },
});
