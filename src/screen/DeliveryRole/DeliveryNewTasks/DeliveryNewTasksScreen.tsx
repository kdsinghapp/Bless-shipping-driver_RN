import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import DeclineReasonModal, { DeclineReasonKey } from '../../../compoent/DeclineReasonModal';
import { GetDriverTasksApi, AcceptOrderApi, DeclineOrderApi } from '../../../Api/apiRequest';
import { ActivityIndicator } from 'react-native';
import ScreenNameEnum from '../../../routes/screenName.enum';
import imageIndex from '../../../assets/imageIndex';
import { color } from '../../../constant';


type TaskFilter = 'Assigned' | 'Completed';
type TaskTag = 'expired' | 'ASAP' | '2h' | 'Same Day' | 'Scheduled';

type TaskItem = {
  id: string;
  tag: TaskTag;
  timer?: string;
  address: string;
  time?: string;
  expired?: boolean;
};

const MOCK_TASKS: TaskItem[] = [
  { id: 'SR9087R', tag: 'expired', address: 'Elm St, Springfield — Maple Ave, Seattle', time: '02:50', expired: true },
  { id: 'SR9G07R', tag: 'ASAP', timer: '02:59', address: 'Elm St, Springfield — Maple Ave, Seattle', time: '02:59' },
  { id: 'SR9H12R', tag: '2h', timer: '01:45', address: 'Oak Blvd, Portland — Pine Rd, Seattle', time: '01:45' },
  { id: 'SR9K34R', tag: 'Same Day', timer: '05:20', address: 'Cedar Ln, Tacoma — Birch St, Seattle', time: '05:20' },
  { id: 'SR9M56R', tag: 'Scheduled', timer: '12:00', address: 'Maple Dr, Spokane — Elm Ave, Seattle', time: '12:00' },
];

