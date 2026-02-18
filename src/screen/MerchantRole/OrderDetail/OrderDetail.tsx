import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Pressable,
  Modal,
  Image,
  StyleSheet,
  Linking,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../compoent/CustomHeader';
import imageIndex from '../../../assets/imageIndex';
import type { OrderItem } from '../ViewOrders/ViewOrders';

const HEADER_BG = '#035093';
const GREEN = '#22C55E';
const BLUE = '#035093';
const TEXT_MUTED = '#64748B';
const TEXT_DARK = '#0F172A';

// Mock delivery partner – replace with API data when available
const deliveryPartner = {
  name: 'Rahul Kumar',
  phone: '+91 99800 14980',
  vehicle: 'Bike • MH 12 AB 1234',
  rating: 4.8,
  photo: null,
};

const timelineSteps = [
  { key: 'assigned', label: 'Assigned', date: 'June 3, 2023 5:10pm', done: true },
  { key: 'accepted', label: 'Accepted', date: 'June 3, 2023 5:10pm', done: true },
  { key: 'picked', label: 'Picked Up', date: 'June 3, 2023 5:10pm', done: true },
  { key: 'delivered', label: 'Delivered', date: 'June 3, 2023 9:45 pm', done: true },
];

const getStatusLabel = (status: OrderItem['status']) => {
  const map: Record<OrderItem['status'], string> = {
    delivered: 'Delivered',
    in_transit: 'In Transit',
    failed: 'Failed',
    pending: 'Pending',
    rejected: 'Rejected',
  };
  return map[status] ?? status;
};

