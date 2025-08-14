
import React, { useState } from 'react';
import { View, Text, Linking, StyleSheet, ScrollView } from 'react-native';
import AuthCard from '../components/AuthCard';
import PhoneField from '../components/PhoneField';
import TextField from '../components/TextField';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import theme from '../theme/Theme';

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
        <Text style={styles.title}>Sign up</Text>
        <Text style={styles.subtitle}>Sign up with Email & Phone Number</Text>

        <PhoneField
          code={code}
          onCodeChange={setCode}
          number={phone}
          onNumberChange={setPhone}
          // 👇 show phone error only after first submit
          error={submitted && !phone ? 'Mobile number is required' : undefined}
        />

        <TextField
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          // 👇 show email error only after first submit
          error={submitted && !email ? 'Email is required' : undefined}
        />

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

        <Text style={styles.helper} onPress={() => navigation.navigate('Login')}>
          Already have an account?
        </Text>
      </AuthCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { flexGrow: 1, backgroundColor: theme.colors.bg, padding: 20, justifyContent: 'center' },
  title: { color: theme.colors.text, fontSize: 28, fontWeight: '700', marginBottom: 6 },
  subtitle: { color: theme.colors.muted, marginBottom: 8 },
  helper: { marginTop: 10, color: theme.colors.muted, textAlign: 'center' },
  err: { color: theme.colors.danger, marginTop: 6, fontSize: 12 },
});