const DeliveryNewTasksScreen = () => {
  const navigation = useNavigation<any>();
  const [isOnline, setIsOnline] = useState(true);
  const [filter, setFilter] = useState<TaskFilter>('Assigned');
  const [declineModalVisible, setDeclineModalVisible] = useState(false);
  const [declineTask, setDeclineTask] = useState<any | null>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);

  React.useEffect(() => {
    fetchTasks();
  }, [filter]);

  const fetchTasks = async () => {
    const tabParam = filter === 'Assigned' ? 'new' : 'completed';
    const data = await GetDriverTasksApi(tabParam, setIsLoadingTasks);
    if (data) {
      setTasks(data);
    }
  };

  const openDrawer = () => navigation.dispatch(DrawerActions.openDrawer());

  const onAccept = async (task: any) => {
    const res = await AcceptOrderApi(task._id, setIsLoadingTasks);
    if (res) {
      navigation.navigate(ScreenNameEnum.DeliveryOrderDetails, {
        order: {
          id: task._id,
          orderNumber: task.orderNumber,
          pickupAddress: task.pickupAddress,
          dropAddress: task.dropAddress,
          recipientName: task.recipientName,
          recipientPhone: task.recipientPhone,
        },
      });
    }
  };

  const onDecline = (task: TaskItem) => {
    setDeclineTask(task);
    setDeclineModalVisible(true);
  };

  const onCloseDeclineModal = () => {
    setDeclineModalVisible(false);
    setDeclineTask(null);
  };

  const onSubmitDecline = async (reasonKey: DeclineReasonKey, reasonLabel: string) => {
    if (declineTask) {
      const res = await DeclineOrderApi(declineTask._id, reasonLabel, setIsLoadingTasks);
      if (res) {
        setDeclineModalVisible(false);
        setDeclineTask(null);
        fetchTasks();
      }
    }
  };

  const getTagStyle = (tag: TaskTag) => {
    if (tag === 'expired') return styles.tagExpired;
    if (tag === 'ASAP') return styles.tagAsap;
    if (tag === '2h') return styles.tag2h;
    if (tag === 'Same Day') return styles.tagSameDay;
    return styles.tagScheduled;
  };

  const getTagLabel = (tag: TaskTag) => {
    if (tag === 'expired') return 'Assignment expired';
    return tag;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBarComponent barStyle="dark-content" backgroundColor="#fff" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          navigation.navigate(ScreenNameEnum.DeliveryProfileScreen);
        }} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
          <Image source={imageIndex.prfile} style={styles.profileIcon} resizeMode="contain" />
        </TouchableOpacity>

        <View style={styles.toggleBlock}>
          <View style={styles.toggleRow}>
            <Text style={[styles.toggleLabel, !isOnline && styles.toggleLabelActive]}>Offline</Text>
            <Switch
              value={isOnline}
              onValueChange={setIsOnline}
              trackColor={{ false: '#E2E8F0', true: color.primary }}
              thumbColor="#fff"
            />
            <Text style={[styles.toggleLabel, isOnline && styles.toggleLabelActive]}>Online</Text>
          </View>
          <Text style={styles.toggleSub}>3/10</Text>
        </View>

        <TouchableOpacity style={styles.bellWrap} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
          <Image source={imageIndex.Notification} style={styles.bellIcon} resizeMode="contain" />
          <View style={styles.bellBadge} />
        </TouchableOpacity>
      </View>

      {/* Assigned / Completed tabs */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterTab, filter === 'Assigned' && styles.filterTabActive]}
          onPress={() => setFilter('Assigned')}
        >
          <Text style={[styles.filterText, filter === 'Assigned' && styles.filterTextActive]}>Assigned</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterTab, filter === 'Completed' && styles.filterTabActive]}
          onPress={() => setFilter('Completed')}
        >
          <Text style={[styles.filterText, filter === 'Completed' && styles.filterTextActive]}>Completed</Text>
        </TouchableOpacity>
      </View>

      {/* Task list */}
      {isLoadingTasks ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={color.primary} />
        </View>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <View key={task._id} style={styles.card}>
                <View style={styles.cardTop}>
                  <View style={styles.idRow}>
                    <View style={styles.greenDot} />
                    <Text style={styles.taskId}>#{task.orderNumber}</Text>
                  </View>
                  <View style={styles.tagScheduled}>
                    <Text style={styles.tagText}>{task.dispatchStatus}</Text>
                  </View>
                </View>
                
                <View style={styles.addressRow}>
                  <Image source={imageIndex.locationpin2} style={styles.pinIcon} resizeMode="contain" />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.addressText} numberOfLines={2}>
                      Pickup: {task.pickupAddress}
                    </Text>
                    <Text style={[styles.addressText, { marginTop: 4 }]} numberOfLines={2}>
                      Drop: {task.dropAddress}
                    </Text>
                  </View>
                </View>

                <View style={styles.actionsRow}>
                  <TouchableOpacity style={styles.acceptBtn} onPress={() => onAccept(task)} activeOpacity={0.85}>
                    <Text style={styles.acceptBtnText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.declineBtn} onPress={() => onDecline(task)} activeOpacity={0.85}>
                    <Text style={styles.declineBtnText}>Decline</Text>
                  </TouchableOpacity>
                  <Text style={styles.cardTime}>
                    {new Date(task.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No {filter.toLowerCase()} tasks yet</Text>
            </View>
          )}
        </ScrollView>
      )}

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
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  profileWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#86EFAC',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  profileIcon: {
    width: 48,
    height: 48,
   },
  toggleBlock: {
    alignItems: 'center',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  toggleLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  toggleLabelActive: {
    color: '#0F172A',
    fontWeight: '600',
  },
  toggleSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
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
  filterRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  filterTabActive: {
    backgroundColor: color.primary,
  },
  filterText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#005287',
  },
  filterTextActive: {
    color: '#fff',
  },
  scroll: { flex: 1 },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  card: {
     backgroundColor: '#fff',
  borderRadius: 14,
  padding: 16,
  marginBottom: 14,
  borderColor: '#E2E8F0',
 
  // iOS shadow
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 6,

  // Android shadow
  elevation: 4,
  },
  cardExpired: {
    opacity: 0.85,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  idRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#22C55E',
  },
  taskId: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  taskIdExpired: {
    color: '#94A3B8',
  },
  tagExpired: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagAsap: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tag2h: {
    backgroundColor: '#FFEDD5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagSameDay: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagScheduled: {
    backgroundColor: '#34C759',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  clockIcon: {
    width: 16,
    height: 16,
    tintColor: color.red,
  },
  timerText: {
    fontSize: 14,
    fontWeight: '600',
    color: color.red,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 14,
  },
  pinIcon: {
    width: 18,
    height: 18,
    tintColor: color.red,
    marginTop: 2,
  },
  addressText: {
    flex: 1,
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
  },
  addressTextExpired: {
    color: '#94A3B8',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  acceptBtn: {
    flex: 1,
    backgroundColor: color.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  acceptBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  declineBtn: {
    flex: 1,
    backgroundColor: color.red,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  declineBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  cardTime: {
    fontSize: 13,
    color: '#64748B',
    marginLeft: 8,
  },
  emptyState: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: '#64748B',
  },
});

export default DeliveryNewTasksScreen;
