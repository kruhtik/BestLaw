// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AuthCard from '../components/AuthCard';
import TextField from '../components/TextField';
import Button from '../components/Button';
import theme from '../theme/Theme';
// Use require for React Native static image to avoid TS typings issues
const LogoImg = require('../../assets/kruthik.png');

export default function LoginScreen({ navigation }: any) {
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');

  // NEW: only show validation after user taps Sign In
  const [submitted, setSubmitted] = useState(false);

  const onSignIn = async () => {
    setSubmitted(true);
    const ok = id.trim() && pwd.trim();
    if (!ok) return;               // just reveal errors
    // TODO: call your login API, then navigate to main app
    try {
      // Derive a display name from the email before '@', splitting on common separators
      const local = (id || '').split('@')[0] || id;
      const base = (local || '').split(/[._-]/)[0] || local || 'User';
      const userName = base ? base.charAt(0).toUpperCase() + base.slice(1) : 'User';
      navigation.navigate('Home', { userName });
    } catch (e) {
      console.warn('Navigation to Home failed:', e);
    }
  };

  return (
    <View style={styles.wrap}>
      <AuthCard>
        <View style={{ alignItems: 'center', marginBottom: 6 }}>
          <View style={styles.logoCircle}>
            <Image source={LogoImg} style={styles.logo} resizeMode="contain" />
          </View>
          <Text style={[styles.title, { textAlign: 'center' }]}>BestLaw</Text>
          <Text style={[styles.subtitle, { textAlign: 'center' }]}>Your intelligent legal research companion</Text>
        </View>

        <Text style={styles.label}>Email</Text>
        <TextField
          placeholder="Enter your email"
          value={id}
          onChangeText={setId}
          error={submitted && !id ? 'Email is required' : undefined}
        />

        <Text style={styles.label}>Password</Text>
        <TextField
          placeholder="Enter your password"
          value={pwd}
          onChangeText={setPwd}
          rightToggleSecure
          secureTextEntry
          error={submitted && !pwd ? 'Password is required' : undefined}
        />

        <Text
          style={[styles.link, { textAlign: 'center' }]}
          onPress={() => { /* TODO: navigate to Forgot Password when implemented */ }}
        >
          Forgot your password?
        </Text>

        {/* allow pressing even if empty; we handle validation in onSignIn */}
        <Button title="Sign In" onPress={onSignIn} />

        <Text style={styles.helper}>
          Don't have an account?{' '}
          <Text style={{ color: theme.colors.primary }} onPress={() => navigation.navigate('Signup')}>
            Sign up
          </Text>
        </Text>
      </AuthCard>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: theme.colors.bg, padding: 20, justifyContent: 'center' },
  logoCircle: { width: 72, height: 72, borderRadius: 36, backgroundColor: theme.colors.text, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  logo: { width: 36, height: 36 },
  title: { color: theme.colors.text, fontSize: 26, fontWeight: '700', marginBottom: 0 },
  subtitle: { color: theme.colors.muted, marginBottom: 8 },
  label: { color: theme.colors.text, fontWeight: '600', marginBottom: 6, marginTop: 6 },
  link: { color: theme.colors.text, textDecorationLine: 'underline', marginVertical: 8 },
  helper: { marginTop: 10, color: theme.colors.muted, textAlign: 'center' },
});
