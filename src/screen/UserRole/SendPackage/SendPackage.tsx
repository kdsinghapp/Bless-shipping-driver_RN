import React from "react";
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

const OPTION_CARDS = [
  {
    id: "instant",
    label: "Instant",
    description: "Door-to-Door delivery",
    timeText: "30-80 min",
    price: "from $15.00",
    icon: imageIndex.trck,
    screen: ScreenNameEnum.InstantDelivery,
  },
  {
    id: "4hour",
    label: "4 Hour",
    description: "Station or door delivery",
    timeText: "Within 4 hours",
    price: "from $10.00",
    icon: imageIndex.time,
    screen: undefined,
  },
  {
    id: "24hour",
    label: "24 Hour",
    description: "Station or door delivery",
    timeText: "Within 24 hours",
    price: "from $8.00",
    icon: imageIndex.Calblack,
    screen: undefined,
  },
  {
    id: "48hour",
    label: "48 Hour",
    description: "Station or door delivery",
    timeText: "Within 2 days",
    price: "from $6.00",
    icon: imageIndex.document,
    screen: undefined,
  },
  {
    id: "72hour",
    label: "72 Hour",
    description: "Station or door delivery",
    timeText: "Within 3 days",
    price: "from $5.00",
    icon: imageIndex.trck,
    screen: undefined,
  },
  {
    id: "5day",
    label: "5-Day",
    description: "Station or door delivery",
    timeText: "Within 5 days",
    price: "from $4.00",
    icon: imageIndex.locationpin,
    screen: undefined,
  },
  {
    id: "scheduled",
    label: "Scheduled Route",
    description: "Station pickup only",
    timeText: "Specific day delivery",
    price: "from $3.00",
    icon: imageIndex.Calblack,
    screen: undefined,
  },
];

const SendPackage = ({ navigation }: any) => {
  const onCardPress = (item: (typeof OPTION_CARDS)[0]) => {
    // if (item.screen) {
      navigation.navigate(ScreenNameEnum.InstantDelivery);
      // navigation.navigate(item.screen);
    // }
    // Other cards can be wired later
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBarComponent backgroundColor={HEADER_BG} barStyle="light-content" />
      <CustomHeader label="Send a Package" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {OPTION_CARDS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => onCardPress(item)}
            activeOpacity={0.85}
          >
            <Image
              source={item.icon}
              style={[styles.cardIcon, styles.cardIconBlue]}
              resizeMode="contain"
            />
            <View style={styles.cardTextWrap}>
              <Text style={styles.cardLabel}>{item.label}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
              <View style={styles.cardDetailsRow}>
                <Image
                  source={imageIndex.time}
                  style={styles.detailIcon}
                  tintColor={"black"}
                  resizeMode="contain"
                />
                <Text style={styles.cardDetailText}>{item.timeText}</Text>
                <Image
                  source={imageIndex.qolor}
                  style={[styles.detailIcon, styles.detailIconMargin]}
                  resizeMode="contain"
                />
                <Text style={styles.cardDetailText}>{item.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
     borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },
  cardIcon: {
    width: 28,
    height: 28,
    marginRight: 14,
  },
  cardIconBlue: {
    tintColor: CARD_BLUE,
  },
  cardTextWrap: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  cardDescription: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },
  cardDetailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  detailIcon: {
    width: 14,
    height: 14,
    tintColor: "#035093",
  },
  detailIconMargin: {
    marginLeft: 12,
  },
  cardDetailText: {
    fontSize: 12,
    color: "#64748B",
    marginLeft: 4,
  },
});

export default SendPackage;
