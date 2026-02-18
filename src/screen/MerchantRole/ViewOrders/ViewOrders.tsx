import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import ScreenNameEnum from '../../../routes/screenName.enum';
import DrawerHeader from '../../../compoent/DrawerHeader';
import SearchBar from '../../../compoent/SearchBar';

const HEADER_BG = '#035093';
const GREEN = '#22C55E';
const RED = '#EF4444';
const ORANGE = '#F97316';
const BLUE = '#035093';
const LIGHT_GREEN = '#DCFCE7';
const LIGHT_RED = '#FEE2E2';

type OrderStatusFilter = 'All' | 'Pending' | 'Confirmed' | 'Delivered' | 'Canceled';

export type OrderItem = {
  id: string;
  time: string;
  name: string;
  location: string;
  distance?: string;
  status: 'in_transit' | 'delivered' | 'failed' | 'rejected' | 'pending';
  paymentStatus: 'paid' | 'unpaid';
};

const MOCK_ORDERS: OrderItem[] = [
  { id: '1043', time: '09:08 PM', name: 'Ahmad Aminoff', location: 'BGC, BLR', distance: '2m 1.2km', status: 'in_transit', paymentStatus: 'paid' },
  { id: '1044', time: '08:02 PM', name: 'Anil Mehra', location: 'BGC, BLR', distance: '2m 1.2km', status: 'delivered', paymentStatus: 'paid' },
  { id: '1045', time: '08:02 PM', name: 'Anil Mehra', location: 'BGC, BLR', distance: '2m 1.2km', status: 'failed', paymentStatus: 'unpaid' },
  { id: '1046', time: '08:02 PM', name: 'Anil Mehra', location: 'BGC, BLR', distance: '2m 1.2km', status: 'pending', paymentStatus: 'unpaid' },
  { id: '1041', time: '08:02 PM', name: 'Anil Mehra', location: 'BGC, BLR', distance: '2m 1.2km', status: 'in_transit', paymentStatus: 'paid' },
  { id: '1042', time: '08:02 PM', name: 'Anil Mehra', location: 'BGC, BLR', distance: '2m 1.2km', status: 'pending', paymentStatus: 'unpaid' },
];

const statusConfig: Record<string, { label: string; bg: string }> = {
  in_transit: { label: 'In Transit', bg: BLUE },
  delivered: { label: 'Delivered', bg: GREEN },
  failed: { label: 'Failed', bg: RED },
  rejected: { label: 'Rejected', bg: ORANGE },
  pending: { label: 'Pending', bg: ORANGE },
};

const paymentConfig: Record<string, { label: string; bg: string }> = {
  paid: { label: 'Paid', bg: LIGHT_GREEN },
  unpaid: { label: 'Unpaid', bg: LIGHT_RED },
};

function orderToFilterStatus(status: OrderItem['status']): OrderStatusFilter {
  if (status === 'pending') return 'Pending';
  if (status === 'delivered') return 'Delivered';
  if (status === 'failed' || status === 'rejected') return 'Canceled';
  return 'Confirmed';
}

const STATUS_CHIPS: OrderStatusFilter[] = ['All', 'Pending', 'Confirmed', 'Delivered', 'Canceled'];

const ViewOrders = ({ navigation }: any) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatusFilter>('All');

  const filteredOrders = useMemo(() => {
    let list = MOCK_ORDERS.filter((o) => !search || o.id.includes(search));
    if (statusFilter !== 'All') {
      list = list.filter((o) => orderToFilterStatus(o.status) === statusFilter);
    }
    return list;
  }, [search, statusFilter]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: HEADER_BG }} edges={['top']}>
      <StatusBarComponent barStyle="light-content" />
      <DrawerHeader title="View Order" />

      <ScrollView
        style={{ flex: 1, backgroundColor: 'white' }}
        contentContainerStyle={{ padding: 16, paddingBottom: 40, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 16 }}
          contentContainerStyle={{ gap: 10, paddingVertical: 4 }}
        >
          {STATUS_CHIPS.map((chip) => (
            <Pressable
              key={chip}
              onPress={() => setStatusFilter(chip)}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 18,
                borderRadius: 10,
                backgroundColor: statusFilter === chip ? HEADER_BG : '#fff',
                borderWidth: 1,
                borderColor: statusFilter === chip ? HEADER_BG : '#E2E8F0',
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: '600', color: statusFilter === chip ? '#fff' : '#475569' }}>
                {chip}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {filteredOrders.length === 0 ? (
          <View style={styles.emptyWrap}>
            <View style={styles.emptyIconWrap}>
              <Text style={styles.emptyIcon}>📦</Text>
              <Text style={styles.emptyIconX}>✕</Text>
            </View>
            <Text style={styles.emptyText}>No orders found.</Text>
          </View>
        ) : (
          filteredOrders.map((order, i) => (
            <OrderCard
              key={`${order.id}-${i}`}
              order={order}
              onView={() => navigation.navigate(ScreenNameEnum.ViewDetails, { item: order })}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  emptyWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyIcon: { fontSize: 36 },
  emptyIconX: { position: 'absolute' as const, fontSize: 24, color: RED },
  emptyText: { fontSize: 16, color: '#64748B', fontWeight: '500' },
};

function OrderCard({
  order,
  onView,
}: {
  order: OrderItem;
  onView: () => void;
}) {
  const config = statusConfig[order.status] || statusConfig.in_transit;
  const payment = paymentConfig[order.paymentStatus] || paymentConfig.unpaid;
  const locationText = order.distance || order.location;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onView}
      style={{
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
      }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#0F172A' }}>Order #{order.id}</Text>
        </View>
        <Text style={{ fontSize: 14, color: '#475569', marginBottom: 2 }}>{order.name}</Text>
        <Text style={{ fontSize: 13, color: BLUE }}>{locationText}</Text>
                  <Text style={{ fontSize: 13, color: '#64748B' }}>{order.time}</Text>

      </View>
      <View style={{ alignItems: 'flex-end', gap: 6 }}>
        <View style={{ paddingVertical: 4, paddingHorizontal: 10, borderRadius: 8, backgroundColor: config.bg }}>
          <Text style={{ fontSize: 12, fontWeight: '600', color: '#fff' }}>{config.label}</Text>
        </View>
        <View style={{ paddingVertical: 4, paddingHorizontal: 10, borderRadius: 8, backgroundColor: payment.bg }}>
          <Text style={{ fontSize: 12, fontWeight: '600', color: payment.bg === LIGHT_GREEN ? '#166534' : '#991B1B' }}>
            {payment.label}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ViewOrders;
