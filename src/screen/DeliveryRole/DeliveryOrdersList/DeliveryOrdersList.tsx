import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import ScreenNameEnum from '../../../routes/screenName.enum';
import imageIndex from '../../../assets/imageIndex';
import styles from './style';

type DeliveryOrderItem = {
  id: string;
  orderNo: string;
  customerName: string;
  date: string;
  status: string;
};

const MOCK_ORDERS: DeliveryOrderItem[] = [
  { id: '1', orderNo: 'ORD-1001', customerName: 'Bless Shipping', date: '13 Feb 2025', status: 'Pending' },
  { id: '2', orderNo: 'ORD-1002', customerName: 'Bless Shipping', date: '13 Feb 2025', status: 'Pending' },
  { id: '3', orderNo: 'ORD-1003', customerName: 'Bless Shipping', date: '12 Feb 2025', status: 'Pending' },
];

const DeliveryOrdersList = () => {
  const navigation = useNavigation<any>();
  const [orders] = useState<DeliveryOrderItem[]>(MOCK_ORDERS);

  const openDrawer = () => navigation.dispatch(DrawerActions.openDrawer());

  const onDeliveryPress = (order: DeliveryOrderItem) => {
    navigation.navigate(ScreenNameEnum.DeliveryRequest, { order });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBarComponent barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer} style={styles.menuBtn} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
          <Image source={imageIndex.menus} style={styles.menuIcon} resizeMode="contain" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Orders</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={{ flex: 1, backgroundColor: '#F8FAFC' }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {orders.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>No orders assigned yet.</Text>
          </View>
        ) : (
          orders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderImage} />
              <View style={styles.orderBody}>
                <Text style={styles.orderNo}>ORDER NO</Text>
                <Text style={styles.orderName}>{order.customerName}</Text>
                <Text style={styles.orderMeta}>{order.date}</Text>
                <Text style={styles.statusPending}>Status: {order.status}</Text>
              </View>
              <TouchableOpacity
                style={styles.deliveryBtn}
                activeOpacity={0.85}
                onPress={() => onDeliveryPress(order)}
              >
                <Text style={styles.deliveryBtnText}>Delivery</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeliveryOrdersList;
