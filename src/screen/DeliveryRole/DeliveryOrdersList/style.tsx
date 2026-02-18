import { StyleSheet } from 'react-native';

const HEADER_BG = '#035093';
const GREEN = '#22C55E';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: HEADER_BG,
    paddingHorizontal: 15,
    paddingVertical: 16,
    minHeight: 60,
  },
  menuBtn: { padding: 4 },
  menuIcon: { width: 22, height: 22, tintColor: '#fff' },
  headerCenter: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, color: '#fff', fontWeight: '700' },
  scrollContent: { padding: 16, paddingBottom: 40, flexGrow: 1 },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  orderImage: {
    width: 56,
    height: 56,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
  },
  orderBody: { flex: 1, marginLeft: 12 },
  orderNo: { fontSize: 12, color: '#64748B', marginBottom: 2 },
  orderName: { fontSize: 16, fontWeight: '600', color: '#0F172A' },
  orderMeta: { fontSize: 13, color: '#64748B', marginTop: 4 },
  statusPending: { fontSize: 13, color: '#F59E0B', marginTop: 2, fontWeight: '500' },
  deliveryBtn: {
    backgroundColor: GREEN,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  deliveryBtnText: { fontSize: 14, fontWeight: '700', color: '#fff' },
  emptyWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: { fontSize: 16, color: '#64748B', fontWeight: '500', marginTop: 12 },
});
