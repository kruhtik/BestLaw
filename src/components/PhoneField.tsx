// src/components/PhoneField.tsx
import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import CountryCodePicker from './CountryCodePicker';
import theme from '../theme/Theme';

export default function PhoneField({
  code, onCodeChange, number, onNumberChange, error,
}: {
  code: string; onCodeChange: (v: string) => void;
  number: string; onNumberChange: (v: string) => void;
  error?: string;
}) {
  return (
    <View style={{ width: '100%' }}>
      <View style={styles.row}>
        <CountryCodePicker value={code} onChange={onCodeChange} />
        <TextInput
          value={number}
          onChangeText={onNumberChange}
          placeholder="Mobile Number"
          placeholderTextColor={theme.colors.inputPlaceholder}
          keyboardType="phone-pad"
          style={[
            styles.input,
            { borderColor: error ? theme.colors.danger : theme.colors.border }
          ]}
          maxLength={15}
        />
      </View>
      {!!error && <Text style={styles.err}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  input: {
    flex: 1,
    backgroundColor: theme.colors.inputBg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: theme.colors.text,
  },
  err: { color: theme.colors.danger, marginTop: 6, fontSize: 12 },
});
