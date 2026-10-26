import { router, Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import AppIcon from '@/components/AppIcon';
import { Colors, ui } from '@/constants/styles';

export default function ProfileScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: 'Profile' }} />
      <ScrollView style={ui.container} contentContainerStyle={[ui.content, styles.content]}>
        <Text style={ui.title}>Profile</Text>
        <View style={ui.card}>
          <View style={ui.iconRow}><AppIcon name="profile" size={24} /><Text style={ui.sectionTitle}>John Doe</Text></View>
          <Text style={[ui.subtitle, styles.email]}>john@example.com</Text>
          <Text style={ui.subtitle}>Smart Expense Tracker user</Text>
          <Text style={ui.hint}>Demo profile information.</Text>
        </View>
        <Text style={ui.sectionTitle}>Account</Text>
        <View style={ui.card}>
          <Text style={ui.sectionTitle}>Personal Information</Text>
          <Text style={[ui.subtitle, styles.description]}>The name and email above are demonstration values.</Text>
          <Text style={[ui.sectionTitle, styles.preferences]}>Account Preferences</Text>
          <Text style={[ui.subtitle, styles.description]}>View application preferences in Settings.</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/settings')}
          style={({ pressed }) => [ui.button, ui.iconRow, pressed && ui.pressed]}>
          <AppIcon name="settings" color={Colors.surface} /><Text style={ui.buttonText}>Settings</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.replace('/login')}
          style={({ pressed }) => [ui.secondaryButton, ui.iconRow, pressed && ui.pressed]}>
          <AppIcon name="logout" color={Colors.expense} /><Text style={[ui.link, ui.expense]}>Log Out</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: { gap: 20 },
  email: { marginTop: 8, marginBottom: 4 },
  description: { marginTop: 8 },
  preferences: { marginTop: 24 },
});
