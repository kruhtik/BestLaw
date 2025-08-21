// src/screens/VerifyOTPScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, Pressable,
  KeyboardAvoidingView, Platform, ScrollView, Image
} from 'react-native';
import AuthCard from '../components/AuthCard';
import OTPInput from '../components/OTPInput';
import Button from '../components/Button';
import theme from '../theme/Theme';
const LogoImg = require('../../assets/kruthik.png');

export default function VerifyOTPScreen({ navigation }: any) {
  const [emailOtp, setEmailOtp] = useState('');
  const [smsOtp, setSmsOtp] = useState('');
  const [seconds, setSeconds] = useState(120);

  useEffect(() => {
    const id = setInterval(() => setSeconds(s => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(seconds / 60));
  const ss = String(seconds % 60).padStart(2, '0');

  const ready = emailOtp.length === 4 && smsOtp.length === 4;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: theme.colors.bg }}
    >
      <ScrollView
        contentContainerStyle={styles.wrap}
        keyboardShouldPersistTaps="handled"   // <- fixes iOS tap-through issue
      >
        <AuthCard>
          <View style={{ alignItems: 'center', marginBottom: 6 }}>
            <View style={styles.logoCircle}>
              <Image source={LogoImg} style={styles.logo} resizeMode="contain" />
            </View>
            <Text style={[styles.title, { textAlign: 'center' }]}>BestLaw</Text>
            <Text style={[styles.hint, { textAlign: 'center' }]}>Your intelligent legal research companion</Text>
          </View>

          <Text style={[styles.section, { marginTop: 4 }]}>Verification Code</Text>
          <Text style={styles.hint}>We’ve sent codes to your email and mobile.</Text>

          <Text style={styles.section}>Verify Email OTP</Text>
          <OTPInput value={emailOtp} onChange={setEmailOtp} length={4} autoFocus />

          <Pressable onPress={() => setSeconds(120)}>
            <Text style={styles.resend}>Resend Code</Text>
          </Pressable>

          <View style={{ height: 16 }} />

          <Text style={styles.section}>Verify Mobile OTP</Text>
          <OTPInput value={smsOtp} onChange={setSmsOtp} length={4} />

          <Pressable onPress={() => setSeconds(120)}>
            <Text style={styles.resend}>Resend Code</Text>
          </Pressable>

          <Text style={styles.timer}>Otp Expires in: {mm}:{ss}</Text>

          <Button
            title="Proceed"
            onPress={() => navigation.navigate('CompleteSignup')}
            disabled={!ready}
          />
        </AuthCard>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrap: { flexGrow: 1, padding: 20, justifyContent: 'center' },
  logoCircle: { width: 72, height: 72, borderRadius: 36, backgroundColor: theme.colors.text, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  logo: { width: 36, height: 36 },
  title: { color: theme.colors.text, fontSize: 26, fontWeight: '700' },
  hint: { color: theme.colors.muted, marginTop: 4, marginBottom: 10 },
  section: { color: theme.colors.text, marginTop: 8, marginBottom: 8, fontWeight: '600' },
  resend: { color: theme.colors.primary, marginTop: 8 },
  timer: { color: theme.colors.muted, textAlign: 'center', marginTop: 12 },
});
