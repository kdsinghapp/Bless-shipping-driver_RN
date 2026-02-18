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
import { DrawerActions, useNavigation } from '@react-navigation/native';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import imageIndex from '../../../assets/imageIndex';
import { color } from '../../../constant';

type CompletedOrder = {
  id: string;
  orderId: string;
  recipient: string;
  completedAt: string;
  earning: string;
  image?: any;
};

const MOCK_TODAY: CompletedOrder[] = [
  { id: '1', orderId: 'PB-10452', recipient: 'Ace Pickleball Club John D.', completedAt: '12:00 PM', earning: '$2.58' },
  { id: '2', orderId: 'PB-10453', recipient: 'Maple Grove Fitness Sarah M.', completedAt: '11:45 AM', earning: '$3.20' },
  { id: '3', orderId: 'PB-10454', recipient: 'Downtown Café Mike R.', completedAt: '11:30 AM', earning: '$2.10' },
];

const MOCK_EARLIER: CompletedOrder[] = [
  { id: '4', orderId: 'PB-10450', recipient: 'Riverside Apartments Jane K.', completedAt: 'Yesterday 4:20 PM', earning: '$4.00' },
  { id: '5', orderId: 'PB-10449', recipient: 'Tech Park Building Tom L.', completedAt: 'Yesterday 2:15 PM', earning: '$2.85' },
];

const DeliveryCompletedScreen = () => {
  const navigation = useNavigation<any>();

  const renderSection = (title: string, orders: CompletedOrder[]) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {orders.map((order) => (
        <View key={order.id} style={styles.card}>
          <View style={styles.cardLeft}>
            <View style={styles.thumbWrap}>
              <Image source={order.image || imageIndex.Frame} style={styles.thumb} resizeMode="contain" />
            </View>
            <View style={styles.cardBody}>
              <View style={styles.orderIdRow}>
                <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <Text style={styles.orderId}>Order ID: #{order.orderId}</Text>
                </TouchableOpacity>
                <View style={styles.deliveredBadge}>
                  <Text style={styles.deliveredBadgeText}>Delivered</Text>
                </View>
              </View>
              <Text style={styles.recipient}>{order.recipient}</Text>
              <Text style={styles.meta}>
                Completed at {order.completedAt} | Earning {order.earning}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBarComponent barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={styles.logoRow} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
          <Image source={imageIndex.BlessImage} style={styles.headerLogo} resizeMode="contain" />
         </TouchableOpacity>
        <TouchableOpacity style={styles.bellWrap} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
          <Image source={imageIndex.Notification} style={styles.bellIcon} resizeMode="contain" />
          <View style={styles.bellBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {MOCK_TODAY.length === 0 && MOCK_EARLIER.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No completed tasks yet</Text>
            <Text style={styles.emptySub}>Finished deliveries will appear here</Text>
          </View>
        ) : (
          <>
            {MOCK_TODAY.length > 0 && renderSection('Today', MOCK_TODAY)}
            {MOCK_EARLIER.length > 0 && renderSection('Earlier', MOCK_EARLIER)}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    height:70
   
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerLogo: {
      width: 140,
    height: 140,
  },
  headerBrand: {
    fontSize: 18,
    fontWeight: '700',
    color: '#22C55E',
  },
  bellWrap: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellIcon: {
    width: 24,
    height: 24,
    tintColor: '#334155',
  },
  bellBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EF4444',
  },
  scroll: { flex: 1 },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  emptySub: {
    fontSize: 14,
    color: '#64748B',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
     borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  thumbWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    overflow: 'hidden',
    backgroundColor: '#E2E8F0',
    marginRight: 14,
  },
  thumb: {
    width: '100%',
    height: '100%',
  },
  cardBody: {
    flex: 1,
  },
  orderIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
    flexWrap: 'wrap',
    gap: 8,
  },
  orderId: {
    fontSize: 14,
    fontWeight: '600',
    color: color.primary,
  },
  deliveredBadge: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  deliveredBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  recipient: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  meta: {
    fontSize: 13,
    color: '#64748B',
  },
});

export default DeliveryCompletedScreen;
