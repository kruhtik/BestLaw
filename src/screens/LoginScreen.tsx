// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AuthCard from '../components/AuthCard';
import TextField from '../components/TextField';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import theme from '../theme/Theme';
// Use require for React Native static image to avoid TS typings issues
const LogoImg = require('../../assets/kruthik.png');

export default function LoginScreen({ navigation }: any) {
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');
  const [keep, setKeep] = useState(false);

  // NEW: only show validation after user taps Sign In
  const [submitted, setSubmitted] = useState(false);

  const onSignIn = async () => {
    setSubmitted(true);
    const ok = id.trim() && pwd.trim();
    if (!ok) return;               // just reveal errors
    // TODO: call your login API, then:
    navigation.replace('Home');
  };

  return (
    <View style={styles.wrap}>
      <AuthCard>
        <View style={styles.header}>
          <Text style={styles.title}> Welcome Back</Text>
          <Image source={LogoImg} style={styles.cardLogo} resizeMode="contain" />
        </View>
        <Text style={styles.subtitle}>Login in to your account</Text>

        <TextField
          placeholder="Email / Mobile Number"
          value={id}
          onChangeText={setId}
          error={submitted && !id ? 'Email/Mobile Number is required' : undefined}
        />

        <TextField
          placeholder="Password"
          value={pwd}
          onChangeText={setPwd}
          rightToggleSecure
          secureTextEntry
          error={submitted && !pwd ? 'Password is required' : undefined}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Checkbox checked={keep} onChange={setKeep} label="Keep me logged in" />
          <Text style={{ color: theme.colors.primary }}>Forgot Password?</Text>
        </View>

        {/* allow pressing even if empty; we handle validation in onSignIn */}
        <Button title="Sign In" onPress={onSignIn} />

        <Text style={styles.helper} onPress={() => navigation.navigate('Signup')}>
          Don’t have an account?
        </Text>
      </AuthCard>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: theme.colors.bg, padding: 20, justifyContent: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  cardLogo: { width: 50, height: 60 },
  title: { color: theme.colors.text, fontSize: 26, fontWeight: '700', marginBottom: 0 },
  subtitle: { color: theme.colors.muted, marginBottom: 8 },
  helper: { marginTop: 10, color: theme.colors.muted, textAlign: 'center' },
});
