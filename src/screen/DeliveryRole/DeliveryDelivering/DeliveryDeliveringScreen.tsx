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

type DeliveringStatus = 'Pending' | 'Arrived' | 'Delivered';

type DeliveringTask = {
  id: string;
  recipientName: string;
  timeWindow: string;
  scheduledTime: string;
  status: DeliveringStatus;
};

const MOCK_DELIVERING: DeliveringTask[] = [
  { id: '5R9G87R', recipientName: 'Paltyn Calzoni', timeWindow: 'Time Window', scheduledTime: '10:30 AM - 10:45 AM', status: 'Pending' },
  { id: '5R9H12R', recipientName: 'Alena Press', timeWindow: 'Time Window', scheduledTime: '11:00 AM - 11:15 AM', status: 'Arrived' },
  { id: '5R9K34R', recipientName: 'Ruben Dokidis', timeWindow: 'Time Window', scheduledTime: '12:00 PM - 12:30 PM', status: 'Delivered' },
];

const DeliveryDeliveringScreen = () => {
  const navigation = useNavigation<any>();

  const getStatusStyle = (status: DeliveringStatus) => {
    if (status === 'Pending') return styles.badgePending;
    if (status === 'Arrived') return styles.badgeArrived;
    return styles.badgeDelivered;
  };

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
        {MOCK_DELIVERING.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No active deliveries</Text>
            <Text style={styles.emptySub}>Tasks you're delivering will show here</Text>
          </View>
        ) : (
          MOCK_DELIVERING.map((task) => (
            <View key={task.id} style={styles.card}>
              <View style={styles.cardTop}>
                <Text style={styles.recipientName}>{task.recipientName}</Text>
                <View style={[styles.statusBadge, getStatusStyle(task.status)]}>
                  <Text style={styles.statusBadgeText}>{task.status}</Text>
                </View>
              </View>
              <Text style={styles.timeWindowLabel}>{task.timeWindow}</Text>
              <View style={styles.scheduledRow}>
                <Text style={styles.scheduledTime}>{task.scheduledTime}</Text>
                <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <Text style={styles.viewDetailLink}>view Pickup Detail</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
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
    paddingVertical: 12,
     borderBottomColor: '#E2E8F0',
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
     borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  recipientName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgePending: {
    backgroundColor: '#F97316',
  },
  badgeArrived: {
    backgroundColor: '#3B82F6',
  },
  badgeDelivered: {
    backgroundColor: '#22C55E',
  },
  statusBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  timeWindowLabel: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 4,
  },
  scheduledRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  scheduledTime: {
    fontSize: 15,
    fontWeight: '700',
    color: '#22C55E',
  },
  viewDetailLink: {
    fontSize: 14,
    fontWeight: '600',
    color: color.primary,
  },
});

export default DeliveryDeliveringScreen;
