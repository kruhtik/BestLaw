// src/screens/HomeScreen.tsx
import React, { ComponentProps } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import Svg, { SvgUri, Defs, LinearGradient as SvgLinearGradient, Stop, Rect } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

interface QuickAction {
  key: string;
  title: string;
  subtitle: string;
  icon: IconName;
  color: string;
  screen: string;
}

interface RecentActivityItem {
  key: string;
  title: string;
  time: string;
  status: 'completed' | 'in-progress';
  icon: IconName;
  iconColor: string;
}

const quickActions: QuickAction[] = [
  {
    key: 'research',
    title: 'Start Research',
    subtitle: 'Search legal judgments',
    icon: 'magnify',
    color: '#4A90E2',
    screen: 'JudgmentResearch',
  },
  {
    key: 'chat',
    title: 'AI Chat',
    subtitle: 'Get instant legal insights',
    icon: 'chat-processing-outline',
    color: '#50E3C2',
    screen: 'ChatWithDB',
  },
  {
    key: 'draft',
    title: 'Draft Document',
    subtitle: 'Create legal documents',
    icon: 'file-document-outline',
    color: '#B86BFF',
    screen: 'Drafting',
  },
  {
    key: 'commentary',
    title: 'Commentary',
    subtitle: 'Read expert analysis',
    icon: 'star-outline',
    color: '#F8A53A',
    screen: 'Commentary',
  },
];

const recentActivity: RecentActivityItem[] = [
  {
    key: '1',
    title: 'Constitutional Law – Article 21',
    time: '2 hours ago',
    status: 'completed',
    icon: 'magnify',
    iconColor: '#D0021B',
  },
  {
    key: '2',
    title: 'Contract Agreement Draft',
    time: '5 hours ago',
    status: 'in-progress',
    icon: 'file-document-outline',
    iconColor: '#D0021B',
  },
];

