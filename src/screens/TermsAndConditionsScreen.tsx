// src/screens/TermsAndConditionsScreen.tsx
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import theme from '../theme/Theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TermsAndConditionsScreen() {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getStyles(colors), [colors]);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero Header */}
        <View style={styles.hero}>
          <Pressable
            style={styles.heroDrawer}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            accessibilityRole="button"
            accessibilityLabel="Open menu"
          >
            <MaterialIcons name="menu" size={22} color="#fff" />
          </Pressable>
          <Text style={styles.heroTitle}>Terms And Conditions</Text>
          <Text style={styles.heroSubtitle}>Last updated on 18th Feb 2022</Text>
        </View>

        {/* Content Card */}
        <View style={styles.card}>
          <Text style={styles.h2}>The Types of Information We Collect</Text>
          <View style={styles.bulletRow}>
            <View style={styles.bulletDot} />
            <Text style={styles.p}>Non-personally identifiable information</Text>
          </View>
          <Text style={styles.p}>
            We may collect non-personally identifiable information such as browser and OS type, visit date/time, and
            referring site to help us understand how users interact with the app.
          </Text>

          <Text style={styles.h2}>Personally identifiable information</Text>
          <Text style={styles.p}>
            We may collect personal information you voluntarily provide, such as name, email address, or other details
            needed to process requests. Payment card information is not stored on our servers.
          </Text>

          <Text style={styles.h2}>How We Use the Information</Text>
          <Text style={styles.p}>
            We use information to improve our services, respond to inquiries, and provide customer support. You can
            unsubscribe from communications at any time using the instructions provided in our messages.
          </Text>

          <Text style={styles.h2}>How We Protect User Information</Text>
          <Text style={styles.p}>
            We adopt appropriate data collection, storage, and processing practices and security measures to protect
            against unauthorized access, alteration, disclosure, or destruction of personal information.
          </Text>

          <Text style={styles.h2}>Sharing Personal Information</Text>
          <Text style={styles.p}>
            We may share limited information with trusted third parties who assist in operating our app or servicing
            users, provided those parties agree to keep this information confidential and use it only for the agreed
            purpose or when required by law.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (colors: typeof theme.colors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg },
    scroll: { paddingBottom: 24 },

    hero: {
      height: 220,
      backgroundColor: colors.primaryDark,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: -56, // overlap the card like FAQs
    },
    heroDrawer: {
      position: 'absolute',
      left: 16,
      top: 16,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(255,255,255,0.15)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    heroTitle: { color: '#fff', fontSize: 28, fontWeight: '800', marginBottom: 6, textAlign: 'center' },
    heroSubtitle: { color: '#fff', opacity: 0.9, textAlign: 'center' },

    card: {
      marginHorizontal: 16,
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
      ...theme.shadow.card,
    },
    h2: { color: colors.text, fontWeight: '700', fontSize: 16, marginBottom: 8, marginTop: 4 },
    p: { color: colors.textSecondary, lineHeight: 22, marginBottom: 12 },
    bulletRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    bulletDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.text, marginRight: 8 },
  });
