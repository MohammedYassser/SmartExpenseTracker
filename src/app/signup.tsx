import { router, Stack } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import AppIcon from '@/components/AppIcon';
import { Colors, ui } from '@/constants/styles';

interface SignUpErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<SignUpErrors>({});

  function openLogin() {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors({});
    router.replace('/login');
  }

  function signUp() {
    const nextErrors: SignUpErrors = {};
    if (!name.trim()) nextErrors.name = 'Name is required.';
    if (!email.trim()) nextErrors.email = 'Email is required.';
    if (!password.trim()) nextErrors.password = 'Password is required.';
    if (!confirmPassword.trim()) nextErrors.confirmPassword = 'Please confirm your password.';
    else if (password !== confirmPassword) nextErrors.confirmPassword = 'Passwords must match.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    openLogin();
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: 'Sign Up' }} />
      <ScrollView style={ui.container} contentContainerStyle={ui.authContent} keyboardShouldPersistTaps="handled" automaticallyAdjustKeyboardInsets>
        <View style={[ui.iconRow, { marginBottom: 24 }]}>
          <AppIcon name="wallet" size={22} />
          <Text style={[ui.brand, { marginBottom: 0 }]}>Smart Expense Tracker</Text>
        </View>
        <Text style={ui.authTitle}>Start with a clear picture</Text>
        <Text style={ui.subtitle}>Keep everyday spending in one place.</Text>
        <Text style={ui.label}>Name</Text>
        <TextInput accessibilityLabel="Name" style={ui.input} placeholder="Your name" placeholderTextColor={Colors.secondary}
          value={name} onChangeText={setName} autoCapitalize="words" />
        {errors.name ? <Text style={ui.error}>{errors.name}</Text> : null}
        <Text style={ui.label}>Email</Text>
        <TextInput accessibilityLabel="Email" style={ui.input} placeholder="you@example.com" placeholderTextColor={Colors.secondary}
          value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} />
        {errors.email ? <Text style={ui.error}>{errors.email}</Text> : null}
        <Text style={ui.label}>Password</Text>
        <TextInput accessibilityLabel="Password" style={ui.input} placeholder="Enter a password" placeholderTextColor={Colors.secondary}
          value={password} onChangeText={setPassword} secureTextEntry autoCapitalize="none" autoCorrect={false} />
        {errors.password ? <Text style={ui.error}>{errors.password}</Text> : null}
        <Text style={ui.label}>Confirm Password</Text>
        <TextInput accessibilityLabel="Confirm Password" style={ui.input} placeholder="Re-enter your password" placeholderTextColor={Colors.secondary}
          value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry autoCapitalize="none" autoCorrect={false} />
        {errors.confirmPassword ? <Text style={ui.error}>{errors.confirmPassword}</Text> : null}
        <Pressable accessibilityRole="button" onPress={signUp} style={({ pressed }) => [ui.button, ui.authButton, pressed && ui.pressed]}>
          <Text style={ui.buttonText}>Sign Up</Text>
        </Pressable>
        <View style={ui.authFooter}>
          <Pressable accessibilityRole="button" onPress={openLogin} style={ui.linkButton}>
            <Text style={ui.link}>Already have an account? Login</Text>
          </Pressable>
        </View>
        <Text style={ui.demoNote}>Preview only. No account is created and your details are not saved.</Text>
      </ScrollView>
    </>
  );
}
