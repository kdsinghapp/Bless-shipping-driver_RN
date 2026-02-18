import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../compoent/CustomHeader';
import type { InvoiceItem } from './InvoicesScreen';

const HEADER_BG = '#035093';
const BLUE = '#035093';

type RouteParams = { invoice?: InvoiceItem };

const DEFAULT_INVOICE: InvoiceItem = {
  id: 'BSL-2026-001',
  dateRange: 'Jan 01 - Jan 31, 2026',
  status: 'Paid',
  issuedDate: 'February 1st, 2026',
  paidDate: 'February 5th, 2026',
  orders: 45,
  subtotal: '$427.50',
  tax: '$38.48',
  total: '$465.98',
};

const SAMPLE_ORDERS = [
  { orderId: 'ORD-001', serviceLevel: 'Standard', deliveryFee: '$8.50' },
  { orderId: 'ORD-005', serviceLevel: 'Standard', deliveryFee: '$8.50' },
  { orderId: 'ORD-007', serviceLevel: 'Standard', deliveryFee: '$8.50' },
];

const InvoiceDetailsScreen = () => {
  const route = useRoute();
  const params = (route.params || {}) as RouteParams;
  const invoice = params.invoice || DEFAULT_INVOICE;
  const moreOrdersCount = Math.max(0, invoice.orders - SAMPLE_ORDERS.length);

  const onDownload = () => {
    Alert.alert('Download', 'Invoice download will be available soon.');
  };

  const statusBadgeColor = invoice.status === 'Paid' ? '#22C55E' : '#0EA5E9';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBarComponent backgroundColor={HEADER_BG} />
      <CustomHeader
        label="Invoices details"
        rightComponent={
          <View style={[styles.headerStatusBadge, { backgroundColor: statusBadgeColor }]}>
            <Text style={styles.headerStatusText}>{invoice.status}</Text>
          </View>
        }
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Invoice ID row + Download */}
        <View style={styles.idRow}>
          <View>
            <Text style={styles.invoiceId}>{invoice.id}</Text>
            <Text style={styles.dateRange}>{invoice.dateRange}</Text>
          </View>
          <TouchableOpacity style={styles.downloadBtn} onPress={onDownload} activeOpacity={0.8}>
            <Text style={styles.downloadBtnText}>Download</Text>
          </TouchableOpacity>
        </View>

        {/* Main invoice card */}
        <View style={styles.card}>
          {/* Card header: INVOICE + company */}
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.invoiceTitle}>INVOICE</Text>
              <Text style={styles.invoiceIdCard}>{invoice.id}</Text>
            </View>
            <View style={styles.companyBlock}>
              <Text style={styles.companyName}>Bless Shipping</Text>
              <Text style={styles.companyLine}>123 Shipping Lane</Text>
              <Text style={styles.companyLine}>New York, NY 10001</Text>
              <Text style={styles.companyLine}>contact@blessshipping.com</Text>
            </View>
          </View>

          {/* Bill To */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bill To:</Text>
            {/* Optional: add bill name/address when available */}
          </View>

          {/* Order Details - dates */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Details</Text>
            <Text style={styles.detailRow}>Invoice Date: {invoice.issuedDate}</Text>
            <Text style={styles.detailRow}>Billing Period: {invoice.dateRange}</Text>
            <Text style={styles.detailRow}>Paid Date: {invoice.paidDate}</Text>
          </View>

          {/* Orders table */}
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, styles.tableHeaderText, styles.colOrderId]}>Order ID</Text>
              <Text style={[styles.tableCell, styles.tableHeaderText, styles.colService]}>Service Level</Text>
              <Text style={[styles.tableCell, styles.tableHeaderText, styles.colFee]}>Delivery Fee</Text>
            </View>
            {SAMPLE_ORDERS.map((row, i) => (
              <View key={i} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.colOrderId]}>{row.orderId}</Text>
                <Text style={[styles.tableCell, styles.colService]}>{row.serviceLevel}</Text>
                <Text style={[styles.tableCell, styles.colFee]}>{row.deliveryFee}</Text>
              </View>
            ))}
          </View>
          {moreOrdersCount > 0 && (
            <Text style={styles.moreOrders}>... and {moreOrdersCount} more orders</Text>
          )}

          {/* Totals */}
          <View style={styles.totals}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal ({invoice.orders} orders):</Text>
              <Text style={styles.totalValue}>{invoice.subtotal}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tax (9%):</Text>
              <Text style={styles.totalValue}>{invoice.tax}</Text>
            </View>
            <View style={[styles.totalRow, styles.totalRowMain]}>
              <Text style={styles.totalLabelMain}>Total:</Text>
              <Text style={styles.totalValueMain}>{invoice.total}</Text>
            </View>
          </View>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { flex: 1 },
  scrollContent: { padding: 20, paddingTop: 16 },
  idRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  invoiceId: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
  dateRange: { fontSize: 14, color: '#64748B', marginTop: 4 },
  downloadBtn: {
    backgroundColor: BLUE,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    
  },
  downloadBtnText: { fontSize: 14, fontWeight: '600', color: '#fff' },
  headerStatusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    width:100
     
  },
  headerStatusText: { fontSize: 14, 
    textAlign:"center",
   
    fontWeight: '600', color: '#fff' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
      android: { elevation: 3 },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  invoiceTitle: { fontSize: 14, fontWeight: '700', color: BLUE, letterSpacing: 0.5 },
  invoiceIdCard: { fontSize: 14, color: '#0F172A', marginTop: 4 },
  companyBlock: { alignItems: 'flex-end' },
  companyName: { fontSize: 14, fontWeight: '600', color: '#0F172A' },
  companyLine: { fontSize: 13, color: '#64748B', marginTop: 2 },
  section: { marginBottom: 16 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  detailRow: { fontSize: 14, color: '#475569', marginBottom: 4 },
  table: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tableHeaderText: { fontWeight: '700', color: '#475569', fontSize: 13 },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  tableCell: { fontSize: 14, color: '#0F172A' },
  colOrderId: { flex: 1.2 },
  colService: { flex: 1 },
  colFee: { flex: 0.8 },
  moreOrders: { fontSize: 13, color: '#94A3B8', marginBottom: 16 },
  totals: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalRowMain: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    marginBottom: 0,
  },
  totalLabel: { fontSize: 14, color: '#64748B' },
  totalValue: { fontSize: 14, color: '#0F172A' },
  totalLabelMain: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  totalValueMain: { fontSize: 18, fontWeight: '700', color: BLUE },
});

export default InvoiceDetailsScreen;
