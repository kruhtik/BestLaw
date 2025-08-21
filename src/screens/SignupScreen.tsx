
import React, { useState } from 'react';
import { View, Text, Linking, StyleSheet, ScrollView, Image } from 'react-native';
import AuthCard from '../components/AuthCard';
import PhoneField from '../components/PhoneField';
import TextField from '../components/TextField';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import theme from '../theme/Theme';
// Use same logo as Login
const LogoImg = require('../../assets/logo.png');

export default function SignupScreen({ navigation }: any) {
  const [code, setCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [agree, setAgree] = useState(false);

  // 👇 new flag
  const [submitted, setSubmitted] = useState(false);

  const onSignUp = () => {
    setSubmitted(true); // turn on validation visuals
    const valid = email.trim() && pwd.trim() && phone.trim() && agree;
    if (!valid) return;          // just show errors; don't proceed
    navigation.navigate('Verify'); // proceed if all good
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.bg }}
      contentContainerStyle={styles.wrap}
      keyboardShouldPersistTaps="handled"
    >
      <AuthCard>
        <View style={{ alignItems: 'center', marginBottom: 6 }}>
          <View style={styles.logoCircle}>
            <Image source={LogoImg} style={styles.logo} resizeMode="contain" />
          </View>
          <Text style={[styles.title, { textAlign: 'center' }]}>BestLaw</Text>
          <Text style={[styles.subtitle, { textAlign: 'center' }]}>Your intelligent legal research companion</Text>
        </View>

        <Text style={styles.label}>Mobile number</Text>
        <PhoneField
          code={code}
          onCodeChange={setCode}
          number={phone}
          onNumberChange={setPhone}
          // 👇 show phone error only after first submit
          error={submitted && !phone ? 'Mobile number is required' : undefined}
        />

        <Text style={styles.label}>Email</Text>
        <TextField
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          // 👇 show email error only after first submit
          error={submitted && !email ? 'Email is required' : undefined}
        />

        <Text style={styles.label}>Password</Text>
        <TextField
          placeholder="Password"
          value={pwd}
          onChangeText={setPwd}
          rightToggleSecure
          secureTextEntry
          // 👇 show password error only after first submit
          error={submitted && !pwd ? 'Password is required' : undefined}
        />

        <Checkbox
          checked={agree}
          onChange={setAgree}
          label={
            <Text style={{ color: theme.colors.text }}>
              Agree with{' '}
              <Text
                style={{ textDecorationLine: 'underline', color: theme.colors.text }}
                onPress={() => Linking.openURL('https://example.com/terms')}
              >
                Terms &amp; Condition.
              </Text>
            </Text>
          }
        />
        {submitted && !agree && (
          <Text style={styles.err}>Please accept the Terms &amp; Conditions</Text>
        )}

        {/* 🔓 allow tapping even when empty; we handle validation in onSignUp */}
        <Button title="Sign Up" onPress={onSignUp} style={{ marginTop: 4 }} />

        <Text style={styles.helper}>
          Already have an account?{' '}
          <Text style={{ color: theme.colors.primary }} onPress={() => navigation.navigate('Login')}>
            Sign in
          </Text>
        </Text>
      </AuthCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { flexGrow: 1, backgroundColor: theme.colors.bg, padding: 20, justifyContent: 'center' },
  logoCircle: { width: 72, height: 72, borderRadius: 36, backgroundColor: theme.colors.card, alignItems: 'center', justifyContent: 'center', marginBottom: 8, borderWidth: 1, borderColor: theme.colors.border },
  logo: { width: 68, height: 68 },
  title: { color: theme.colors.text, fontSize: 28, fontWeight: '700', marginBottom: 6 },
  subtitle: { color: theme.colors.muted, marginBottom: 8 },
  label: { color: theme.colors.text, fontWeight: '600', marginBottom: 6, marginTop: 6 },
  helper: { marginTop: 10, color: theme.colors.muted, textAlign: 'center' },
  err: { color: theme.colors.danger, marginTop: 6, fontSize: 12 },
});

