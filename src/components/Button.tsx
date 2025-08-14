// src/components/Button.tsx
import React from 'react';
import { Pressable, Text, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../theme/Theme';

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'pink' | 'ghost';
  style?: ViewStyle;
};

export default function Button({ title, onPress, loading, disabled, variant = 'primary', style }: Props) {
  const bg =
    variant === 'primary' ? theme.colors.primary :
    variant === 'pink' ? theme.colors.pink : 'transparent';

  const textColor = variant === 'ghost' ? theme.colors.text : '#fff';
  const borderColor = variant === 'ghost' ? theme.colors.border : 'transparent';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.btn,
        { backgroundColor: bg, opacity: disabled || loading ? 0.6 : 1, borderColor },
        style,
      ]}
    >
      {loading ? <ActivityIndicator color={textColor} /> : <Text style={[styles.txt, { color: textColor }]}>{title}</Text>}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  btn: {
    paddingVertical: 14,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    borderWidth: 1,
  },
  txt: { fontSize: 16, fontWeight: '600' },
});
