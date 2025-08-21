// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import theme from '../theme/Theme';

export default function HomeScreen({ navigation, route }: any) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getStyles(colors), [colors]);
  const userName: string = route?.params?.userName || 'User';
  const features = [
    { key: 'chat', label: 'Chat With DB', screen: 'ChatWithDB' },
    { key: 'commentary', label: 'Commentary', screen: 'Commentary' },
    { key: 'drafting', label: 'Drafting', screen: 'Drafting' },
    { key: 'jr', label: 'Judgment Research', screen: 'JudgmentResearch' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable
            style={styles.menuBtn}
            onPress={() => navigation.getParent()?.dispatch(DrawerActions.openDrawer())}
          >
            <Text style={styles.menuIcon}>≡</Text>
          </Pressable>
        </View>
        <View style={styles.headerCenter}>
          <View style={styles.brandPill}>
            <Text style={styles.brandText}>BestLaw</Text>
            <Text style={styles.welcomeText}>Welcome back, {userName}</Text>
          </View>
        </View>
      
      </View>

      {/* Body */}
      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
       
        {features.map((f) => (
          <Pressable
            key={f.key}
            style={({ pressed }) => [styles.cardBtn, pressed && { opacity: 0.85 }]}
            onPress={() => navigation.navigate('FeaturesTabs', { screen: f.screen })}
            testID={`home-btn-${f.key}`}
          >
            <Text style={styles.cardText}>{f.label}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (colors: typeof theme.colors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 8,
      paddingBottom: 4,
    },
    headerLeft: { flex: 1, alignItems: 'flex-start' },
    headerCenter: { flex: 1, alignItems: 'center' },
    headerRight: { flex: 1, alignItems: 'flex-end' },
    menuBtn: {
      width: 36,
      height: 36,
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
    welcomeText: { color: colors.textSecondary, fontSize: 14, marginTop: 2 },
    avatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      ...theme.shadow.card,
    },
    body: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingBottom: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sectionTitle: {
      color: colors.textSecondary,
      marginBottom: 16,
      fontWeight: '600',
      alignSelf: 'center',
    },
    cardBtn: {
      backgroundColor: colors.card,
      borderRadius: theme.radius.lg,
      paddingVertical: 18,
      alignItems: 'center',
      marginBottom: 16,
      width: '80%',
      maxWidth: 360,
      borderWidth: 1,
      borderColor: colors.border,
      ...theme.shadow.card,
    },
    cardText: { color: colors.text, fontSize: 18, fontWeight: '700' },
  });
