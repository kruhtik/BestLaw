// src/screens/DraftingScreen.tsx
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeProvider';
import theme from '../theme/Theme';

export default function DraftingScreen({ navigation }: any) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getStyles(colors), [colors]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topbar}>
        <Pressable
          style={styles.menuBtn}
          onPress={() => navigation.getParent('DrawerRoot')?.dispatch(DrawerActions.openDrawer())}
        >
          <Text style={styles.menuIcon}>≡</Text>
        </Pressable>
        <View style={styles.brandPill}>
          <Text style={styles.brandText}>BestLaw</Text>
        </View>
       
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Drafting</Text>
        <Text style={styles.desc}>Coming soon…</Text>
      </View>
    </SafeAreaView>
  );
}

const getStyles = (colors: typeof theme.colors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg, padding: 16 },
    topbar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 4,
      paddingBottom: 8,
      zIndex: 200,
      elevation: 8,
    },
    menuBtn: {
      width: 40,
      height: 40,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      ...theme.shadow.card,
    },
    menuIcon: { fontSize: 18, color: colors.text },
    brandPill: {
      backgroundColor: colors.card,
      borderRadius: theme.radius.full,
      paddingHorizontal: 14,
      paddingVertical: 6,
      ...theme.shadow.card,
    },
    brandText: { color: colors.text, fontSize: 16, fontWeight: '700' },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      ...theme.shadow.card,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
      ...theme.shadow.card,
    },
    title: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 8 },
    desc: { color: colors.textSecondary },
  });
