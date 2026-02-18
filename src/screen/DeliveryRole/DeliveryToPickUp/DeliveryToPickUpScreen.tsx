import React, { useState } from 'react';
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
import DeclineReasonModal, { DeclineReasonKey } from '../../../compoent/DeclineReasonModal';
import imageIndex from '../../../assets/imageIndex';
import { color } from '../../../constant';

type PickUpTask = {
  id: string;
  route: string;
  timeWindow: string;
  scheduledTime: string;
};

const MOCK_PICKUP_TASKS: PickUpTask[] = [
  { id: '5R9G87R', route: 'Elm St, Springfield → Maple Ave, Seattle', timeWindow: 'Time Window', scheduledTime: '10:30 AM – 10:45 AM' },
  { id: '5R9H12R', route: 'Oak Blvd, Portland → Pine Rd, Seattle', timeWindow: 'Time Window', scheduledTime: '11:00 AM – 11:15 AM' },
  { id: '5R9K34R', route: 'Cedar Ln, Tacoma → Birch St, Seattle', timeWindow: 'Time Window', scheduledTime: '12:00 PM – 12:30 PM' },
];

const DeliveryToPickUpScreen = () => {
  const navigation = useNavigation<any>();
  const [declineModalVisible, setDeclineModalVisible] = useState(false);
  const [declineTask, setDeclineTask] = useState<PickUpTask | null>(null);

  const openDrawer = () => navigation.dispatch(DrawerActions.openDrawer());

  const onDecline = (task: PickUpTask) => {
    setDeclineTask(task);
    setDeclineModalVisible(true);
  };

  const onCloseDeclineModal = () => {
    setDeclineModalVisible(false);
    setDeclineTask(null);
  };

  const onSubmitDecline = (reasonKey: DeclineReasonKey, reasonLabel: string) => {
    // TODO: call decline API with declineTask?.id, reasonKey, reasonLabel
    setDeclineModalVisible(false);
    setDeclineTask(null);
  };

  const onViewPickupDetail = (task: PickUpTask) => {
    // TODO: navigate to pickup detail screen
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBarComponent barStyle="dark-content" backgroundColor="#fff" />

      {/* Header: Logo + Bless-Shipping DRIVER, Notifications */}
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer}   hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
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
        {MOCK_PICKUP_TASKS.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No pickups yet</Text>
            <Text style={styles.emptySub}>Accepted tasks will appear here</Text>
          </View>
        ) : (
          MOCK_PICKUP_TASKS.map((task) => (
            <View key={task.id} style={styles.card}>
              <View style={styles.cardTop}>
                <View style={styles.idRow}>
                  <View style={styles.taskIconWrap}>
                    <Image source={imageIndex.group1} style={styles.taskIcon} resizeMode="contain" />
                  </View>
                  <Text style={styles.taskId}>#{task.id}</Text>
                </View>
                <View style={styles.statusPill}>
                  <Text style={styles.statusPillText}>Pending</Text>
                </View>
              </View>

              <View style={styles.routeRow}>
                <Image source={imageIndex.locationpin2} style={styles.pinIcon} resizeMode="contain" />
                <Text style={styles.routeText} numberOfLines={2}>{task.route}</Text>
              </View>

              <Text style={styles.timeWindowLabel}>{task.timeWindow}</Text>
              <View style={styles.scheduledRow}>
                <Text style={styles.scheduledTime}>{task.scheduledTime}</Text>
                <TouchableOpacity onPress={() => onViewPickupDetail(task)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <Text style={styles.viewDetailLink}>view Pickup Detail &gt;&gt;</Text>
                </TouchableOpacity>
              </View>

        
            </View>
          ))
        )}
      </ScrollView>

      <DeclineReasonModal
        visible={declineModalVisible}
        onClose={onCloseDeclineModal}
        onSubmit={onSubmitDecline}
        taskId={declineTask?.id}
      />
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
    marginBottom: 12,
  },
  idRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  taskIconWrap: {
    width: 44,
    height: 44,
 
  },
  taskIcon: {
    width: 24,
    height: 24,
   },
  taskId: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  statusPill: {
    backgroundColor: '#F97316',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 10,
  },
  pinIcon: {
    width: 18,
    height: 18,
    tintColor: color.red,
    marginTop: 2,
  },
  routeText: {
    flex: 1,
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
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
    marginBottom: 14,
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
  declineBtn: {
    alignSelf: 'flex-start',
    backgroundColor: color.red,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  declineBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default DeliveryToPickUpScreen;
