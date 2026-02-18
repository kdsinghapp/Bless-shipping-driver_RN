import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import ScreenNameEnum from '../../../routes/screenName.enum';
import imageIndex from '../../../assets/imageIndex';
import styles from './style';

const HEADER_BG = '#035093';
const GREEN = '#22C55E';

const TASKS = [
  { key: 'receive', label: 'Receive order', icon: '📦', done: true },
  { key: 'transit', label: 'Order in transit', icon: '🚚', done: true },
  { key: 'delivered', label: 'Delivered', icon: '✅', done: false },
  { key: 'canceled', label: 'Canceled', icon: '❌', done: false },
];

const DeliveryDashboard = () => {
  const navigation = useNavigation<any>();

  const openDrawer = () => navigation.dispatch(DrawerActions.openDrawer());

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBarComponent barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer} style={styles.menuBtn} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
          <Image source={imageIndex.menus} style={styles.menuIcon} resizeMode="contain" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Home</Text>
          <Text style={styles.headerSubtitle}>Delivery Agent</Text>
        </View>
        <View style={styles.avatarWrap}>
          <Text style={styles.avatarText}>DA</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.profileRow}>
            <Text style={styles.idText}>ID: DRV-001</Text>
            <View style={styles.statusTag}>
              <Text style={styles.statusText}>Active</Text>
            </View>
          </View>
          <View style={styles.balanceRow}>
            <View>
              <Text style={styles.balanceLabel}>Balance</Text>
              <Text style={styles.balanceValue}>₦0.00</Text>
            </View>
            <View>
              <Text style={styles.balanceLabel}>Commission</Text>
              <Text style={styles.balanceValue}>₦0.00</Text>
            </View>
            <View>
              <Text style={styles.balanceLabel}>Total orders</Text>
              <Text style={styles.balanceValue}>0</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Your tasks</Text>
        <View style={styles.tasksRow}>
          {TASKS.map((t) => (
            <View key={t.key} style={styles.taskItem}>
              <View style={[styles.taskCircle, t.done && styles.taskCircleDone]}>
                <Text style={styles.taskIcon}>{t.icon}</Text>
              </View>
              <Text style={styles.taskLabel} numberOfLines={2}>{t.label}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.getStartedBtn}
          activeOpacity={0.85}
          onPress={() => navigation.navigate(ScreenNameEnum.DeliveryOrdersList)}
        >
          <Text style={styles.getStartedText}>GET STARTED</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeliveryDashboard;
