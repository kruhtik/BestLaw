// src/screens/TransactionsScreen.tsx
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { useTheme } from '../theme/ThemeProvider';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import theme from '../theme/Theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TransactionsScreen() {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getStyles(colors), [colors]);
  const navigation = useNavigation();
  const [tab, setTab] = React.useState<'wallet' | 'usage'>('wallet');

  const transactions = React.useMemo(
    () => [
      { id: '619184f6', user: 'Kruthik Gowda', date: 'Aug 09, 2025 10:34 AM', what: 'Judgement Research - download', debited: 0, balance: 1, status: 'Insufficient Credits' as const },
      { id: '2eb47149', user: 'Kruthik Gowda', date: 'Jul 24, 2025 01:03 PM', what: 'Judgement Research - download', debited: 0, balance: 1, status: 'Insufficient Credits' as const },
      { id: '2eb47144', user: 'Kruthik Gowda', date: 'Jul 24, 2025 12:45 PM', what: 'Judgement Research - download', debited: 5, balance: 95, status: 'Completed' as const },
    ],
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            style={styles.menuBtn}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            accessibilityRole="button"
            accessibilityLabel="Open menu"
          >
            <MaterialIcons name="menu" size={18} color={colors.text} />
          </Pressable>
          <Pressable
            style={styles.brandPill}
            onPress={() => navigation.navigate('Home' as never)}
            accessibilityRole="button"
            accessibilityLabel="Go to Home"
          >
            <SvgUri
              width={88}
              height={24}
              uri="https://staticservedev.blob.core.windows.net/bestlaw/bestlaw/316db6bf-7bfa-4f42-a580-e4e9dff072c2.svg"
            />
          </Pressable>
        </View>
        <Text style={styles.headerTitle}>Transactions</Text>
        <Text style={styles.headerSub}>Manage your Credit Usage and Subscription Details</Text>

        {/* Tabs */}
        <View style={styles.tabs}>
          <Pressable
            onPress={() => setTab('wallet')}
            style={[styles.tabBtn, tab === 'wallet' && styles.tabActive]}
            accessibilityRole="tab"
            accessibilityState={{ selected: tab === 'wallet' }}
          >
            <MaterialIcons name="account-balance-wallet" size={16} color={tab === 'wallet' ? colors.primaryDark : colors.textSecondary} />
            <Text style={[styles.tabText, tab === 'wallet' && styles.tabTextActive]}>Wallet</Text>
          </Pressable>
          <Pressable
            onPress={() => setTab('usage')}
            style={[styles.tabBtn, tab === 'usage' && styles.tabActive]}
            accessibilityRole="tab"
            accessibilityState={{ selected: tab === 'usage' }}
          >
            <MaterialIcons name="history" size={16} color={tab === 'usage' ? colors.primaryDark : colors.textSecondary} />
            <Text style={[styles.tabText, tab === 'usage' && styles.tabTextActive]}>Credit Usage</Text>
          </Pressable>
        </View>

        {/* Content */}
        {tab === 'wallet' ? (
          <>
            <View style={styles.sectionRow}>
              <MaterialIcons name="account-balance-wallet" size={16} color={colors.textSecondary} />
              <Text style={styles.sectionLabel}>Wallet</Text>
            </View>
            <View style={styles.card}>
              <View style={styles.userRow}>
                <View style={styles.avatarCircle}><Text style={styles.avatarInitial}>K</Text></View>
                <View>
                  <Text style={styles.title}>Kruthik Gowda (e3hog6)</Text>
                  <Text style={styles.desc}>Firm ID: c8a98c97</Text>
                </View>
              </View>
              <View style={styles.divider} />
              <View style={styles.gridTwo}>
                <View style={styles.infoItem}><Text style={styles.infoLabel}>Duration</Text><Text style={styles.badgeNeutral}>30 days</Text></View>
                <View style={styles.infoItem}><Text style={styles.infoLabel}>Status</Text><Text style={styles.badgeSuccess}>Active</Text></View>
                <View style={styles.infoItem}><Text style={styles.infoLabel}>Created At</Text><Text style={styles.infoValue}>22/07/2025</Text></View>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.title}>Credits Overview</Text>
              <Text style={[styles.huge, { marginTop: 6 }]}>1</Text>
              <Text style={styles.desc}>Available Credits</Text>
              <Text style={[styles.desc, { marginTop: 6 }]}>Last Updated: 24/07/2025</Text>
            </View>

            <View style={styles.card}>
              <View style={styles.userRow}>
                <MaterialIcons name="event" size={18} color={colors.textSecondary} />
                <Text style={[styles.title, { marginLeft: 8 }]}>Details</Text>
              </View>
              <View style={styles.gridTwo}>
                <View style={styles.infoItem}><Text style={styles.infoLabel}>Created Date</Text><Text style={styles.infoValue}>22/07/2025</Text></View>
                <View style={styles.infoItem}><Text style={styles.infoLabel}>Last Updated</Text><Text style={styles.infoValue}>24/07/2025</Text></View>
              </View>
              <View style={styles.actionRow}>
                <Pressable style={styles.primaryBtn}><Text style={styles.primaryBtnText}>Purchase Credits</Text></Pressable>
                <Pressable style={styles.outlineBtn}><Text style={styles.outlineBtnText}>View Billing History</Text></Pressable>
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.sectionRow}>
              <MaterialIcons name="history" size={16} color={colors.textSecondary} />
              <Text style={styles.sectionLabel}>Transaction History</Text>
            </View>
            <View style={styles.filterBar}>
              <View style={styles.filterLeft}>
                <MaterialIcons name="filter-list" size={16} color={colors.textSecondary} />
                <Text style={[styles.desc, { marginLeft: 6 }]}>Filter by Date Range:</Text>
              </View>
              <View style={styles.filterRight}>
                <Pressable style={styles.inputPill}><Text style={styles.inputPillText}>Start Date</Text><MaterialIcons name="calendar-today" size={14} color={colors.textSecondary} /></Pressable>
                <Pressable style={styles.inputPill}><Text style={styles.inputPillText}>End Date</Text><MaterialIcons name="calendar-today" size={14} color={colors.textSecondary} /></Pressable>
                <Pressable style={styles.exportBtn}><MaterialIcons name="file-download" size={14} color="#fff" /><Text style={styles.exportBtnText}>Export</Text></Pressable>
              </View>
            </View>
            {transactions.map((t) => (
              <View key={t.id} style={styles.listCard}>
                <Text style={styles.listTitle}>{t.what}</Text>
                <View style={styles.listRow}><Text style={styles.listLabel}>Transaction ID</Text><Text style={styles.listValue}>{t.id}</Text></View>
                <View style={styles.listRow}><Text style={styles.listLabel}>User</Text><Text style={styles.listValue}>{t.user}</Text></View>
                <View style={styles.listRow}><Text style={styles.listLabel}>Date & Time</Text><Text style={styles.listValue}>{t.date}</Text></View>
                <View style={styles.listRow}><Text style={styles.listLabel}>Amount Debited</Text><Text style={t.debited > 0 ? styles.badgeDanger : styles.badgeNeutral}>{t.debited} credits</Text></View>
                <View style={styles.listRow}><Text style={styles.listLabel}>Outstanding Balance</Text><Text style={styles.badgeSuccess}>{t.balance} credits</Text></View>
                <View style={styles.listRow}><Text style={styles.listLabel}>Status</Text><Text style={t.status === 'Completed' ? styles.statusCompleted : styles.statusWarn}>{t.status}</Text></View>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (colors: typeof theme.colors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg },
    scroll: { padding: 16, paddingBottom: 24 },

    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
    menuBtn: { width: 36, height: 36, borderRadius: 10, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', marginRight: 8, ...theme.shadow.card },
    headerTitle: { color: colors.text, fontWeight: '800', fontSize: 20, marginBottom: 4 },
    brandPill: { backgroundColor: colors.card, borderRadius: theme.radius.full, paddingHorizontal: 14, paddingVertical: 6, ...theme.shadow.card, borderWidth: 1, borderColor: colors.border },
    headerSub: { color: colors.textSecondary, marginTop: -6, marginBottom: 10 },

    tabs: { flexDirection: 'row', backgroundColor: colors.card, borderRadius: 12, borderWidth: 1, borderColor: colors.border, padding: 4, ...theme.shadow.card, marginBottom: 28 },
    tabBtn: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 10, borderRadius: 10, gap: 6, flex: 1, justifyContent: 'center' },
    tabActive: { borderBottomWidth: 2, borderBottomColor: colors.primaryDark },
    tabText: { color: colors.textSecondary, fontWeight: '600' },
    tabTextActive: { color: colors.primaryDark },

    sectionLabel: { color: colors.text, fontWeight: '700', marginBottom: 8 },
    sectionRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
    card: { backgroundColor: colors.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: colors.border, ...theme.shadow.card, marginBottom: 12 },
    title: { fontSize: 16, fontWeight: '700', color: colors.text },
    desc: { color: colors.textSecondary },
    huge: { fontSize: 36, color: colors.text, fontWeight: '800' },

    userRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    avatarCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
    avatarInitial: { color: colors.primaryDark, fontWeight: '800' },
    divider: { height: 1, backgroundColor: colors.border, marginVertical: 12 },
    gridTwo: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
    infoItem: { width: '48%' },
    infoLabel: { color: colors.textSecondary, marginBottom: 6 },
    infoValue: { color: colors.text, fontWeight: '600' },

    actionRow: { flexDirection: 'row', gap: 8, marginTop: 12, flexWrap: 'wrap' },
    primaryBtn: { backgroundColor: colors.primaryDark, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 14 },
    primaryBtnText: { color: '#fff', fontWeight: '700' },
    outlineBtn: { borderWidth: 1, borderColor: colors.border, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 14, backgroundColor: colors.bg },
    outlineBtnText: { color: colors.text, fontWeight: '700' },

    listCard: { backgroundColor: colors.card, borderRadius: 16, padding: 12, borderWidth: 1, borderColor: colors.border, ...theme.shadow.card, marginBottom: 10 },
    listTitle: { color: colors.text, fontWeight: '700', marginBottom: 6 },
    listRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
    listLabel: { color: colors.textSecondary },
    listValue: { color: colors.text, fontWeight: '600', marginLeft: 12, flexShrink: 1, textAlign: 'right' },

    badgeNeutral: { color: '#fff', backgroundColor: colors.primaryDark, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, overflow: 'hidden' },
    badgeDanger: { color: '#e74c3c', backgroundColor: 'rgba(231,76,60,0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, overflow: 'hidden' },
    badgeSuccess: { color: '#2ecc71', backgroundColor: 'rgba(46,204,113,0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, overflow: 'hidden' },
    statusCompleted: { color: '#2ecc71', fontWeight: '700' },
    statusWarn: { color: '#e1a32a', fontWeight: '700' },

    filterBar: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 10, marginBottom: 10, width: '100%' },
    filterLeft: { flexDirection: 'row', alignItems: 'center', marginRight: 8, flexShrink: 1 },
    filterRight: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', flexShrink: 1 },
    inputPill: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 20, backgroundColor: colors.bg, borderWidth: 1, borderColor: colors.border, marginRight: 8, marginTop: 6 },
    inputPillText: { color: colors.textSecondary, marginRight: 6 },
    exportBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primaryDark, paddingVertical: 8, paddingHorizontal: 10, borderRadius: 20, marginTop: 6, alignSelf: 'flex-start' },
    exportBtnText: { color: '#fff', fontWeight: '700', marginLeft: 6 },
  });
