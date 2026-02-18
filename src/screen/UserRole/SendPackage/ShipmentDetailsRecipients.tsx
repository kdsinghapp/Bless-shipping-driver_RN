import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import CustomHeader from "../../../compoent/CustomHeader";
import ScreenNameEnum from "../../../routes/screenName.enum";
import imageIndex from "../../../assets/imageIndex";

const HEADER_BG = "#035093";
const CARD_BLUE = "#035093";
const RED = "#EF4444";

const DEFAULT_RECIPIENTS = [
  { id: "1", name: "Angela Henderson" },
  { id: "2", name: "Mark Callaghan" },
];

const ShipmentDetailsRecipients = ({ navigation, route }: any) => {
  const [recipients, setRecipients] = useState(DEFAULT_RECIPIENTS);
  const params = route?.params || {};

  const removeRecipient = (id: string) => {
    setRecipients((prev) => prev.filter((r) => r.id !== id));
  };

  const addMore = () => {
    setRecipients((prev) => [
      ...prev,
      { id: String(Date.now()), name: "New Recipient" },
    ]);
  };

  const onSendAndContinue = () => {
    navigation.navigate(ScreenNameEnum.ShipmentDetailsConfirm, {
      ...params,
      recipients,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBarComponent backgroundColor={HEADER_BG} barStyle="light-content" />
      <CustomHeader label="Shipment Details" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionLabel}>Recipients</Text>
        {recipients.map((r) => (
          <View key={r.id} style={styles.recipientRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {r.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </Text>
            </View>
            <Text style={styles.recipientName}>{r.name}</Text>
            <TouchableOpacity
              onPress={() => removeRecipient(r.id)}
              style={styles.removeBtn}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Image
                source={imageIndex.delite}
                style={styles.removeIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.addMoreBtn} onPress={addMore}>
          <Text style={styles.addMoreText}>Or enter new recipient</Text>
        </TouchableOpacity>

        <View style={{ height: 120 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={onSendAndContinue}
          activeOpacity={0.9}
        >
          <Text style={styles.continueBtnText}>Continue to Payment</Text>
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
  sectionLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 14,
  },
  recipientRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
      // Shadow (iOS)
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 6,

  // Elevation (Android)
  elevation: 4,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: CARD_BLUE,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },
  recipientName: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
  },
  removeBtn: {
    padding: 4,
  },
  removeIcon: {
    width: 20,
    height: 20,
    tintColor: RED,
  },
  addMoreBtn: {
    marginTop: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  addMoreText: {
    fontSize: 15,
    fontWeight: "600",
    color: CARD_BLUE,
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
  continueBtn: {
    backgroundColor: CARD_BLUE,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  continueBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});

export default ShipmentDetailsRecipients;
