import { router, Stack } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { Colors, ui } from '@/constants/styles';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  function login() {
    const nextErrors: { email?: string; password?: string } = {};
    if (!email.trim()) nextErrors.email = 'Email is required.';
    if (!password.trim()) nextErrors.password = 'Password is required.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setEmail('');
    setPassword('');
    router.replace('/');
  }

  function openSignUp() {
    setEmail('');
    setPassword('');
    setErrors({});
    router.replace('/signup');
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: 'Login' }} />
      <ScrollView style={ui.container} contentContainerStyle={ui.authContent} keyboardShouldPersistTaps="handled" automaticallyAdjustKeyboardInsets>
        <Text style={ui.brand}>Smart Expense Tracker</Text>
        <Text style={ui.authTitle}>Welcome back</Text>
        <Text style={ui.subtitle}>A little clarity for your everyday spending.</Text>
        <Text style={ui.label}>Email</Text>
        <TextInput accessibilityLabel="Email" style={ui.input} placeholder="you@example.com" placeholderTextColor={Colors.secondary}
          value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} />
        {errors.email ? <Text style={ui.error}>{errors.email}</Text> : null}
        <Text style={ui.label}>Password</Text>
        <TextInput accessibilityLabel="Password" style={ui.input} placeholder="Enter your password" placeholderTextColor={Colors.secondary}
          value={password} onChangeText={setPassword} secureTextEntry autoCapitalize="none" autoCorrect={false} />
        {errors.password ? <Text style={ui.error}>{errors.password}</Text> : null}
        <Pressable accessibilityRole="button" onPress={login} style={({ pressed }) => [ui.button, ui.authButton, pressed && ui.pressed]}>
          <Text style={ui.buttonText}>Login</Text>
        </Pressable>
        <View style={ui.authFooter}>
          <Pressable accessibilityRole="button" onPress={openSignUp} style={ui.linkButton}>
            <Text style={ui.link}>New here? Sign Up</Text>
          </Pressable>
        </View>
        <Text style={ui.demoNote}>Preview only. Enter any email and password to explore. Your details are not saved.</Text>
      </ScrollView>
    </>
  );
}
