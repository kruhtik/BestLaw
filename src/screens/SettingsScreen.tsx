// src/screens/SettingsScreen.tsx
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Pressable, Switch } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import theme from '../theme/Theme';
import { useTheme } from '../theme/ThemeProvider';

export default function SettingsScreen({ navigation }: any) {
  const [notifications, setNotifications] = React.useState(true);
  const { mode, setMode, colors } = useTheme();
  const isDark = mode === 'dark';
  const styles = React.useMemo(() => createStyles(isDark), [isDark]);

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
        <Text style={styles.title}>Settings</Text>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Dark Mode</Text>
          <Switch
            value={isDark}
            onValueChange={(v) => setMode(v ? 'dark' : 'light')}
            trackColor={{ false: colors.border, true: colors.primary + '66' }}
            thumbColor={isDark ? colors.primary : colors.card}
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: theme.colors.border, true: theme.colors.primary + '66' }}
            thumbColor={notifications ? theme.colors.primary : theme.colors.card}
          />
        </View>
        <View style={styles.divider} />
        <Text style={styles.desc}>More settings coming soon…</Text>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: isDark ? '#000000' : '#FFFFFF', padding: 16 },
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
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...theme.shadow.card,
    },
    menuIcon: { fontSize: 18, color: theme.colors.text },
    brandPill: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.radius.full,
      paddingHorizontal: 14,
      paddingVertical: 6,
      ...theme.shadow.card,
    },
    brandText: { color: theme.colors.text, fontSize: 16, fontWeight: '700' },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...theme.shadow.card,
    },
    card: {
      backgroundColor: theme.colors.card,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...theme.shadow.card,
    },
    title: { fontSize: 18, fontWeight: '700', color: theme.colors.text, marginBottom: 12 },
    desc: { color: theme.colors.textSecondary },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 8,
    },
    rowLabel: { color: theme.colors.text, fontWeight: '600' },
    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginVertical: 8,
    },
  });
