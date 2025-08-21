// src/screens/UserProfileScreen.tsx
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import theme from '../theme/Theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function UserProfileScreen() {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getStyles(colors), [colors]);
  const navigation = useNavigation();
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [address1, setAddress1] = React.useState('');
  const [address2, setAddress2] = React.useState('');
  // Static placeholders until pickers are integrated
  const dob = '';
  const gender = '';
  const country = '';
  const stateVal = '';

  const onUploadAvatar = () => {
    // NOTE: integrate image picker (pending)
    console.log('Upload Avatar pressed');
  };

  const onChangeDetails = () => {
    // NOTE: persist details (pending)
    console.log({ firstName, lastName, email, phone, address1, address2, dob, gender, country, state: stateVal });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header with Drawer Button */}
        <View style={styles.header}>
          <Pressable
            style={styles.menuBtn}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            accessibilityRole="button"
            accessibilityLabel="Open menu"
          >
            <MaterialIcons name="menu" size={18} color={colors.text} />
          </Pressable>
          {/* <Text style={styles.headerTitle}>User Profile</Text> */}
        </View>

        {/* Avatar / Profile Picture */}
        <View style={styles.profileCard}>
          <Text style={styles.sectionTitle}>Profile Picture</Text>
          <View style={styles.avatarBox}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarInitial}>U</Text>
            </View>
            <Text style={styles.avatarHint}>Upload/Change Your Profile Image</Text>
            <Pressable style={styles.primaryBtn} onPress={onUploadAvatar}>
              <Text style={styles.primaryBtnText}>Upload Avatar</Text>
            </Pressable>
          </View>
        </View>

        {/* Edit Account Details */}
        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Edit Account Details</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>First Name</Text>
            <TextInput style={styles.input} placeholder="First Name" placeholderTextColor={colors.textSecondary} value={firstName} onChangeText={setFirstName} />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput style={styles.input} placeholder="Last Name" placeholderTextColor={colors.textSecondary} value={lastName} onChangeText={setLastName} />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput keyboardType="email-address" autoCapitalize="none" style={styles.input} placeholder="Enter your email" placeholderTextColor={colors.textSecondary} value={email} onChangeText={setEmail} />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput keyboardType="phone-pad" style={styles.input} placeholder="Phone Number" placeholderTextColor={colors.textSecondary} value={phone} onChangeText={setPhone} />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Address 1</Text>
            <TextInput style={styles.input} placeholder="Address 1" placeholderTextColor={colors.textSecondary} value={address1} onChangeText={setAddress1} />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Address 2</Text>
            <TextInput style={styles.input} placeholder="Address 2" placeholderTextColor={colors.textSecondary} value={address2} onChangeText={setAddress2} />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Date of Birth</Text>
            <Pressable style={[styles.input, styles.inputRow]} onPress={() => {}}>
              <Text style={styles.inputText}>{dob || 'MM/DD/YYYY'}</Text>
              <MaterialIcons name="calendar-today" size={18} color={colors.textSecondary} />
            </Pressable>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Gender</Text>
            <Pressable style={[styles.input, styles.inputRow]} onPress={() => {}}>
              <Text style={styles.inputText}>{gender || 'Select'}</Text>
              <MaterialIcons name="arrow-drop-down" size={22} color={colors.textSecondary} />
            </Pressable>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Country</Text>
            <Pressable style={[styles.input, styles.inputRow]} onPress={() => {}}>
              <Text style={styles.inputText}>{country || 'Country'}</Text>
              <MaterialIcons name="arrow-drop-down" size={22} color={colors.textSecondary} />
            </Pressable>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>State/Union Territory</Text>
            <Pressable style={[styles.input, styles.inputRow]} onPress={() => {}}>
              <Text style={styles.inputText}>{stateVal || 'State/Union Territory'}</Text>
              <MaterialIcons name="arrow-drop-down" size={22} color={colors.textSecondary} />
            </Pressable>
          </View>

          <Pressable style={[styles.primaryBtn, { alignSelf: 'flex-start', marginTop: 4 }]} onPress={onChangeDetails}>
            <Text style={styles.primaryBtnText}>Change Details</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (colors: typeof theme.colors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg },
    content: { padding: 16, gap: 12 },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    menuBtn: {
      width: 36,
      height: 36,
      borderRadius: 10,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 8,
      ...theme.shadow.card,
    },
    headerTitle: { color: colors.text, fontWeight: '800', fontSize: 20 },
    sectionTitle: { color: colors.text, fontWeight: '700', marginBottom: 12, fontSize: 18 },

    profileCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 16,
      ...theme.shadow.card,
    },
    avatarBox: { alignItems: 'center' },
    avatarCircle: { width: 96, height: 96, borderRadius: 48, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
    avatarInitial: { color: colors.primaryDark, fontWeight: '800', fontSize: 30 },
    avatarHint: { color: colors.textSecondary, marginTop: 12, marginBottom: 12 },

    primaryBtn: { backgroundColor: colors.primaryDark, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 14, ...theme.shadow.card },
    primaryBtnText: { color: '#fff', fontWeight: '700' },

    formCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 16,
      ...theme.shadow.card,
    },
    formGroup: { marginBottom: 12 },
    label: { color: colors.text, marginBottom: 6, fontSize: 16, fontWeight: '600' },
    input: { backgroundColor: colors.bg, borderWidth: 1, borderColor: colors.border, borderRadius: theme.radius.lg, paddingHorizontal: 14, paddingVertical: 14, fontSize: 16, color: colors.text },
    inputRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    inputText: { color: colors.textSecondary },
  });
