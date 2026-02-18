import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  Pressable,TouchableOpacity
} from "react-native";
 import { DrawerActions } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import imageIndex from "../../../assets/imageIndex";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import useDashboard from "./useDashboard";
import ScreenNameEnum from "../../../routes/screenName.enum";
import { STATUS, STATUS_LABELS } from "../../../utils/Constant";
import LoadingModal from "../../../utils/Loader";
import styles from "./style";

 const CARD_BLUE = "#035093";
const GREEN = "#22C55E";
const YELLOW = "#EAB308";
const RED = "#EF4444";
const LIGHT_BLUE_BG = "#EFF6FF";

const MerchantDashboard = () => {
  const { navigation, isLoading, orderData } = useDashboard();
  const nav = navigation as any;

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  const [dateFilter, setDateFilter] = useState<"today" | "tomorrow" | "scheduled">("today");

  const stats = useMemo(() => {
    const total = orderData?.length || 0;
    const delivered = orderData?.filter(
      (o: any) =>
        o.deliveryStatus === STATUS.DELIVERED || o.deliveryStatus === STATUS.COMPLETED
    ).length || 0;
    const inTransit = orderData?.filter(
      (o: any) =>
        o.deliveryStatus === STATUS.ON_THE_WAY ||
        o.deliveryStatus === STATUS.PICKED_UP ||
        o.deliveryStatus === STATUS.GOING_TO_PICKUP ||
        o.deliveryStatus === STATUS.ASSIGNED ||
        o.deliveryStatus === STATUS.ARRIVING
    ).length || 0;
    const failed = orderData?.filter(
      (o: any) => o.deliveryStatus === STATUS.CANCELLED
    ).length || 0;
    return { total, delivered, inTransit, failed };
  }, [orderData]);

  const filteredOrders = useMemo(() => {
    if (!orderData?.length) return [];
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);
    const tomorrowEnd = new Date(todayEnd.getTime() + 24 * 60 * 60 * 1000);

    return orderData.filter((item: any) => {
      const created = item.createdAt ? new Date(item.createdAt) : new Date();
      if (dateFilter === "today")
        return created >= todayStart && created < todayEnd;
      if (dateFilter === "tomorrow")
        return created >= todayEnd && created < tomorrowEnd;
      return created >= tomorrowEnd;
    });
  }, [orderData, dateFilter]);

  const getStatusLabel = (status: string) => {
    if (status === STATUS.DELIVERED || status === STATUS.COMPLETED) return "Delivered";
    if (
      status === STATUS.ON_THE_WAY ||
      status === STATUS.PICKED_UP ||
      status === STATUS.ASSIGNED ||
      status === STATUS.GOING_TO_PICKUP ||
      status === STATUS.ARRIVING
    )
      return "Transit";
    return STATUS_LABELS[status] || status;
  };

  // Order card status tag colors (match design: Transit = dark blue, Delivered = green, Failed = red)
  const getStatusColor = (status: string) => {
    if (status === STATUS.DELIVERED || status === STATUS.COMPLETED) return GREEN;
    if (
      status === STATUS.ON_THE_WAY ||
      status === STATUS.PICKED_UP ||
      status === STATUS.ASSIGNED ||
      status === STATUS.GOING_TO_PICKUP ||
      status === STATUS.ARRIVING
    )
      return CARD_BLUE; // #035093 dark blue for Transit tag per design
    if (status === STATUS.CANCELLED) return RED;
    return CARD_BLUE;
  };

  const formatTime = (dateStr: string) => {
    if (!dateStr) return "--:--";
    const d = new Date(dateStr);
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const renderOrderItem = ({ item }: { item: any }) => {
    const statusLabel = getStatusLabel(item.deliveryStatus);
    const statusColor = getStatusColor(item.deliveryStatus);
    const customerName =
      item.receiverName || item.toCity || item.receiver?.name || "Customer";

    return (
      <View style={styles.orderCard}>
        <View style={styles.orderRow}>
          <View style={styles.orderLeft}>
            <Text style={styles.orderId}>
              Order #{item.trackingId || item.id?.slice(-4) || "---"}
              {/* Order #{item.trackingId || item.id?.slice(-4) || "---"} */}
            </Text>
            <Text style={styles.customerName}>{customerName}</Text>
          </View>
          <Text style={styles.orderTime}>{formatTime(item.createdAt)}</Text>
        </View>
        <View style={styles.orderBottom}>
          <View style={[styles.statusTag, { backgroundColor: statusColor }]}>
            <Text style={styles.statusTagText}>{statusLabel}</Text>
          </View>
          <TouchableOpacity
            style={styles.viewBtn}
            onPress={() =>
              nav.navigate(ScreenNameEnum.ViewDetails, { item })
            }
          >
            <Text style={styles.viewBtnText}>View</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBarComponent backgroundColor="red" />
    <LoadingModal visible={isLoading} /> 

      {/* Header - Merchant Portal */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuBtn}
          onPress={openDrawer}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <View style={styles.hamburger}>
           <Image source={imageIndex.menus} 
           style={{
            height:22,
            width:22
           }}
           />
          </View>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Merchant Portal</Text>
          <Text style={styles.headerSubtitle}>Store #1042-Downtown</Text>
        </View>
        <TouchableOpacity
          style={styles.notifBtn}
          onPress={() => nav.navigate(ScreenNameEnum.NotificationsScreen)}
        >
          <Image
            source={imageIndex.Notification}
            style={styles.notifIcon}
            resizeMode="contain"
          />
          <View style={styles.notifBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={undefined}
      >
        {/* Stats Cards */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, styles.statCardWhite]}>
            <Text style={styles.statLabel}>Total</Text>
            <Text style={[styles.statValue, { color: CARD_BLUE }]}>
           0
              {/* {String(stats.total).padStart(2, "0")} */}
            </Text>
          </View>
          <View style={[styles.statCard, styles.statCardWhite]}>
            <Text style={styles.statLabel}>Delivered</Text>
            <Text style={[styles.statValue, { color: GREEN }]}>
              {/* {String(stats.delivered).padStart(2, "0")} */}
                    0
            </Text>
          </View>
        </View>
        <View style={styles.statsRow}>
          <View style={[styles.statCard, styles.statCardWhite]}>
            <Text style={styles.statLabel}>In Transit</Text>
            <Text style={[styles.statValue, { color: YELLOW }]}>
                  0
              {/* {String(stats.inTransit).padStart(2, "0")} */}
            </Text>
          </View>
          <View style={[styles.statCard, styles.statCardWhite]}>
            <Text style={styles.statLabel}>Failed</Text>
            <Text style={[styles.statValue, { color: RED }]}>
              {/* {String(stats.failed).padStart(2, "0")} */}
                  0
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={() => nav.navigate(ScreenNameEnum.UploadOrders)}
          activeOpacity={0.85}
        >
          <Image
            source={imageIndex.document}
            style={styles.uploadIcon}
            resizeMode="contain"
          />
          <Text style={styles.uploadBtnText}>Upload Orders</Text>
        </TouchableOpacity>
        <View style={styles.alertBox}>
          <Text style={styles.alertText}>
            <Text style={{
              color: "#035093",
              fontWeight: "700"
            }}>Heads up! 3</Text>
            <Text style={{
              color: "#035093",
            }}> orders scheduled for</Text>
            <Text style={{
              color: "#035093",
              fontWeight: "700"
            }}>Tomorrow</Text>

          </Text>
          <Text style={styles.alertText}>1 pickup location
            <Text style={{
              color: "red",
            }}> at full capacity</Text>

          </Text>
        </View>

        {/* Recent Orders */}
        <View style={styles.recentHeader}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <TouchableOpacity
            onPress={() => nav.navigate(ScreenNameEnum.ViewOrders)}
          >
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
 
          <View style={styles.tabs}>
          {(
            [
              { key: "today", label: "Today" },
              { key: "tomorrow", label: "Tomorrow" },
              { key: "scheduled", label: "Scheduled" },
            ] as const
          ).map(({ key, label }) => (
            <Pressable
              key={key}
              style={[styles.tab, dateFilter === key && styles.tabActive]}
              onPress={() => setDateFilter(key)}
            >
              <Text
                style={[
                  styles.tabText,
                  dateFilter === key && styles.tabTextActive,
                ]}
              >
                {label}
              </Text>
            </Pressable>
          ))}
        </View>
      
        
        <FlatList
          data={[]}
          // data={filteredOrders}
          keyExtractor={(item) => item.id || String(Math.random())}
          renderItem={renderOrderItem}
          scrollEnabled={false}
          ListEmptyComponent={
            <Text style={styles.emptyOrders}>No orders for this period</Text>
          }
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        />
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MerchantDashboard;
