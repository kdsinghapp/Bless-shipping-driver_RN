
import { StyleSheet } from 'react-native';
import { hp, wp } from '../../../utils/Constant';
import { color } from '../../../constant';
   
const HEADER_BG = "#035093";
const CARD_BLUE = "#035093";
const GREEN = "#22C55E";
const YELLOW = "#EAB308";
const RED = "#EF4444";
const LIGHT_BLUE_BG = "#E4EDF8";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
 flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: HEADER_BG,
  paddingHorizontal: 15,
   borderBottomLeftRadius: 25,
  borderBottomRightRadius: 25,
  height:100
 
  },
  menuBtn: {
    padding: 4,
  },
  hamburger: {
    width: 24,
    height: 18,
    justifyContent: "space-between",
  },
  hamburgerLine: {
    height: 2,
    backgroundColor: "#fff",
    borderRadius: 1,
  },
  headerCenter: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
     color: "#fff",
     fontWeight:"800"
  },
  headerSubtitle: {
    fontSize: 13,
     color: "#fff",
    marginTop: 4,
  },
  notifBtn: {
    position: "relative",
    padding: 8,
  },
  notifIcon: {
    width: 24,
    height: 24,
    tintColor: "#fff",
  },
  notifBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: RED,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 14,
    padding: 12,
    justifyContent:"center" ,
    alignItems:"center"
  },
  statCardWhite: {
    backgroundColor: "#FFFFFF",

  // iOS shadow
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 6,

  // Android shadow
  elevation: 3,

  borderRadius: 12,
  },
  statLabel: {
    fontSize: 17,
     color: "black",
    marginBottom: 5,
    fontWeight:"500"
  },
  statValue: {
    fontSize: 22,
     fontWeight:"700"
  },
  sectionTitle: {
    fontSize: 16,
     color: "#000",
    marginBottom: 15,
    fontWeight:"700" ,
    marginTop:12

  },
  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: HEADER_BG,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 12,
    gap: 10,
    height:60
  },
  uploadIcon: {
    width: 22,
    height: 22,
    tintColor: "#fff",
  },
  uploadBtnText: {
    fontSize: 17,
     color: "#fff",
     fontWeight:"700"
  },
  alertBox: {
    backgroundColor: LIGHT_BLUE_BG,
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(10, 36, 99, 0.15)",
  },
  alertText: {
    fontSize: 14,
     color: HEADER_BG,
    marginBottom: 2,
  },
  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  viewAllText: {
    fontSize: 14,
     color: GREEN,
  },
  tabs: {
    flexDirection: "row",
    marginBottom: 16,
     bottom:10 ,
     justifyContent:"space-between"
  },
  tab: {
     paddingHorizontal: 28,
    borderRadius: 12,
    backgroundColor: "#EFEFEF",
    borderWidth:1 ,
    justifyContent:"center" ,
    borderColor:"#EFEFEF" ,
    height:50
  },
  tabActive: {
    backgroundColor: "#005287",
        height:55

   },
  tabText: {
    fontSize: 14,
     color: "#005287",
     fontWeight:"600"
  },
  tabTextActive: {
        fontSize: 14,
     fontWeight:"600" 
,

    color: "white",
   },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#eee",
  },
  orderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  orderLeft: {},
  orderId: {
    fontSize: 16,
     color: "#000",
     fontWeight:"600"
  },
  customerName: {
    fontSize: 13,
     color: "#64748B",
    marginTop: 2,
  },
  orderTime: {
    fontSize: 13,
     color: "#64748B",
  },
  orderBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  statusTag: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  statusTagText: {
    fontSize: 12,
     color: "#fff",
     fontWeight:"600"
  },
  viewBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
  },
  viewBtnText: {
    fontSize: 13,
     color: "#374151",
  },
  emptyOrders: {
    fontSize: 14,
     color: "#94A3B8",
    textAlign: "center",
    marginTop: 20,
  },

});
export default styles;
