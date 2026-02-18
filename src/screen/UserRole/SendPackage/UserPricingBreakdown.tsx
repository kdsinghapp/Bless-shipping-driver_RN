import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import CustomHeader from "../../../compoent/CustomHeader";
import ScreenNameEnum from "../../../routes/screenName.enum";

const HEADER_BG = "#035093";
const CARD_BLUE = "#035093";

const ROWS = [
  { label: "Base Price (Instant)", value: 120.0 },
  { label: "Size Multiplier (medium)", value: 15.0 },
  { label: "Door-to-Door Surcharge", value: 85.5 },
  { label: "Subtotal", value: 22.05 },
  { label: "Tax (10%)", value: 20.0 },
];
const TOTAL = 262.55;

const UserPricingBreakdown = ({ navigation }: any) => {
  const onCompleteOrder = () => {
    navigation.navigate(ScreenNameEnum.UserRoleDashBoard);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBarComponent backgroundColor={HEADER_BG} barStyle="light-content" />
      <CustomHeader label="Pricing & Payment" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{
          marginBottom:18,
          fontSize:18,
          fontWeight:"600"
        }}>Price Breakdown</Text>
        <View style={styles.card}>
          {ROWS.map((row) => (
            <View key={row.label} style={styles.row}>
              <Text style={styles.rowLabel}>{row.label}</Text>
              <Text style={styles.rowValue}>${row.value.toFixed(2)}</Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${TOTAL.toFixed(2)}</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Payment Method</Text>
        <View style={styles.paymentCard}>
          <Text style={styles.paymentText}>Visa</Text>
          <Text style={styles.paymentSub}>•••• 4242</Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.completeBtn}
          onPress={onCompleteOrder}
          activeOpacity={0.9}
        >
          <Text style={styles.completeBtnText}>
            Complete Order - ${TOTAL.toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HEADER_BG,
  },
  scroll: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  // Shadow (iOS)
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 6,

  // Elevation (Android)
  elevation: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
 // Shadow (iOS)
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 6,

  // Elevation (Android)
  elevation: 4,
  },
  rowLabel: {
    fontSize: 15,
    color: "#475569",
  },
  rowValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "800",
    color: CARD_BLUE,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 10,
  },
  paymentCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 14,
  // Shadow (iOS)
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 6,

  // Elevation (Android)
  elevation: 4,
  },
  paymentText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
  },
  paymentSub: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 28,
    paddingTop: 12,
    backgroundColor: "#fff",
 
  },
  completeBtn: {
    backgroundColor: CARD_BLUE,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  completeBtnText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#fff",
  },
});

export default UserPricingBreakdown;
