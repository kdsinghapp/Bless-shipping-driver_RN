import { StyleSheet } from 'react-native';

const HEADER_BG = '#035093';
const GREEN = '#22C55E';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: HEADER_BG,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 14,
  },
  backBtn: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  placeholder: { width: 40 },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  dropZone: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: GREEN,
    borderRadius: 12,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.06)',
  },
  dropText: {
    fontSize: 15,
    color: '#475569',
    marginBottom: 4,
  },
  orText: {
    fontSize: 14,
    color: '#94A3B8',
    marginVertical: 12,
  },
  browseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  browseIcon: {
    width: 24,
    height: 24,
  },
  browseBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: GREEN,
    backgroundColor: '#fff',
  },
  browseBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: GREEN,
  },
  supportedText: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 14,
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    marginTop: 12,
    gap: 12,
  },
  fileIcon: {
    width: 36,
    height: 36,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  fileSize: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  completedTag: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  completedText: {
    fontSize: 12,
    fontWeight: '600',
    color: GREEN,
  },
  bottomBtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 28,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
});
