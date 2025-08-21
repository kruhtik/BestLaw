// src/screens/FaqsScreen.tsx
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import theme from '../theme/Theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function FaqsScreen() {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getStyles(colors), [colors]);
  const navigation = useNavigation();

  const [expanded, setExpanded] = React.useState<number | null>(0);

  const faqData = React.useMemo(
    () => [
      {
        q: 'When do I need Extended License?',
        a:
          'If your End Product which is sold - Then only your required Extended License. i.e. If you take subscription charges (monthly, yearly, etc...) from your end users in this case you required Extended License.',
      },
      { q: 'What Support Includes?', a: 'Standard support covers bug fixes and basic guidance related to the template usage.' },
      { q: 'Is Berry Support TypeScript?', a: 'Yes, the template supports TypeScript and includes typings for major components.' },
      { q: 'Is there any RoadMap for Berry?', a: 'Yes, features and improvements are planned and released periodically.' },
    ],
    []
  );

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
          <Text style={styles.heroTitle}>FAQs</Text>
          <Text style={styles.heroSubtitle}>
            Please refer the{`\n`}Frequently ask question for your{`\n`}quick help
          </Text>
        </View>

        {/* FAQ Card */}
        <View style={styles.card}>
          {faqData.map((item, idx) => {
            const isOpen = expanded === idx;
            return (
              <View key={item.q}>
                <Pressable style={styles.itemRow} onPress={() => setExpanded(isOpen ? null : idx)}>
                  <Text style={styles.itemQuestion}>{item.q}</Text>
                  <MaterialIcons
                    name="expand-more"
                    size={22}
                    color={colors.textSecondary}
                    style={isOpen ? styles.chevronOpen : undefined}
                  />
                </Pressable>
                {isOpen && <Text style={styles.itemAnswer}>{item.a}</Text>}
                {idx !== faqData.length - 1 && <View style={styles.divider} />}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (colors: typeof theme.colors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg },
    scroll: { paddingBottom: 32 },

    hero: {
      height: 220,
      backgroundColor: colors.primaryDark,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: -56, // let card overlap
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
    heroTitle: { color: '#fff', fontSize: 28, fontWeight: '800', marginBottom: 8 },
    heroSubtitle: { color: '#fff', opacity: 0.9, textAlign: 'center', lineHeight: 22 },
    heroFab: {
      position: 'absolute',
      right: 16,
      top: 16,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primaryDark,
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadow.card,
    },

    card: {
      marginHorizontal: 16,
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
      ...theme.shadow.card,
    },

    itemRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14 },
    itemQuestion: { color: colors.text, fontSize: 16, fontWeight: '700', flex: 1, paddingRight: 12 },
    itemAnswer: { color: colors.textSecondary, paddingBottom: 16, lineHeight: 22 },
    chevronOpen: { transform: [{ rotate: '180deg' }] },
    divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border, marginVertical: 6 },
  });
