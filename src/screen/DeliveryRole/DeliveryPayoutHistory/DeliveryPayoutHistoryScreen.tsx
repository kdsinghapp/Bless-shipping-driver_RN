import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import imageIndex from '../../../assets/imageIndex';
import { color } from '../../../constant';

type PayoutStatus = 'Paid' | 'Pending';

const MOCK_PAYOUTS = [
  { id: 'ORD001', date: '2023-10-30', amount: '$20.00', status: 'Paid' as PayoutStatus },
  { id: 'ORD002', date: '2023-10-29', amount: '$85.00', status: 'Pending' as PayoutStatus },
  { id: 'ORD003', date: '2023-10-28', amount: '$20.00', status: 'Paid' as PayoutStatus },
  { id: 'ORD004', date: '2023-10-27', amount: '$85.00', status: 'Pending' as PayoutStatus },
  { id: 'ORD005', date: '2023-10-26', amount: '$20.00', status: 'Paid' as PayoutStatus },
  { id: 'ORD006', date: '2023-10-25', amount: '$45.00', status: 'Paid' as PayoutStatus },
  { id: 'ORD007', date: '2023-10-24', amount: '$120.00', status: 'Pending' as PayoutStatus },
];

const DeliveryPayoutHistoryScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBarComponent barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Image source={imageIndex.back} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payout History</Text>
        <View style={styles.headerBtn} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {MOCK_PAYOUTS.map((order) => (
          <View key={order.id} style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.orderId}>Order ID: {order.id}</Text>
              <Text style={styles.date}>{order.date}</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.amount}>{order.amount}</Text>
              <View style={[styles.badge, order.status === 'Paid' ? styles.badgePaid : styles.badgePending]}>
                <Text style={[styles.badgeText, order.status === 'Paid' ? styles.badgeTextPaid : styles.badgeTextPending]}>
                  {order.status}
                </Text>
              </View>
            </View>
          </View>
        ))}
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
  backIcon: { width: 44, height: 44,    },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 32 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 15,
    marginBottom: 8,
  
// iOS shadow
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.08,
shadowRadius: 6,

// Android shadow
elevation: 4,
  },
  left: {},
  orderId: { fontSize: 15, fontWeight: '600', color: '#0F172A' },
  date: { fontSize: 13, color: '#64748B', marginTop: 2 },
  right: { alignItems: 'flex-end' },
  amount: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  badge: { marginTop: 6, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgePaid: { backgroundColor: '#DCFCE7' },
  badgePending: { backgroundColor: '#FFEDD5' },
  badgeText: { fontSize: 12, fontWeight: '600' },
  badgeTextPaid: { color: '#16A34A' },
  badgeTextPending: { color: '#EA580C' },
});

export default DeliveryPayoutHistoryScreen;
