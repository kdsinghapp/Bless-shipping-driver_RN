import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import DrawerHeader from '../../../compoent/DrawerHeader';
import ScreenNameEnum from '../../../routes/screenName.enum';
import imageIndex from '../../../assets/imageIndex';

const HEADER_BG = '#035093';
const BLUE = '#035093';
const GREEN = '#22C55E';
const OUTSTANDING_COLOR = '#EAB308';

export type InvoiceStatus = 'Paid' | 'Issued';

export type InvoiceItem = {
  id: string;
  dateRange: string;
  status: InvoiceStatus;
  issuedDate: string;
  paidDate: string;
  orders: number;
  subtotal: string;
  tax: string;
  total: string;
};

const MOCK_INVOICES: InvoiceItem[] = [
  {
    id: 'BSL-2026-001',
    dateRange: 'Jan 01 - Jan 31, 2026',
    status: 'Paid',
    issuedDate: 'February 1st, 2026',
    paidDate: 'February 5th, 2026',
    orders: 45,
    subtotal: '$427.50',
    tax: '$38.48',
    total: '$465.98',
  },
  {
    id: 'BSL-2026-002',
    dateRange: 'Jan 01 - Jan 31, 2026',
    status: 'Paid',
    issuedDate: 'February 1st, 2026',
    paidDate: 'February 5th, 2026',
    orders: 32,
    subtotal: '$312.00',
    tax: '$28.08',
    total: '$340.08',
  },
  {
    id: 'BSL-2026-003',
    dateRange: 'Feb 01 - Feb 28, 2026',
    status: 'Issued',
    issuedDate: 'February 1st, 2026',
    paidDate: 'February 5th, 2028',
    orders: 28,
    subtotal: '$265.00',
    tax: '$23.85',
    total: '$288.85',
  },
  {
    id: 'BSL-2026-004',
    dateRange: 'Feb 01 - Feb 28, 2026',
    status: 'Issued',
    issuedDate: 'February 1st, 2026',
    paidDate: '—',
    orders: 15,
    subtotal: '$135.16',
    tax: '$12.16',
    total: '$147.32',
  },
];

const InvoicesScreen = ({ navigation }: any) => {
  const summary = useMemo(() => {
    const totalCount = MOCK_INVOICES.length;
    const paidCount = MOCK_INVOICES.filter((i) => i.status === 'Paid').length;
    const outstanding = MOCK_INVOICES.filter((i) => i.status === 'Issued').reduce(
      (sum, inv) => sum + parseFloat(inv.total.replace('$', '').replace(',', '')),
      0
    );
    return { totalCount, paidCount, outstanding };
  }, []);

  const openInvoiceDetails = (invoice: InvoiceItem) => {
    navigation.navigate(ScreenNameEnum.InvoiceDetails, { invoice });
  };

  const onPdf = (invoice: InvoiceItem) => {
    // TODO: open PDF
  };

  const onCsv = (invoice: InvoiceItem) => {
    // TODO: export CSV
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBarComponent backgroundColor={HEADER_BG} />
      <DrawerHeader title="View Invoices" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Invoices</Text>
            <Text style={[styles.summaryValue, { color: BLUE }]}>{summary.totalCount}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Paid Invoices</Text>
            <Text style={[styles.summaryValue, { color: GREEN }]}>{summary.paidCount}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Outstanding</Text>
            <Text style={[styles.summaryValue, { color: OUTSTANDING_COLOR }]}>
              ${summary.outstanding.toFixed(2)}
            </Text>
          </View>
        </View>

        {MOCK_INVOICES.map((invoice) => (
          <InvoiceCard
            key={invoice.id}
            invoice={invoice}
            onView={() => openInvoiceDetails(invoice)}
            onPdf={() => onPdf(invoice)}
            onCsv={() => onCsv(invoice)}
          />
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

function InvoiceCard({
  invoice,
  onView,
  onPdf,
  onCsv,
}: {
  invoice: InvoiceItem;
  onView: () => void;
  onPdf: () => void;
  onCsv: () => void;
}) {
  const isPaid = invoice.status === 'Paid';
  const statusBg = isPaid ? '#22C55E' : '#0EA5E9';

  return (
    <View style={styles.card}>
      <View style={styles.cardTopRow}>
        <View style={styles.cardTitleRow}>
          <Image
            source={imageIndex.document}
            style={styles.docIcon}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.cardId}>{invoice.id}</Text>
            <Text style={styles.cardDateRange}>{invoice.dateRange}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusBg }]}>
          <Text style={styles.statusText}>{invoice.status}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.miniCard,{
         }]}>
          <Text style={styles.miniLabel}>Orders</Text>
          <Text style={styles.miniValue}>{invoice.orders}</Text>
        </View>
        <View style={styles.miniCard}>
          <Text style={styles.miniLabel}>Subtotal</Text>
          <Text style={styles.miniValue}>{invoice.subtotal}</Text>
        </View>
        <View style={styles.miniCard}>
          <Text style={styles.miniLabel}>Tax</Text>
          <Text style={styles.miniValue}>{invoice.tax}</Text>
        </View>
        <View style={styles.miniCard}>
          <Text style={styles.miniLabel}>Total</Text>
          <Text style={styles.miniValue}>{invoice.total}</Text>
        </View>
      </View>

      <Text style={styles.dateLine}>
        Issued: {invoice.issuedDate} Paid: {invoice.paidDate}
      </Text>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.viewBtn} onPress={onView} activeOpacity={0.8}>
          <Text style={styles.viewBtnText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn} onPress={onPdf} activeOpacity={0.8}>
          <Text style={styles.secondaryBtnText}>PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn} onPress={onCsv} activeOpacity={0.8}>
          <Text style={styles.secondaryBtnText}>CSV</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingTop: 12 },
  summaryRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 14,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryLabel: { fontSize: 12, color: 'black', marginBottom: 6  , textAlign:"center"},
  summaryValue: { fontSize: 20, fontWeight: '700',textAlign:"center" },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardTitleRow: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  docIcon: {
    width: 28,
    height: 28,
    tintColor: BLUE,
    marginRight: 10,
  },
  cardId: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  cardDateRange: { fontSize: 13, color: '#64748B', marginTop: 2 },
  statusBadge: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  statusText: { fontSize: 12, fontWeight: '600', color: '#fff' },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  miniCard: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    padding: 10,
    borderWidth: 0, 
    justifyContent:"center" ,
    alignItems:"center"
  },
  miniLabel: { fontSize: 11, color: '#64748B', marginBottom: 4 },
  miniValue: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  dateLine: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 14,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  viewBtn: {
    flex: 1,
    backgroundColor: BLUE,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  viewBtnText: { fontSize: 14, fontWeight: '600', color: '#fff' },
  secondaryBtn: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryBtnText: { fontSize: 14, fontWeight: '600', color: '#475569' },
});

export default InvoicesScreen;
