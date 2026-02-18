import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import DrawerHeader from '../../../compoent/DrawerHeader';
import imageIndex from '../../../assets/imageIndex';

const HEADER_BG = '#035093';
const BLUE = '#035093';
const GREEN = '#22C55E';
const SUCCESS_BG = '#DCFCE7';
const SUCCESS_TEXT = '#16A34A';

export type ImportRecord = {
  id: string;
  dateRange: string;
  totalRows: number;
  imported: number;
  failed: number;
  successRate: string;
};

const MOCK_HISTORY: ImportRecord[] = [
  { id: 'BSL-2026-001', dateRange: 'Jan 01 - Jan 31, 2026', totalRows: 45, imported: 23, failed: 2, successRate: '92%' },
  { id: 'BSL-2026-002', dateRange: 'Dec 01 - Dec 31, 2025', totalRows: 38, imported: 36, failed: 2, successRate: '95%' },
  { id: 'BSL-2026-003', dateRange: 'Nov 01 - Nov 30, 2025', totalRows: 52, imported: 50, failed: 0, successRate: '100%' },
  { id: 'BSL-2025-004', dateRange: 'Oct 01 - Oct 31, 2025', totalRows: 28, imported: 25, failed: 3, successRate: '89%' },
  { id: 'BSL-2025-005', dateRange: 'Sep 01 - Sep 30, 2025', totalRows: 41, imported: 39, failed: 2, successRate: '95%' },
  { id: 'BSL-2025-006', dateRange: 'Aug 01 - Aug 31, 2025', totalRows: 33, imported: 30, failed: 1, successRate: '91%' },
];

const ImportHistoryScreen = () => {
  const onViewRecord = (record: ImportRecord) => {
    // Could navigate to import detail screen later
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBarComponent backgroundColor={HEADER_BG} />
      <DrawerHeader title="Import History" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {MOCK_HISTORY.map((record) => (
          <HistoryCard
            key={record.id}
            record={record}
            onView={() => onViewRecord(record)}
          />
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

function HistoryCard({
  record,
  onView,
}: {
  record: ImportRecord;
  onView: () => void;
}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onView} activeOpacity={0.9}>
      <View style={styles.cardHeader}>
        <Image source={imageIndex.document} style={styles.docIcon} resizeMode="contain" />
        <Text style={styles.cardId}>{record.id}</Text>
      </View>
      <Text style={styles.dateRange}>{record.dateRange}</Text>
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Total Rows</Text>
          <Text style={styles.statValue}>{record.totalRows}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Imported</Text>
          <Text style={styles.statValue}>{record.imported}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Failed</Text>
          <Text style={styles.statValue}>{record.failed}</Text>
        </View>
        <View style={[styles.statBox, styles.successRateBox]}>
          <Text style={styles.successRateLabel}>Success Rate</Text>
          <Text style={styles.successRateValue}>{record.successRate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingTop: 12 },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  docIcon: { width: 20, height: 20, tintColor: BLUE, marginRight: 8 },
  cardId: { fontSize: 15, fontWeight: '600', color: '#0F172A' },
  dateRange: { fontSize: 13, color: '#64748B', marginBottom: 12 },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statBox: {
    flex: 1,
    minWidth: 70,
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems:"center" ,
    padding:12 ,
    justifyContent:"center"
 
  },
  statLabel: { fontSize: 11, color: '#64748B', marginBottom: 2, textAlign:"center" },
  statValue: { fontSize: 15, fontWeight: '600', color: '#0F172A',textAlign:"center" },
  successRateBox: {
    backgroundColor: SUCCESS_BG,
  },
  successRateLabel: { fontSize: 11, color: SUCCESS_TEXT, marginBottom: 2 },
  successRateValue: { fontSize: 15, fontWeight: '600', color: SUCCESS_TEXT },
});

export default ImportHistoryScreen;
