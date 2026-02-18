// style.tsx
import { Dimensions, Platform, StyleSheet } from 'react-native';
import font from '../../../theme/font';
import { color } from '../../../constant';

const { width } = Dimensions.get('window');
const CARD_PADDING_H = 24;
const OPTION_MAX_WIDTH = width - CARD_PADDING_H * 2;

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
    paddingHorizontal: CARD_PADDING_H,
    paddingTop:20
  },
  container: {
    alignItems: 'center',
    paddingTop: 120,
    paddingBottom: 16,
  },
  image: {
    height: 88,
    width: 160,
    marginBottom: 28,
  },
  title: {
    fontSize: 26,
    fontFamily: font.TrialDemiBold || font.MonolithRegular,
    textAlign: 'center',
    marginBottom: 8,
    color: '#1a1a2e',
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: font.TrialRegular || font.MonolithRegular,
    textAlign: 'center',
    marginBottom: 28,
    color: '#64748B',
    paddingHorizontal: 16,
  },
  touchContainer: {
    width: '100%',
    maxWidth: OPTION_MAX_WIDTH,
    marginBottom: 14,
  },
  option: {
    minHeight: 80,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    ...Platform.select({
      ios: {
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  optionSelected: {
    backgroundColor: color.primary,
    borderColor: color.primary,
    ...Platform.select({
      ios: {
        shadowColor: color.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapSelected: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  optionIcon: {
    height: 28,
    width: 28,
  },
  optionContent: {
    flex: 1,
    marginLeft: 16,
  },
  optionLabel: {
    fontSize: 17,
    fontFamily: font.TrialDemiBold || font.MonolithRegular,
    color: '#1e293b',
    marginBottom: 2,
  },
  optionLabelSelected: {
    color: '#FFFFFF',
  },
  optionDesc: {
    fontSize: 13,
    fontFamily: font.TrialRegular || font.MonolithRegular,
    color: '#64748B',
    lineHeight: 18,
  },
  optionDescSelected: {
    color: 'rgba(255,255,255,0.9)',
  },
  checkWrap: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    color: color.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  bottomButtonContainer: {
    paddingHorizontal: CARD_PADDING_H,
    paddingBottom: Platform.OS === 'ios' ? 28 : 24,
    paddingTop: 12,
    backgroundColor: '#F8FAFC',
  },
  nextButton: {
    height: 56,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
});
