// src/components/TextField.tsx
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/Theme';

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (v: string) => void;
  error?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  secureTextEntry?: boolean;
  rightToggleSecure?: boolean; // eye icon
};

export default function TextField(props: Props) {
  const [secure, setSecure] = useState(!!props.secureTextEntry);

  return (
    <View style={styles.wrap}>
      <View style={[
        styles.inputHolder,
        { borderColor: props.error ? theme.colors.danger : theme.colors.border }
      ]}>
        <TextInput
          placeholder={props.placeholder}
          placeholderTextColor={theme.colors.inputPlaceholder}
          value={props.value}
          onChangeText={props.onChangeText}
          style={styles.input}
          keyboardType={props.keyboardType}
          secureTextEntry={props.rightToggleSecure ? secure : props.secureTextEntry}
          autoCapitalize="none"
        />
        {props.rightToggleSecure && (
          <Pressable onPress={() => setSecure(s => !s)}>
            <Ionicons name={secure ? 'eye-off' : 'eye'} size={20} color={theme.colors.muted} />
          </Pressable>
        )}
      </View>
      {!!props.error && <Text style={styles.err}>{props.error}</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: { width: '100%' },
  inputHolder: {
    backgroundColor: theme.colors.inputBg,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: theme.radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    color: theme.colors.text,
    flex: 1,
    fontSize: 15,
  },
  err: { color: theme.colors.danger, marginTop: 6, fontSize: 12 },
});
