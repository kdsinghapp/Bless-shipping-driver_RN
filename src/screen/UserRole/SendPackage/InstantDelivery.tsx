import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import ScreenNameEnum from "../../../routes/screenName.enum";
import imageIndex from "../../../assets/imageIndex";

const CARD_BLUE = "#035093";
const LIGHT_BLUE = "#E0F2FE";

const InstantDelivery = ({ navigation }: any) => {
  const [pickupAddress, setPickupAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const nav = useNavigation();

  const onContinue = () => {
    navigation.navigate(ScreenNameEnum.ShipmentDetailsPackage, {
      pickupAddress,
      deliveryAddress,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBarComponent backgroundColor="#fff" barStyle="dark-content" />

      {/* Header: white bg, gray back, black title */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => nav.goBack()}
          style={styles.backWrap}
          activeOpacity={0.8}
        >
          <Image
            source={imageIndex.back}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Instant Delivery</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Instant service card */}
        <View style={styles.instantCard}>
          <Image
            source={imageIndex.trck}
            style={styles.instantIcon}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.instantLabel}>Instant</Text>
            <Text style={styles.instantSubtext}>30-60 min</Text>
          </View>
        </View>

        <Text style={styles.inputLabel}>Pickup Address*</Text>
        <View style={styles.inputWrap}>
          <Image
            source={imageIndex.locationpin}
            style={styles.inputPin}
            resizeMode="contain"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter pickup address"
            placeholderTextColor="#94A3B8"
            value={pickupAddress}
            onChangeText={setPickupAddress}
          />
        </View>

        <Text style={styles.inputLabel}>Pickup Address*</Text>
        <View style={styles.inputWrap}>
          <Image
            source={imageIndex.locationpin}
            style={styles.inputPin}
            resizeMode="contain"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter delivery address"
            placeholderTextColor="#94A3B8"
            value={deliveryAddress}
            onChangeText={setDeliveryAddress}
          />
        </View>

        <View style={styles.estimatedWrap}>
          <Image
            source={imageIndex.time}
            style={styles.estimatedIcon}
            resizeMode="contain"
          />
          <View style={styles.estimatedTextWrap}>
            <Text style={styles.estimatedLabel}>Estimated Delivery</Text>
            <Text style={styles.estimatedValue}>30-60 min</Text>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={onContinue}
          activeOpacity={0.9}
        >
          <Text style={styles.continueBtnText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  backWrap: {
 
  },
  backIcon: {
    width: 45,
    height: 45,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
  },
  scroll: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  instantCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CARD_BLUE,
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
  },
  instantIcon: {
    width: 32,
    height: 32,
    tintColor: "#fff",
    marginRight: 12,
  },
  instantLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  instantSubtext: {
    fontSize: 13,
    color: "rgba(255,255,255,0.9)",
    marginTop: 2,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
 height:55,
    borderColor: "#E2E8F0",
    paddingHorizontal: 12,
    marginBottom: 16,
     // Shadow (iOS)
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 6,

  // Elevation (Android)
  elevation: 4,
  },
  inputPin: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor:"#035093"
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: "#0F172A",
  },
  estimatedWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: LIGHT_BLUE,
    borderRadius: 12,
    padding: 14,
  },
  estimatedIcon: {
    width: 22,
    height: 22,
    marginRight: 12,
    tintColor: "#0369A1",
  },
  estimatedTextWrap: {
    flex: 1,
  },
  estimatedLabel: {
    fontSize: 14,
    color: "#0369A1",
    fontWeight: "600",
  },
  estimatedValue: {
    fontSize: 14,
    color: "#0F172A",
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

export default InstantDelivery;
