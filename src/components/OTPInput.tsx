import React, { useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import theme from '../theme/Theme';

export default function OTPInput({
  value,
  onChange,
  length = 4,
  autoFocus = false,
}: {
  value: string;
  onChange: (v: string) => void;
  length?: number;
  autoFocus?: boolean;
}) {
  // Correct typing for the ref array
  const refs = useRef<Array<TextInput | null>>([]);

  const handle = (t: string, idx: number) => {
    const digit = t.replace(/[^0-9]/g, '').slice(-1);
    const arr = value.split('');
    arr[idx] = digit;
    const joined = arr.join('').slice(0, length);
    onChange(joined);

    if (digit && idx < length - 1) {
      refs.current[idx + 1]?.focus();
    }
  };

  const onKey = (e: any, idx: number) => {
    if (e.nativeEvent.key === 'Backspace' && !value[idx] && idx > 0) {
      refs.current[idx - 1]?.focus();
    }
  };

  return (
    <View style={styles.row}>
      {Array.from({ length }).map((_, i) => (
        <TextInput
          key={`otp-${i}`} // stable key
          // ✅ callback returns void, not TextInput
          ref={(r: TextInput | null) => { refs.current[i] = r; }}
          value={value[i] ?? ''}
          onChangeText={(t) => handle(t, i)}
          onKeyPress={(e) => onKey(e, i)}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          returnKeyType={i === length - 1 ? 'done' : 'next'}
          maxLength={1}
          autoFocus={autoFocus && i === 0}
          style={styles.box}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  box: {
    width: 56,
    height: 56,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 20,
    color: theme.colors.text,
    backgroundColor: theme.colors.inputBg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});
