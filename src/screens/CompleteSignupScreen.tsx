// src/screens/CompleteSignupScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, FlatList, Image } from 'react-native';
import AuthCard from '../components/AuthCard';
import TextField from '../components/TextField';
import Button from '../components/Button';
import theme from '../theme/Theme';
// Use same logo as Login/Signup
const LogoImg = require('../../assets/logo.png');

const STATES = [
  'Andhra Pradesh','Bihar','Delhi','Karnataka','Kerala','Maharashtra','Rajasthan',
  'Tamil Nadu','Telangana','Uttar Pradesh','West Bengal'
];

export default function CompleteSignupScreen({ navigation }: any) {
  const [first, setFirst] = useState('');
  const [last, setLast]   = useState('');
  const [firm, setFirm]   = useState('');
  const [state, setState] = useState<string | null>(null);
  const [open, setOpen]   = useState(false);

  // NEW: show validation only after pressing the button
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = () => {
    setSubmitted(true);
    const ok = first.trim() && last.trim() && firm.trim() && state;
    if (!ok) return; // just reveal errors
    navigation.replace('Login');
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

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View style={{ flex: 1 }}>
            <TextField
              placeholder="First Name"
              value={first}
              onChangeText={setFirst}
              error={submitted && !first ? 'First Name is required' : undefined}
            />
          </View>
          <View style={{ flex: 1 }}>
            <TextField
              placeholder="Last Name"
              value={last}
              onChangeText={setLast}
              error={submitted && !last ? 'Last Name is required' : undefined}
            />
          </View>
        </View>

        <TextField
          placeholder="Firm Name"
          value={firm}
          onChangeText={setFirm}
          // ✅ only show red border + helper after first submit
          error={submitted && !firm ? 'Firm Name is required' : undefined}
        />

        {/* State select with conditional red border + helper */}
        <Pressable
          onPress={() => setOpen(true)}
          style={[
            styles.select,
            submitted && !state ? { borderColor: theme.colors.danger } : null,
          ]}
        >
          <Text style={{ color: state ? theme.colors.text : theme.colors.inputPlaceholder }}>
            {state ?? 'States'}
          </Text>
        </Pressable>
        {submitted && !state && (
          <Text style={styles.err}>State is required</Text>
        )}

        <Modal visible={open} transparent animationType="fade">
          <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
            <View style={styles.sheet}>
              <FlatList
                data={STATES}
                keyExtractor={(i) => i}
                renderItem={({ item }) => (
                  <Pressable
                    style={styles.item}
                    onPress={() => { setState(item); setOpen(false); }}
                  >
                    <Text style={{ color: theme.colors.text }}>{item}</Text>
                  </Pressable>
                )}
              />
            </View>
          </Pressable>
        </Modal>

        {/* Let the press happen; we handle validation with `submitted` */}
        <Button
          title="Complete Sign Up"
          variant="primary"
          onPress={onSubmit}
          style={{ backgroundColor: '#6C4CEB', borderColor: 'transparent' }}
        />

        <Text style={styles.helper} onPress={() => navigation.navigate('Login')}>
          Already have an account?
        </Text>
      </AuthCard>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: theme.colors.bg, padding: 20, justifyContent: 'center' },
  logoCircle: { width: 72, height: 72, borderRadius: 36, backgroundColor: theme.colors.card, alignItems: 'center', justifyContent: 'center', marginBottom: 8, borderWidth: 1, borderColor: theme.colors.border },
  logo: { width: 68, height: 68 },
  title: { color: theme.colors.text, fontSize: 26, fontWeight: '700' },
  subtitle: { color: theme.colors.muted, marginTop: 4, marginBottom: 8 },
  select: {
    backgroundColor: theme.colors.inputBg,
    borderWidth: 1,
    borderColor: theme.colors.border, // 🤝 default border like other inputs
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  err: { color: theme.colors.danger, marginTop: 6, fontSize: 12 },
  helper: { marginTop: 10, color: theme.colors.muted, textAlign: 'center' },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 24 },
  sheet: { backgroundColor: theme.colors.card, borderRadius: 16, padding: 8, maxHeight: '70%' },
  item: { padding: 14, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
});
