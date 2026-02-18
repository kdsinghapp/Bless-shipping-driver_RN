import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import imageIndex from '../../../assets/imageIndex';
import { color } from '../../../constant';

const UPLOAD_SLOTS = [
  { key: 'document', label: 'Tap to upload a document' },
  { key: 'id', label: 'Upload ID Image' },
  { key: 'aadhaar', label: 'Upload Aadhaar' },
];

const DeliveryDocumentsScreen = () => {
  const navigation = useNavigation<any>();
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const onUpload = (key: string) => {
    // TODO: launch image/document picker
  };

  const onSubmit = () => {
    // TODO: submit documents and vehicle info
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBarComponent barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Image source={imageIndex.back} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Documents</Text>
        <View style={styles.headerBtn} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {UPLOAD_SLOTS.map((slot) => (
          <TouchableOpacity
            key={slot.key}
            style={styles.uploadBox}
            onPress={() => onUpload(slot.key)}
            activeOpacity={0.85}
          >
            <View style={styles.uploadIconWrap}>
             <Text>+</Text>
            </View>
            <Text style={styles.uploadLabel}>{slot.label}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>Vehicle Info</Text>
        <TextInput
          style={styles.input}
          placeholder="Vehicle Number"
          placeholderTextColor="#94A3B8"
          value={vehicleNumber}
          onChangeText={setVehicleNumber}
        />
        <TouchableOpacity style={styles.dropdown} onPress={() => {}} activeOpacity={0.85}>
          <Text style={vehicleType ? styles.dropdownText : styles.dropdownPlaceholder}>
            {vehicleType || 'Vehicle Type'}
          </Text>
          <Image source={imageIndex.arrowqdown} style={styles.dropdownArrow} resizeMode="contain" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitBtn} onPress={onSubmit} activeOpacity={0.85}>
          <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backIcon: { width: 44, height: 44,   },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 32 },
  uploadBox: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#FBBF24',
     marginBottom: 12,
    minHeight: 100,
  },
  uploadIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FDE68A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  uploadIcon: { width: 24, height: 24, tintColor: '#D97706' },
  uploadLabel: { fontSize: 14, fontWeight: '600', color: 'black' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#334155', marginTop: 20, marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: '#0F172A',
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 14,
    backgroundColor: '#fff',
    marginBottom: 24,
  },
  dropdownText: { fontSize: 14, color: '#0F172A' },
  dropdownPlaceholder: { fontSize: 14, color: '#94A3B8' },
  dropdownArrow: { width: 20, height: 20, tintColor: '#64748B' },
  submitBtn: {
    backgroundColor: color.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitBtnText: { fontSize: 16, fontWeight: '700', color: '#fff' },
});

export default DeliveryDocumentsScreen;
