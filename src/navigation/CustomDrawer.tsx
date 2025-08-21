// src/navigation/CustomDrawer.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import theme from '../theme/Theme';
import { useTheme } from '../theme/ThemeProvider';

function hexToRgb(hex: string) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return { r: 255, g: 255, b: 255 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
  };
}

function luminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const srgb = [r, g, b].map((c) => {
    const ch = c / 255;
    return ch <= 0.03928 ? ch / 12.92 : Math.pow((ch + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

function contrastTextForBg(bg: string) {
  // threshold ~0.5 works well for black/white decision
  return luminance(bg) > 0.5 ? '#000000' : '#FFFFFF';
}

function DrawerItemRow({ initials, label, onPress, styles, labelColor, badgeTextColor }: { initials: string; label: string; onPress: () => void; styles: ReturnType<typeof createStyles>; labelColor: string; badgeTextColor: string }) {
  return (
    <Pressable style={({ pressed }) => [styles.itemRow, pressed && { opacity: 0.85 }]} onPress={onPress}>
      <View style={styles.initialCircle}>
        <Text style={[styles.initialText, { color: badgeTextColor }]}>{initials}</Text>
      </View>
      <Text style={[styles.itemLabel, { color: labelColor }]}>{label}</Text>
    </Pressable>
  );
}

export default function CustomDrawer(props: Readonly<DrawerContentComponentProps>) {
  const { colors, mode } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, mode), [colors, mode]);
  const go = (route: string) => {
    const nav = props.navigation as any;
    nav.navigate(route);
    nav.closeDrawer();
  };
  const goFeature = (tab: string) => {
    // Navigate into the nested stack -> tabs with the desired feature tab selected
    const nav = props.navigation as any;
    nav.navigate('Main', { screen: 'FeaturesTabs', params: { screen: tab } });
    nav.closeDrawer();
  };

  const labelColor = mode === 'light' ? '#000000' : '#FFFFFF';
  const badgeTextColor = '#101828'; // dark text inside white/light badge for both modes
  const sectionColor = mode === 'light' ? '#475467' : '#D0D5DD';

  return (
    <DrawerContentScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={[styles.container, styles.scrollContent]}
    >
      <Text style={[styles.sectionTitle, { color: sectionColor }]}>Features</Text>
      <DrawerItemRow styles={styles} labelColor={labelColor} badgeTextColor={badgeTextColor} initials="AQ" label="Chat with Database" onPress={() => goFeature('ChatWithDB')} />
      <DrawerItemRow styles={styles} labelColor={labelColor} badgeTextColor={badgeTextColor} initials="JR" label="Judgement Research" onPress={() => goFeature('JudgmentResearch')} />
      <DrawerItemRow styles={styles} labelColor={labelColor} badgeTextColor={badgeTextColor} initials="CM" label="Commentary" onPress={() => goFeature('Commentary')} />
      <DrawerItemRow styles={styles} labelColor={labelColor} badgeTextColor={badgeTextColor} initials="CM" label="Drafting" onPress={() => goFeature('Drafting')} />

      <Text style={[styles.sectionTitle, { color: sectionColor }]}>Users</Text>
      <DrawerItemRow styles={styles} labelColor={labelColor} badgeTextColor={badgeTextColor} initials="UP" label="User Profile" onPress={() => go('UserProfileDrawer')} />
      <DrawerItemRow styles={styles} labelColor={labelColor} badgeTextColor={badgeTextColor} initials="FQ" label="Faqs" onPress={() => go('Faqs')} />
      <DrawerItemRow styles={styles} labelColor={labelColor} badgeTextColor={badgeTextColor} initials="TC" label="Terms and Conditions" onPress={() => go('TermsAndConditions')} />
      <DrawerItemRow styles={styles} labelColor={labelColor} badgeTextColor={badgeTextColor} initials="PV" label="Transactions" onPress={() => go('Transactions')} />

      <View style={styles.spacer} />
      <View style={styles.footer}>
        <DrawerItemRow styles={styles} labelColor={labelColor} badgeTextColor={badgeTextColor} initials="ST" label="Settings" onPress={() => go('Settings')} />
      </View>
    </DrawerContentScrollView>
  );
}

const createStyles = (colors: typeof theme.colors, mode: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      padding: 16,
    },
    scrollContent: {
      flexGrow: 1,
    },
    sectionTitle: {
      color: mode === 'light' ? colors.textSecondary : colors.onBg,
      fontWeight: '700',
      marginBottom: 12,
      fontSize: 16,
    },
    spacer: { flex: 1 },
    footer: {
      borderTopWidth: 1,
      borderTopColor: mode === 'light' ? colors.border : '#344054',
      paddingTop: 12,
    },
    itemRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
    },
    initialCircle: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: mode === 'dark' ? '#FFFFFF' : '#F2F4F7',
      borderWidth: 1,
      borderColor: mode === 'light' ? colors.border : '#344054',
      marginRight: 12,
      ...theme.shadow.card,
    },
    initialText: {
      fontWeight: '700',
    },
    itemLabel: {
      color: mode === 'light' ? colors.text : colors.onBg,
      fontSize: 16,
    },
  });
