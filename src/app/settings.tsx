import { router, Stack } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

import AppIcon from '@/components/AppIcon';
import { Colors, ui } from '@/constants/styles';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(false);

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: 'Settings' }} />
      <ScrollView style={ui.container} contentContainerStyle={[ui.content, styles.content]}>
        <Text style={ui.title}>Settings</Text>
        <Text style={ui.subtitle}>Manage your app preferences.</Text>
        <View style={[ui.iconRow, { marginTop: 12, marginBottom: 2 }]}><AppIcon name="settings" size={18} /><Text style={ui.sectionTitle}>Preferences</Text></View>
        <View style={[ui.card, styles.group]}>
          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.value}>Notifications</Text>
              <Text style={styles.description}>Local demo preference</Text>
            </View>
            <Switch
              accessibilityLabel="Notifications"
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: Colors.border, true: Colors.accent }}
              thumbColor={Colors.surface}
              ios_backgroundColor={Colors.border}
            />
          </View>
          <View style={[styles.settingRow, styles.divider]}>
            <Text style={styles.value}>Currency</Text>
            <Text style={styles.description}>EGP - Egyptian Pound</Text>
          </View>
          <View style={[styles.settingRow, styles.divider]}>
            <Text style={styles.value}>Language</Text>
            <Text style={styles.description}>English</Text>
          </View>
        </View>
        <Text style={ui.hint}>Notifications are a demo toggle only. No notifications are sent and this preference is not saved.</Text>
        <View style={[ui.iconRow, { marginTop: 12, marginBottom: 2 }]}><AppIcon name="appearance" size={18} /><Text style={ui.sectionTitle}>Appearance</Text></View>
        <View style={[ui.card, styles.settingRow]}>
          <Text style={styles.value}>Theme</Text>
          <Text style={styles.description}>Light</Text>
        </View>
        <View style={[ui.iconRow, { marginTop: 12, marginBottom: 2 }]}><AppIcon name="info" size={18} /><Text style={ui.sectionTitle}>About</Text></View>
        <Pressable accessibilityRole="button" onPress={() => router.push('/about')} style={({ pressed }) => [ui.card, styles.row, pressed && ui.pressed]}>
          <View style={styles.rowText}>
            <Text style={styles.value}>About SmartExpenseTracker</Text>
            <Text style={styles.description}>App information, features and project details.</Text>
          </View>
          <AppIcon name="forward" size={18} />
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: { gap: 12 },
  group: { paddingVertical: 4 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16 },
  rowText: { flex: 1, paddingVertical: 16 },
  settingRow: { paddingVertical: 16, gap: 6 },
  divider: { borderTopWidth: 1, borderTopColor: Colors.border },
  description: { ...ui.subtitle, fontSize: 14, lineHeight: 21 },
  value: { fontSize: 16, fontWeight: '600', color: Colors.text },
});
