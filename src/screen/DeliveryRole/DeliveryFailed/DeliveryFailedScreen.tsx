import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Modal,
  Pressable,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import ScreenNameEnum from '../../../routes/screenName.enum';
import imageIndex from '../../../assets/imageIndex';
import { color } from '../../../constant';

const FAILURE_REASONS = [
  { key: 'customer_not_available', label: 'Customer not available' },
  { key: 'wrong_address', label: 'Wrong address' },
  { key: 'refused', label: 'Refused delivery' },
  { key: 'other', label: 'Other' },
];

type RouteParams = {
  order?: { orderId?: string; receiverName?: string; address?: string };
  nextOrder?: { receiverName?: string; address?: string };
};

const DEFAULT_ORDER = {
  orderId: '#SR9G07R',
  receiverName: 'Craig Carder',
  address: '123 Oak Street, Apt 48',
};

const DEFAULT_NEXT_ORDER = {
  receiverName: 'Michael Chen',
  address: '456 Maple Avenue, Suite 200',
};

const DeliveryFailedScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const order = { ...DEFAULT_ORDER, ...route.params?.order };
  const nextOrder = { ...DEFAULT_NEXT_ORDER, ...route.params?.nextOrder };

  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [podPhotoUri, setPodPhotoUri] = useState<string | null>(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const canSubmit = selectedReason && !!podPhotoUri;

  const pickPodPhoto = () => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e: Event) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;
        setPodPhotoUri(URL.createObjectURL(file));
      };
      input.click();
      return;
    }
    launchImageLibrary({ mediaType: 'photo', quality: 0.7 }, (response) => {
      if (!response.didCancel && response.assets?.[0]?.uri) {
        setPodPhotoUri(response.assets[0].uri);
      }
    });
  };

  const onSubmit = () => {
    if (!canSubmit) return;
    setConfirmModalVisible(true);
  };

  const onGoToNextStop = () => {
    setConfirmModalVisible(false);
    navigation.navigate(ScreenNameEnum.DeliveryDrawer);
  };

  const onBackToRoutesList = () => {
    setConfirmModalVisible(false);
    navigation.navigate(ScreenNameEnum.DeliveryDrawer);
  };

  const onCallSupport = () => {
    // Could open tel: or in-app support
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBarComponent barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Image source={imageIndex.back} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delivery Failed</Text>
        <View style={styles.headerBtn} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Failure Reason</Text>
        <View style={styles.reasonsRow}>
          {FAILURE_REASONS.map((r) => (
            <TouchableOpacity
              key={r.key}
              style={[styles.reasonChip, selectedReason === r.key && styles.reasonChipSelected]}
              onPress={() => setSelectedReason(r.key)}
            >
              <Text style={[styles.reasonChipText, selectedReason === r.key && styles.reasonChipTextSelected]}>
                {r.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Additional Notes</Text>
        <TextInput
          style={styles.notesInput}
          placeholder="Additional Notes"
          placeholderTextColor="#94A3B8"
          value={notes}
          onChangeText={setNotes}
          multiline
        />
<View style={{
  backgroundColor: '#FFFFFF',
borderRadius: 14,
padding: 20,
marginBottom: 20,

elevation: 4,

shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.1,
shadowRadius: 4,

}}> 
        <Text style={[styles.sectionTitle,{
          textAlign:"center" ,
          marginBottom:11
        }]}>Delivered (POD Required)</Text>
        <TouchableOpacity
          style={styles.uploadBox}
          onPress={pickPodPhoto}
          activeOpacity={0.85}
        >
          {podPhotoUri ? (
            <View style={styles.uploadThumbWrap}>
              <Image source={{ uri: podPhotoUri }} style={styles.uploadThumbnail} resizeMode="cover" />
              <Text style={styles.changePhotoText}>Change Photo</Text>
            </View>
          ) : (
            <>
              <View style={styles.uploadIconWrap}>
                <Image source={imageIndex.document} style={styles.uploadIcon} resizeMode="contain" />
              </View>
              <Text style={styles.uploadText}>Upload a photo if available</Text>
              <TouchableOpacity style={styles.uploadPhotoBtn} onPress={pickPodPhoto} activeOpacity={0.85}>
                <Text style={styles.uploadPhotoBtnText}>Upload Photo</Text>
              </TouchableOpacity>
            </>
          )}
        </TouchableOpacity>
</View>
        <TouchableOpacity
          style={[styles.submitBtn, canSubmit && styles.submitBtnActive]}
          onPress={onSubmit}
          disabled={!canSubmit}
        >
          <Text style={styles.submitBtnText}>Submit Failure Report</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.callSupportBtn} onPress={onCallSupport}>
          <Text style={styles.callSupportBtnText}>Call Support</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={confirmModalVisible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setConfirmModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setConfirmModalVisible(false)}>
          <Pressable style={styles.confirmCard} onPress={() => {}}>
            <View style={styles.confirmIconWrap}>
              <Text style={styles.confirmCheckmark}>✓</Text>
            </View>
            <Text style={styles.confirmTitle}>Delivery Failed</Text>

            <View style={styles.confirmOrderBlock}>
              <Text style={styles.confirmStopLabel}>Stop #1</Text>
              <Text style={styles.confirmName}>{order.receiverName}</Text>
              <Text style={styles.confirmAddress}>{order.address}</Text>
            </View>

            <View style={styles.confirmOrderBlock}>
              <Text style={styles.confirmNextLabel}>Next Stop</Text>
              <Text style={styles.confirmName}>{nextOrder.receiverName}</Text>
              <Text style={styles.confirmAddress}>{nextOrder.address}</Text>
            </View>

            <View style={styles.confirmButtons}>
              <TouchableOpacity style={styles.confirmBtnPrimary} onPress={onGoToNextStop} activeOpacity={0.85}>
                <Text style={styles.confirmBtnPrimaryText}>Go to Next Stop</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmBtnSecondary} onPress={onBackToRoutesList} activeOpacity={0.85}>
                <Text style={styles.confirmBtnSecondaryText}>Back to Route List</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
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
   },
  headerBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backIcon: { width: 44, height: 44,  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 32 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#334155', marginBottom: 12 },
  reasonsRow: { 
   backgroundColor: '#FFFFFF',
borderRadius: 14,
padding: 20,
marginBottom: 20,

elevation: 4,

shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.1,
shadowRadius: 4,

    
    },
  reasonChip: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FBCFE8',
    backgroundColor: '#FBF6FF',
    marginBottom:18
  },
  reasonChipSelected: {
    borderColor: color.red,
    backgroundColor: color.red,
  },
  reasonChipText: { fontSize: 15, fontWeight: '600', color: color.red ,

textAlign:"center"

   },
  reasonChipTextSelected: { color: '#fff' },
  notesInput: {
     borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: '#0F172A',
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
 

elevation: 4,

shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.1,
shadowRadius: 4,

  },
  uploadBox: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: color.red,
    minHeight: 120,
  },
  uploadIconWrap: { marginBottom: 8 },
  uploadIcon: { width: 35, height: 35, tintColor: color.red },
  uploadText: { fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: 12 },
  uploadPhotoBtn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: color.red,
  },
  uploadPhotoBtnText: { fontSize: 14, fontWeight: '600', color: color.red },
  uploadThumbWrap: { alignItems: 'center', width: '100%' },
  uploadThumbnail: {
    width: '100%',
    maxWidth: 200,
    height: 140,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  changePhotoText: { fontSize: 14, fontWeight: '600', color: '#EA580C', marginTop: 8 },
  submitBtn: {
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#94A3B8',
    alignItems: 'center',
  },
  submitBtnActive: { backgroundColor: color.red },
  submitBtnText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  callSupportBtn: {
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: color.red,
    alignItems: 'center',
  },
  callSupportBtnText: { fontSize: 16, fontWeight: '600', color: color.red },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  confirmCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 28,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
  },
  confirmIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: color.red,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  confirmCheckmark: { fontSize: 36, color: '#fff', fontWeight: '700' },
  confirmTitle: { fontSize: 20, fontWeight: '700', color: '#0F172A', marginBottom: 20 },
  confirmOrderBlock: {
    alignSelf: 'stretch',
    marginBottom: 16,
  },
  confirmStopLabel: { fontSize: 12, fontWeight: '700', color: '#22C55E', marginBottom: 4 },
  confirmNextLabel: { fontSize: 12, fontWeight: '700', color: '#22C55E', marginBottom: 4 },
  confirmName: { fontSize: 15, fontWeight: '600', color: '#0F172A', marginBottom: 2 },
  confirmAddress: { fontSize: 13, color: '#64748B', lineHeight: 18 },
  confirmButtons: { width: '100%', marginTop: 8, gap: 12 },
  confirmBtnPrimary: {
    backgroundColor: color.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmBtnPrimaryText: { fontSize: 16, fontWeight: '700', color: '#fff' },
  confirmBtnSecondary: {
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
  },
  confirmBtnSecondaryText: { fontSize: 16, fontWeight: '600', color: '#0F172A' },
});

export default DeliveryFailedScreen;
