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
import ScreenNameEnum from '../../../routes/screenName.enum';
import imageIndex from '../../../assets/imageIndex';
import { color } from '../../../constant';

type OrderStatus = 'Paid' | 'Pending';

const MOCK_ORDERS = [
  { id: 'ORD001', date: '2023-10-30', amount: '$20.00', status: 'Paid' as OrderStatus },
  { id: 'ORD002', date: '2023-10-29', amount: '$85.00', status: 'Pending' as OrderStatus },
  { id: 'ORD003', date: '2023-10-28', amount: '$20.00', status: 'Paid' as OrderStatus },
  { id: 'ORD004', date: '2023-10-27', amount: '$85.00', status: 'Pending' as OrderStatus },
  { id: 'ORD005', date: '2023-10-26', amount: '$20.00', status: 'Paid' as OrderStatus },
];

const DeliveryEarningsScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBarComponent barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Image source={imageIndex.back} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Earnings</Text>
        <TouchableOpacity onPress={() => navigation.navigate(ScreenNameEnum.DeliveryProfileScreen)} style={styles.headerBtn}>
          <Text style={styles.profileLink}>Profile</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.cardToday}>
          <Text style={styles.cardLabel}>Today's Earnings</Text>
          <Text style={styles.cardAmount}>$186.50</Text>
        </View>
        <View style={styles.cardWeek}>
          <Text style={styles.cardLabel}>This Week</Text>
          <Text style={styles.cardAmount}>$720.79</Text>
        </View>
        <View style={styles.pendingWrap}>
          <Text style={styles.pendingLabel}>Pending Payout</Text>
          <Text style={styles.pendingAmount}>$255.50</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        {MOCK_ORDERS.map((order) => (
          <View key={order.id} style={styles.orderRow}>
            <View style={styles.orderLeft}>
              <Text style={styles.orderId}>Order ID: {order.id}</Text>
              <Text style={styles.orderDate}>{order.date}</Text>
            </View>
            <View style={styles.orderRight}>
              <Text style={styles.orderAmount}>{order.amount}</Text>
              <View style={[styles.statusBadge, order.status === 'Paid' ? styles.statusPaid : styles.statusPending]}>
                <Text style={[styles.statusText, order.status === 'Paid' ? styles.statusTextPaid : styles.statusTextPending]}>
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
  headerBtn: { minWidth: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backIcon: { width: 44, height: 44,  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
  profileLink: { fontSize: 16, fontWeight: '600', color: color.primary },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 32 },
  cardToday: {
    backgroundColor: color.primary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,

// iOS shadow
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.08,
shadowRadius: 6,

// Android shadow
elevation: 4,
  },
  cardWeek: {
    backgroundColor: '#22C55E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  cardLabel: { fontSize: 14, color: 'rgba(255,255,255,0.9)', marginBottom: 4 },
  cardAmount: { fontSize: 24, fontWeight: '700', color: '#fff' },
  pendingWrap: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  
// iOS shadow
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.08,
shadowRadius: 6,

// Android shadow
elevation: 4,
  },
  pendingLabel: { fontSize: 14, color: '#64748B', marginBottom: 4 },
  pendingAmount: { fontSize: 20, fontWeight: '700', color: '#F59E0B' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
  viewAll: { fontSize: 14, fontWeight: '600', color: color.primary },
  orderRow: {
  flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
backgroundColor: '#fff',
padding: 16,
borderRadius: 12,
marginBottom: 8,
 borderColor: '#E5E7EB',

// iOS shadow
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.08,
shadowRadius: 6,

// Android shadow
elevation: 4,

  },
  orderLeft: {},
  orderId: { fontSize: 15, fontWeight: '600', color: '#0F172A' },
  orderDate: { fontSize: 13, color: '#64748B', marginTop: 2 },
  orderRight: { alignItems: 'flex-end' },
  orderAmount: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  statusBadge: { marginTop: 6, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusPaid: { backgroundColor: '#DCFCE7' },
  statusPending: { backgroundColor: '#FFEDD5' },
  statusText: { fontSize: 12, fontWeight: '600' },
  statusTextPaid: { color: '#16A34A' },
  statusTextPending: { color: '#EA580C' },
});

export default DeliveryEarningsScreen;
