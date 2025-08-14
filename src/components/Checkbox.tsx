// src/components/Checkbox.tsx
import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/Theme';

type Props = { checked: boolean; onChange: (v: boolean) => void; label?: React.ReactNode; };

export default function Checkbox({ checked, onChange, label }: Props) {
  return (
    <Pressable style={styles.row} onPress={() => onChange(!checked)}>
      <View style={[styles.box, { borderColor: theme.colors.border, backgroundColor: checked ? theme.colors.primary : 'transparent' }]}>
        {checked && <Ionicons name="checkmark" size={16} color="#fff" />}
      </View>
      {typeof label === 'string' ? <Text style={styles.lbl}>{label}</Text> : label}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  box: {
    width: 22, height: 22, borderRadius: 6, borderWidth: 1,
    alignItems: 'center', justifyContent: 'center'
  },
  lbl: { color: theme.colors.text },
});
