// src/components/CountryCodePicker.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/Theme';

const COUNTRY_CODES = [
  { code: '+91', name: 'India' },
  { code: '+1', name: 'United States' },
  { code: '+44', name: 'United Kingdom' },
  { code: '+61', name: 'Australia' },
  { code: '+65', name: 'Singapore' },
];

type CountryCodePickerProps = {
  value: string;
  onChange: (code: string) => void;
};

export default function CountryCodePicker({ value, onChange }: CountryCodePickerProps) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const selectedCountry = COUNTRY_CODES.find(c => c.code === value) || COUNTRY_CODES[0];

  return (
    <>
      <Pressable 
        style={styles.picker} 
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.codeText}>{selectedCountry.code}</Text>
        <Ionicons name="chevron-down" size={16} color={theme.colors.text} />
      </Pressable>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable 
          style={styles.modalOverlay} 
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Country Code</Text>
            {COUNTRY_CODES.map((country) => (
              <Pressable
                key={country.code}
                style={styles.countryItem}
                onPress={() => {
                  onChange(country.code);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.countryName}>{country.name}</Text>
                <Text style={styles.countryCode}>{country.code}</Text>
                {value === country.code && (
                  <Ionicons name="checkmark" size={20} color={theme.colors.primary} />
                )}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.inputBg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    minWidth: 80,
    justifyContent: 'space-between',
  },
  codeText: {
    color: theme.colors.text,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: 20,
    maxHeight: '70%',
  },
  modalTitle: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  countryName: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 16,
  },
  countryCode: {
    color: theme.colors.muted,
    marginRight: 12,
  },
});
