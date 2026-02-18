import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Image,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import ScreenNameEnum from '../../../routes/screenName.enum';
import CustomHeader from '../../../compoent/CustomHeader';
import imageIndex from '../../../assets/imageIndex';

const HEADER_BG = '#035093';
const GREEN = '#22C55E';
const RED = '#EF4444';
const ORANGE = '#F97316';
const BLUE = '#035093';
const LIGHT_GREEN = '#DCFCE7';
const LIGHT_RED = '#FEE2E2';

type DateFilter = 'Today' | 'Tomorrow' | 'Scheduled';

export type OrderItem = {
  id: string;
  time: string;
  name: string;
  location: string;
  distance?: string;
  dateGroup: 'today' | 'yesterday';
  status: 'in_transit' | 'delivered' | 'failed' | 'rejected' | 'pending';
  paymentStatus: 'paid' | 'unpaid';
};

const MOCK_ORDERS: OrderItem[] = [
  { id: '1043', time: '09:08 PM', name: 'Ahmad Aminoff', location: 'BGC, BLR', distance: '3m 1.2km', dateGroup: 'today', status: 'in_transit', paymentStatus: 'paid' },
  { id: '1044', time: '08:02 PM', name: 'Anil Mehra', location: 'BGC, BLR', distance: '3m 1.2km', dateGroup: 'today', status: 'delivered', paymentStatus: 'paid' },
  { id: '1045', time: '08:02 PM', name: 'Anil Mehra', location: 'BGC, BLR', distance: '3m 1.2km', dateGroup: 'today', status: 'failed', paymentStatus: 'unpaid' },
  { id: '1046', time: '08:02 PM', name: 'Anil Mehra', location: 'BGC, BLR', distance: '3m 1.2km', dateGroup: 'today', status: 'pending', paymentStatus: 'unpaid' },
  { id: '1041', time: '08:02 PM', name: 'Justin Upshutz', location: 'BGC, BLR', distance: '3m 1.2km', dateGroup: 'yesterday', status: 'in_transit', paymentStatus: 'paid' },
  { id: '1042', time: '08:02 PM', name: 'Anil Mehra', location: 'BGC, BLR', distance: '3m 1.2km', dateGroup: 'yesterday', status: 'pending', paymentStatus: 'unpaid' },
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

const DATE_CHIPS: DateFilter[] = ['Today', 'Tomorrow', 'Scheduled'];

const MerchantViewOrders = ({ navigation }: any) => {
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState<DateFilter>('Today');

  const filteredAndGrouped = useMemo(() => {
    let list = MOCK_ORDERS.filter((o) => !search.trim() || o.id.includes(search.trim()));
    if (dateFilter === 'Today') {
      list = list.filter((o) => o.dateGroup === 'today');
    } else if (dateFilter === 'Tomorrow') {
      list = []; // no "tomorrow" in mock data
    } else if (dateFilter === 'Scheduled') {
      // Scheduled: show today + yesterday
      list = list.filter((o) => o.dateGroup === 'today' || o.dateGroup === 'yesterday');
    }
    const groups: Record<string, OrderItem[]> = { today: [], yesterday: [] };
    list.forEach((o) => {
      if (o.dateGroup === 'today') groups.today.push(o);
      else groups.yesterday.push(o);
    });
    return groups;
  }, [search, dateFilter]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: HEADER_BG }} edges={['top']}>
      <StatusBarComponent barStyle="light-content" />
      <CustomHeader label="View Orders" />

      <ScrollView
        style={{ flex: 1, backgroundColor: '#fff' }}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* SEARCH - light grey, magnifying glass only (same as design) */}
        <View
          style={{
      flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'white',
  borderRadius: 12,
  paddingHorizontal: 14,
  height: 48,
  marginBottom: 16,

  // ✅ Android
  elevation: 4,

  // ✅ iOS
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 3.5,
           }}
        >
          <Image source={imageIndex.search1} style={{ width: 20, height: 20 }} resizeMode="contain" />
          <TextInput
            allowFontScaling={false}
            placeholder="Search Order ID (ex 1043)"
            placeholderTextColor="#6B7280"
            value={search}
            onChangeText={setSearch}
            style={{
              flex: 1,
              fontSize: 15,
              color: '#111827',
              marginLeft: 12,
              paddingVertical: 0,
            }}
          />
        </View>

        {/* FILTERS ROW - label + two "All" dropdowns */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#374151' }}>
            Filters
          </Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 8,
                paddingHorizontal: 14,
                borderRadius: 20,
                 borderWidth: 1,
                borderColor: '#1D5FA0',
                gap: 6,
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: '500', color: '#1D5FA0' }}>All</Text>
              <Image source={imageIndex.arrowDown} style={{ width: 12, height: 12 }} resizeMode="contain" />
            </Pressable>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 8,
                paddingHorizontal: 14,
                borderRadius: 20,
                 borderWidth: 1,
                borderColor: '#1D5FA0',
                gap: 6,
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: '500', color: '#1D5FA0' }}>All</Text>
              <Image source={imageIndex.arrowDown} style={{ width: 12, height: 12 }} resizeMode="contain" />
            </Pressable>
          </View>
        </View>

        {/* DATE CHIPS - Today (blue) / Tomorrow / Scheduled (grey) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 24 }}
          contentContainerStyle={{ gap: 10 }}
        >
          {DATE_CHIPS.map((chip) => (
            <Pressable
              key={chip}
              onPress={() => setDateFilter(chip)}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 18,
                borderRadius: 10,
                backgroundColor: dateFilter === chip ? HEADER_BG : '#EFEFEF',
                //  borderColor: dateFilter === chip ? HEADER_BG : '#E2E8F0',
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '600',
                  color: dateFilter === chip ? '#fff' : '#334155',
                }}
              >
                {chip}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* ORDER LIST BY DATE - section headers then cards */}
        {filteredAndGrouped.today.length > 0 && (
          <>
            <Text style={{ fontSize: 17, fontWeight: '700', color: '#1F2937', marginBottom: 12 }}>
              Today
            </Text>
            {filteredAndGrouped.today.map((order, i) => (
              <OrderCard
                key={`${order.id}-${i}`}
                order={order}
                onView={() => navigation.navigate(ScreenNameEnum.ViewDetails, { item: order })}
              />
            ))}
          </>
        )}
        {filteredAndGrouped.yesterday.length > 0 && (
          <>
            <Text style={{ fontSize: 17, fontWeight: '700', color: '#1F2937', marginTop: 16, marginBottom: 12 }}>
              Yesterday
            </Text>
            {filteredAndGrouped.yesterday.map((order, i) => (
              <OrderCard
                key={`${order.id}-${i}`}
                order={order}
                onView={() => navigation.navigate(ScreenNameEnum.ViewDetails, { item: order })}
              />
            ))}
          </>
        )}
        {filteredAndGrouped.today.length === 0 && filteredAndGrouped.yesterday.length === 0 && (
          <Text style={{ fontSize: 14, color: '#64748B', textAlign: 'center', marginTop: 24 }}>
            No orders found
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

function OrderCard({
  order,
  onView,
}: {
  order: OrderItem;
  onView: () => void;
}) {
  const config = statusConfig[order.status];
  const payment = paymentConfig[order.paymentStatus];
  const displayDistance = order.distance ?? order.location;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onView}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      {/* LEFT - Order # + time, name, distance */}
      <View style={{ flex: 1, marginRight: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', flexWrap: 'wrap', gap: 6 }}>
          <Text style={{ fontSize: 15, fontWeight: '700', color: '#0F172A' }}>
            Order #{order.id}
          </Text>
          <Text style={{ fontSize: 13, color: '#64748B', fontWeight: '500' }}>{order.time}</Text>
        </View>
        <Text style={{ fontSize: 14, color: '#475569', marginTop: 6 }}>
          {order.name}
        </Text>
        <Text style={{ fontSize: 13, color: BLUE, marginTop: 4, fontWeight: '500' }}>
          {displayDistance}
        </Text>
      </View>

      {/* RIGHT - Status + Payment chips */}
      <View style={{ alignItems: 'flex-end', gap: 8 }}>
        <View
          style={{
            paddingVertical: 5,
            paddingHorizontal: 12,
            borderRadius: 10,
            backgroundColor: config.bg,
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: '600', color: '#fff' }}>
            {config.label}
          </Text>
        </View>
        <View
          style={{
            paddingVertical: 5,
            paddingHorizontal: 12,
            borderRadius: 10,
            backgroundColor: payment.bg,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              color: payment.bg === LIGHT_GREEN ? '#166534' : '#991B1B',
            }}
          >
            {payment.label}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default MerchantViewOrders;
