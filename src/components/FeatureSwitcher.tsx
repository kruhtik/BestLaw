// src/components/FeatureSwitcher.tsx
import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import theme from '../theme/Theme';

export type FeatureItem = { label: string; screen: string };

const FEATURES: FeatureItem[] = [
  { label: 'Chat with DB', screen: 'ChatWithDB' },
  { label: 'Commentary', screen: 'Commentary' },
  { label: 'Drafting', screen: 'Drafting' },
  { label: 'Judgment Research', screen: 'JudgmentResearch' },
];

interface Props {
  readonly navigation: any;
  readonly currentScreen: string; // one of the screen names above
}

export default function FeatureSwitcher({ navigation, currentScreen }: Props) {
  const [open, setOpen] = useState(false);

  const current = useMemo(
    () => FEATURES.find((f) => f.screen === currentScreen) || FEATURES[0],
    [currentScreen]
  );

  const onSelect = (screen: string) => {
    setOpen(false);
    if (screen === currentScreen) return;
    navigation.replace(screen);
  };

  return (
    <View style={styles.wrap}>
      <Pressable style={styles.pill} onPress={() => setOpen((v) => !v)}>
        <Text style={styles.title}>{current.label}</Text>
        <Text style={styles.chev}>{open ? '▲' : '▼'}</Text>
      </Pressable>
      {open && (
        <View style={styles.menu}>
          {FEATURES.map((f) => (
            <Pressable key={f.screen} style={styles.item} onPress={() => onSelect(f.screen)}>
              <Text style={[styles.itemText, f.screen === currentScreen && styles.itemActive]}>
                {f.label}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'relative', alignItems: 'center', zIndex: 100 },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.card,
  },
  title: { color: theme.colors.text, fontWeight: '700' },
  chev: { color: theme.colors.textSecondary },
  menu: {
    position: 'absolute',
    top: 42,
    width: 220,
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
    zIndex: 1000,
    elevation: 12,
    ...theme.shadow.card,
  },
  item: { paddingHorizontal: 12, paddingVertical: 10 },
  itemText: { color: theme.colors.text },
  itemActive: { fontWeight: '700', color: theme.colors.primaryDark },
});
