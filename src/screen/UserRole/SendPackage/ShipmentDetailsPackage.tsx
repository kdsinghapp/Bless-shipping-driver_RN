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
const CARD_GREEN = "#059669";

const SIZES = [
  { id: "small", label: "Small", desc: "Up to 3 kg, fits in hand", price: "1x price", titleColor: CARD_BLUE },
  { id: "medium", label: "Medium", desc: "3-5 kg, box size", price: "1.5x price", titleColor: CARD_GREEN },
  { id: "large", label: "Large", desc: "5-10 kg, large box", price: "2x price", titleColor: CARD_BLUE },
  { id: "xl", label: "Extra Large", desc: "10-20 kg, very large", price: "3x price", titleColor: CARD_GREEN },
];

const ShipmentDetailsPackage = ({ navigation, route }: any) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const params = route?.params || {};
  const nav = useNavigation();

  const onContinue = () => {
    navigation.navigate(ScreenNameEnum.ShipmentDetailsRecipients, {
      ...params,
      packageSize: selectedSize,
      category,
      description: notes,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBarComponent backgroundColor="#fff" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => nav.goBack()} style={styles.backWrap} activeOpacity={0.8}>
          <Image source={imageIndex.BackLeft} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shipment Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.sectionLabel}>Item Category</Text>
        <TouchableOpacity style={styles.dropdown} activeOpacity={0.8}>
          <Text style={category ? styles.dropdownText : styles.dropdownPlaceholder}>
            {category || "Select category"}
          </Text>
          <Image source={imageIndex.arrowqdown} style={styles.dropdownChevron} resizeMode="contain" />
        </TouchableOpacity>

        <Text style={styles.sectionLabel}>Package Size</Text>
        <View style={styles.sizeGrid}>
          {SIZES.map((s) => (
            <TouchableOpacity
              key={s.id}
              style={[styles.sizeCard, selectedSize === s.id && styles.sizeCardSelected]}
              onPress={() => setSelectedSize(s.id)}
              activeOpacity={0.85}
            >
              <Text style={[styles.sizeLabel, { color: s.titleColor }]}>{s.label}</Text>
              <Text style={styles.sizeDesc}>{s.desc}</Text>
              <Text style={styles.sizePrice}>{s.price}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionLabel}>Optional Note</Text>
        <TextInput
          style={styles.notesInput}
          placeholder="Add special instructions or notes..."
          placeholderTextColor="#94A3B8"
          value={notes}
          onChangeText={setNotes}
          multiline
          textAlignVertical="top"
        />

        <View style={{ height: 120 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueBtn} onPress={onContinue} activeOpacity={0.9}>
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
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
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 10,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 12,
     borderColor: "#E2E8F0",
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 24,
    // Shadow (iOS)
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 6,

  // Elevation (Android)
  elevation: 4,
  },
  dropdownPlaceholder: {
    fontSize: 15,
    color: "#94A3B8",
  },
  dropdownText: {
    fontSize: 15,
    color: "#0F172A",
  },
  dropdownChevron: {
    width: 20,
    height: 20,
    tintColor: "#64748B",
  },
  sizeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  sizeCard: {
    width: "48%",
    marginBottom: 14,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
  // Shadow (iOS)
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 6,

  // Elevation (Android)
  elevation: 4,
  },
  sizeCardSelected: {
    borderColor: CARD_BLUE,
    borderWidth: 2,
    backgroundColor: "#F8FAFC",
  },
  sizeLabel: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  sizeDesc: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 6,
  },
  sizePrice: {
    fontSize: 13,
    color: "#64748B",
  },
  notesInput: {
    backgroundColor: "#fff",
    borderRadius: 12,
     borderColor: "#E2E8F0",
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    color: "#0F172A",
    minHeight: 88,
 // Shadow (iOS)
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 6,

  // Elevation (Android)
  elevation: 4,
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

export default ShipmentDetailsPackage;