const OrderDetail = ({ route, navigation }: any) => {
  const item: OrderItem = route?.params?.item ?? {
    id: '1043',
    time: '09:08 PM',
    name: 'Mike Ross',
    location: '26 Anand Darshan, Mumbai',
    status: 'delivered',
    paymentStatus: 'paid',
  };
  const [rateModalVisible, setRateModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const isDelivered = item.status === 'delivered';
  const senderName = item.name || 'Mike Ross';
  const phone = '+91 (998) 00-1498';
  const address = item.location || '26 Anand Darshan, Mumbai';

  const submitFeedback = () => {
    setRateModalVisible(false);
    setRating(0);
    setFeedback('');
  };

  const openCall = (tel: string) => {
    const number = tel.replace(/\D/g, '');
    Linking.openURL(Platform.OS === 'ios' ? `tel:${number}` : `tel:${number}`);
  };

  const openMessage = (tel: string) => {
    const number = tel.replace(/\D/g, '');
    Linking.openURL(`sms:${number}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBarComponent barStyle="light-content" />
      <CustomHeader label="Order Detail" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Order ID & Status card */}
        <View style={[styles.orderIdCard,{
         }]}>
          <View>
          <Text style={styles.orderIdLabel}>Current Status</Text>
          <View style={[styles.statusPill, isDelivered && styles.statusPillGreen]}>
            <Text style={[styles.statusPillText, isDelivered && styles.statusPillTextGreen]}>
              {getStatusLabel(item.status)}
            </Text>
          </View>
          </View>
                  <Text style={styles.orderIdLabel}>13:45, Today</Text>

        </View>

        {/* Delivery Partner / Driver Details */}
       
        {/* Sender & Contact */}
        <View style={styles.section}>
           <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={[styles.iconCircle, styles.iconCircleGreen]}>
                <Image source={imageIndex.Addressx} style={styles.smallIcon} resizeMode="contain" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Name</Text>
                <Text style={styles.infoValue}>{senderName}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <View style={[styles.iconCircle, styles.iconCircleBlue]}>
                <Image source={imageIndex.Phone1} style={styles.smallIcon} resizeMode="contain" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Phone Number</Text>
                <Text style={styles.infoValue}>{phone}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Locations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Locatione</Text>
          <View style={styles.addressCard}>
            <Image source={imageIndex.pin} style={styles.pinIcon} resizeMode="contain" />
            <Text style={styles.addressText}>{address}</Text>
          </View>
        </View>

        {/* Delivery Timeline */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Timeline</Text>
          <View style={styles.timelineCard}>
            {timelineSteps.map((step, index) => (
              <View key={step.key} style={styles.timelineRow}>
                <View style={[styles.timelineDot, step.done && styles.timelineDotDone]} />
                {index < timelineSteps.length - 1 && (
                  <View style={[styles.timelineLine, step.done && styles.timelineLineDone]} />
                )}
                <View style={styles.timelineContent}>
                  <Text style={[styles.timelineLabel, step.done && styles.timelineLabelDone]}>
                    {step.label}
                  </Text>
                  <Text style={[styles.timelineDate, step.done && styles.timelineDateDone]}>
                    {step.date}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Proof of Delivery */}
        {isDelivered && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Proof of Delivery</Text>
            <Text style={styles.proofSub}>Delivered on Jun 2, 2023, 5:35 PM</Text>
            <View style={styles.proofImageWrap}>
              <Image source={imageIndex.order} style={styles.proofImage} resizeMode="cover" />
            </View>
            <Pressable style={styles.rateButton} onPress={() => setRateModalVisible(true)}>
              <Text style={styles.rateButtonText}>Rate Your Driver</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>

      {/* Rate Your Driver Modal */}
      <Modal visible={rateModalVisible} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setRateModalVisible(false)}>
          <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.modalTitle}>Rate Your Driver</Text>
            <Text style={styles.modalSubtitle}>How was your delivery experience?</Text>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setRating(star)}
                  style={styles.starBtn}
                  activeOpacity={0.8}
                >
                  <Text style={styles.starText}>{rating >= star ? '★' : '☆'}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={styles.feedbackInput}
              placeholder="Share your feedback (optional)"
              placeholderTextColor="#94A3B8"
              value={feedback}
              onChangeText={setFeedback}
              multiline
              numberOfLines={3}
            />
            <TouchableOpacity style={styles.submitBtn} onPress={submitFeedback} activeOpacity={0.8}>
              <Text style={styles.submitBtnText}>Submit Feedback</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: HEADER_BG },
  scroll: { flex: 1, backgroundColor: 'white' },
  scrollContent: { padding: 16, paddingBottom: 40 },
  // Order ID & status
  orderIdCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
        ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 }, android: { elevation: 2 } }),

  },
  orderIdLabel: { fontSize: 12, color: TEXT_MUTED, marginBottom: 2 },
  orderIdValue: { fontSize: 16, fontWeight: '700', color: TEXT_DARK },
  statusPill: {
    backgroundColor: '#E2E8F0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginTop: 4,
  },
  statusPillGreen: { backgroundColor: '#DCFCE7' },
  statusPillText: { fontSize: 13, fontWeight: '600', color: TEXT_DARK },
  statusPillTextGreen: { color: GREEN },
  // Sections
  section: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: TEXT_MUTED,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  // Delivery Partner
  driverCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 }, android: { elevation: 2 } }),
  },
  driverTop: { flexDirection: 'row', marginBottom: 14 },
  driverAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  driverAvatarImg: { width: 32, height: 32 },
  driverInfo: { flex: 1, justifyContent: 'center' },
  driverName: { fontSize: 17, fontWeight: '700', color: TEXT_DARK, marginBottom: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  starSmall: { fontSize: 12, color: '#EAB308', marginRight: 4 },
  ratingText: { fontSize: 13, color: TEXT_MUTED, fontWeight: '600' },
  driverVehicle: { fontSize: 13, color: TEXT_MUTED },
  driverActions: { flexDirection: 'row' as const },
  actionBtn: {
    flex: 1,
    flexDirection: 'row' as const,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BLUE,
    paddingVertical: 12,
    borderRadius: 10,
    marginRight: 6,
  },
  actionBtnLast: { marginRight: 0, marginLeft: 6 },
  actionIcon: { width: 18, height: 18, marginRight: 6 },
  actionBtnText: { fontSize: 14, fontWeight: '600', color: '#fff' },
  // Sender & Contact
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 }, android: { elevation: 2 } }),
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  infoContent: { flex: 1, marginLeft: 12 },
  infoLabel: { fontSize: 12, color: TEXT_MUTED, marginBottom: 2 },
  infoValue: { fontSize: 15, fontWeight: '600', color: TEXT_DARK },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleGreen: { backgroundColor: '#DCFCE7' },
  iconCircleBlue: { backgroundColor: '#E0F2FE' },
  smallIcon: { width: 22, height: 22 },
  // Address
  addressCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 }, android: { elevation: 2 } }),
  },
  pinIcon: { width: 20, height: 20, marginRight: 10, marginTop: 2 },
  addressText: { flex: 1, fontSize: 14, color: '#475569', lineHeight: 20 },
  // Timeline
  timelineCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 }, android: { elevation: 2 } }),
  },
  timelineRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4 },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E2E8F0',
    marginTop: 4,
    marginRight: 12,
  },
  timelineDotDone: { backgroundColor: GREEN },
  timelineLine: {
    position: 'absolute',
    left: 5,
    top: 16,
    bottom: -8,
    width: 2,
    backgroundColor: '#E2E8F0',
  },
  timelineLineDone: { backgroundColor: GREEN },
  timelineContent: { flex: 1 },
  timelineLabel: { fontSize: 14, color: '#94A3B8' },
  timelineLabelDone: { color: GREEN, fontWeight: '600' },
  timelineDate: { fontSize: 12, color: '#94A3B8', marginTop: 2 },
  timelineDateDone: { color: '#64748B' },
  // Proof of delivery
  proofSub: { fontSize: 13, color: TEXT_MUTED, marginBottom: 10 },
  proofImageWrap: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F1F5F9',
    marginBottom: 16,
  },
  proofImage: { width: '100%', height: '100%' },
  rateButton: {
    backgroundColor: BLUE,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  rateButtonText: { fontSize: 16, fontWeight: '600', color: '#fff' },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 340,
  },
  modalTitle: { fontSize: 20, fontWeight: '700', color: TEXT_DARK, marginBottom: 4, textAlign: 'center' },
  modalSubtitle: { fontSize: 14, color: TEXT_MUTED, marginBottom: 16, textAlign: 'center' },
  starsRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 16 },
  starBtn: { padding: 4, marginHorizontal: 4 },
  starText: { fontSize: 32, color: '#EAB308' },
  feedbackInput: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: TEXT_DARK,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  submitBtn: { backgroundColor: BLUE, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  submitBtnText: { fontSize: 16, fontWeight: '600', color: '#fff' },
});

export default OrderDetail;
