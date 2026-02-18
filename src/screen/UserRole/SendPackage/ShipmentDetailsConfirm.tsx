import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import CustomHeader from "../../../compoent/CustomHeader";
import ScreenNameEnum from "../../../routes/screenName.enum";

const HEADER_BG = "#035093";
const CARD_BLUE = "#035093";

const ShipmentDetailsRecipients = ({ navigation, route }: any) => {
  const [recipientName, setRecipientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [saveRecipient, setSaveRecipient] = useState(true);
  const params = route?.params || {};

  const onContinueToPayment = () => {
    navigation.navigate(ScreenNameEnum.UserPricingBreakdown);
  };

  const onChooseSavedRecipients = () => {
    // Navigate to saved recipients picker or show modal
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
        <Text style={styles.label}>Recipient Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter recipient name"
          placeholderTextColor="#94A3B8"
          value={recipientName}
          onChangeText={setRecipientName}
        />

        <Text style={[styles.label, styles.labelSpacing]}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="+1 (234) 567-8900"
          placeholderTextColor="#94A3B8"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

        <View style={styles.saveRow}>
          <View style={styles.saveRowLeft}>
            <Text style={styles.saveLabel}>Save Recipient</Text>
            <Text style={styles.saveSubtext}>Save for future orders</Text>
          </View>
          <Switch
            value={saveRecipient}
            onValueChange={setSaveRecipient}
            trackColor={{ false: "#E2E8F0", true: CARD_BLUE }}
            thumbColor="#fff"
          />
        </View>

        <TouchableOpacity
          style={styles.savedLink}
          onPress={onChooseSavedRecipients}
          activeOpacity={0.7}
        >
          <Text style={styles.savedLinkText}>Choose from saved recipients</Text>
        </TouchableOpacity>

        <View style={{ height: 120 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={onContinueToPayment}
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
  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
  },
  labelSpacing: {
    marginTop: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#0F172A",
  },
  saveRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
  },
  saveRowLeft: {
    flex: 1,
  },
  saveLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },
  saveSubtext: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },
  savedLink: {
    alignSelf: "center",
    marginTop: 20,
    paddingVertical: 8,
  },
  savedLinkText: {
    fontSize: 15,
    fontWeight: "600",
    color: CARD_BLUE,
    textDecorationLine: "underline",
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
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  continueBtn: {
    backgroundColor: CARD_BLUE,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  continueBtnText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#fff",
  },
});

export default ShipmentDetailsRecipients;