export default function HomeScreen({ navigation, route }: any) {
  const styles = React.useMemo(() => getStyles(), []);
  const userName: string = route?.params?.userName || 'John';

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          {/* Gradient background */}
          <Svg
            style={styles.headerGradient}
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <Defs>
              <SvgLinearGradient id="bestlawHeaderGrad" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor="#7B5CFF" stopOpacity="1" />
                <Stop offset="1" stopColor="#6C4CEB" stopOpacity="1" />
              </SvgLinearGradient>
            </Defs>
            <Rect x="0" y="0" width="100" height="100" fill="url(#bestlawHeaderGrad)" />
          </Svg>
          <SafeAreaView edges={['top']}>
            <View style={styles.headerTopRow}>
              <Pressable
                style={styles.headerLogoContainer}
                onPress={() => navigation.navigate('Home')}
                accessibilityRole="button"
                accessibilityLabel="Go to Home"
              >
                <SvgUri
                  uri="https://staticservedev.blob.core.windows.net/bestlaw/bestlaw/316db6bf-7bfa-4f42-a580-e4e9dff072c2.svg"
                  width={98}
                  height={30}
                />
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate('Settings')}
                accessibilityRole="button"
                accessibilityLabel="Open profile/settings"
              >
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarInitial}>{userName?.[0] ?? 'U'}</Text>
                </View>
              </Pressable>
            </View>
            <Text style={styles.welcomeText}>Welcome back, {userName}</Text>
            <Text style={styles.subWelcomeText}>Ready to research today?</Text>
          </SafeAreaView>
        </View>

        <View style={styles.body}>
          {/* Quick Actions */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActionsGrid}>
              {quickActions.map((item) => (
                <Pressable
                  key={item.key}
                  style={({ pressed }) => [styles.quickActionCard, pressed && styles.cardPressed]}
                  onPress={() => navigation.navigate('FeaturesTabs', { screen: item.screen })}
                  android_ripple={{ color: '#00000010' }}
                >
                  <View style={[styles.quickActionIconContainer, { backgroundColor: `${item.color}20` }]}>
                    <MaterialCommunityIcons name={item.icon} size={24} color={item.color} />
                  </View>
                  <Text style={styles.quickActionTitle}>{item.title}</Text>
                  <Text style={styles.quickActionSubtitle}>{item.subtitle}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <MaterialCommunityIcons name="magnify" size={20} color="#A5B4CB" />
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Researches</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialCommunityIcons name="file-document-outline" size={20} color="#A5B4CB" />
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Documents</Text>
            </View>
          </View>

          {/* Recent Activity */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              <Pressable>
                <Text style={styles.viewAllText}>View all →</Text>
              </Pressable>
            </View>
            <View style={styles.activityList}>
              {recentActivity.map((item) => (
                <View key={item.key} style={styles.activityItem}>
                  <View style={[styles.activityIconContainer, { backgroundColor: `${item.iconColor}20` }]}>
                    <MaterialCommunityIcons name={item.icon} size={20} color={item.iconColor} />
                  </View>
                  <View style={styles.activityTextContainer}>
                    <Text style={styles.activityTitle} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.activityTime}>{item.time}</Text>
                  </View>
                  <View
                    style={[
                      styles.statusPill,
                      item.status === 'completed' ? styles.completedPill : styles.inProgressPill,
                    ]}
                  >
                    <Text style={item.status === 'completed' ? styles.statusTextLight : styles.statusTextDark}>
                      {item.status === 'completed' ? 'Completed' : 'In Progress'}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const getStyles = () =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    header: {
      backgroundColor: '#6C4CEB',
      paddingHorizontal: 20,
      paddingBottom: 20,
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
      overflow: 'hidden',
    },
    headerGradient: { ...StyleSheet.absoluteFillObject },
    headerTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    headerLeftSpacer: { width: 96, height: 28 },
    headerLogoContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
    avatarCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E5E7EB', marginTop: 20 },
    avatarInitial: { color: '#6C4CEB', fontWeight: '800' },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF', marginLeft: 8 },
    proPill: { backgroundColor: '#FFFFFF', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4 },
    proText: { color: '#6C4CEB', fontWeight: 'bold', fontSize: 12 },
    welcomeText: { fontSize: 18, color: '#FFFFFF', fontWeight: '600' },
    subWelcomeText: { fontSize: 14, color: '#FFFFFF', opacity: 0.8 },
    body: { padding: 20 },
    sectionContainer: { marginBottom: 24 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 16 },
    viewAllText: { fontSize: 14, color: '#6C4CEB' },
    quickActionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    quickActionCard: {
      width: '48%',
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      minHeight: 120,
      alignItems: 'flex-start',
      borderWidth: 1,
      borderColor: '#E5E7EB',
      shadowColor: 'rgba(17, 24, 39, 0.08)',
      shadowOpacity: 1,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 4,
      elevation: 2,
    },
    cardPressed: { opacity: 0.9 },
    quickActionIconContainer: { borderRadius: 12, padding: 8, marginBottom: 16 },
    quickActionTitle: { fontSize: 16, fontWeight: 'bold', color: '#111827', marginBottom: 4 },
    quickActionSubtitle: { fontSize: 12, color: '#6B7280' },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
    statCard: {
      width: '48%',
      backgroundColor: '#FFFFFF',
      borderRadius: 999,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      borderWidth: 1,
      borderColor: '#E5E7EB',
      shadowColor: 'rgba(17, 24, 39, 0.08)',
      shadowOpacity: 1,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 4,
      elevation: 2,
    },
    statNumber: { fontSize: 20, fontWeight: 'bold', color: '#111827', marginHorizontal: 8 },
    statLabel: { fontSize: 14, color: '#6B7280' },
    activityList: {
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: 8,
      borderWidth: 1,
      borderColor: '#E5E7EB',
      shadowColor: 'rgba(17, 24, 39, 0.08)',
      shadowOpacity: 1,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 4,
      elevation: 2,
    },
    activityItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#F3F4F6',
    },
    activityIconContainer: { borderRadius: 20, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
    activityTextContainer: { flex: 1, marginLeft: 12 },
    activityTitle: { fontSize: 15, fontWeight: '600', color: '#111827', lineHeight: 20 },
    activityTime: { fontSize: 12, color: '#6B7280', marginTop: 2 },
    statusPill: { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
    completedPill: { backgroundColor: '#22C55E' },
    inProgressPill: { backgroundColor: '#F59E0B' },
    statusTextLight: { color: '#FFFFFF', fontSize: 11, fontWeight: 'bold', textTransform: 'capitalize' },
    statusTextDark: { color: '#374151', fontSize: 11, fontWeight: 'bold', textTransform: 'capitalize' },
  });
