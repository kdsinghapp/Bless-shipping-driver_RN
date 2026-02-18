import { StyleSheet, Platform } from 'react-native';
import { hp, wp } from '../../../utils/Constant';
import { color } from '../../../constant';
  
const styles = StyleSheet.create({
    container: {
    flex: 1,
   },

  card: {
     marginHorizontal: 10,
    borderRadius: 20,
    padding: 20,
     paddingTop:120
  },

  logo: {
    height: 132,
    width: '100%',
    alignSelf: 'center',
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
  },

  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
    color: '#000000',
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },

  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 10,
    marginBottom: 4,
  },

  forgotWrap: {
    alignSelf: 'flex-end',
    marginTop: 8,
    marginBottom: 8,
  },

  forgotText: {
    fontSize: 14,
    color: color.primary,
    fontWeight: '600',
  },

  buttonWrap: {
    marginTop: 24,
  },

  signUpWrap: {
    marginTop: 24,
    alignItems: 'center',
  },

  signUpText: {
    fontSize: 14,
    color: '#666',
  },

  signUpLink: {
    fontSize: 14,
    fontWeight: '700',
    color: color.primary,
  },

  phoneLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#22C55E',
    marginTop: 8,
    marginBottom: 4,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#86EFAC',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 52,
    marginTop: 6,
  },

  countryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
    marginRight: 8,
    borderRightWidth: 2,
    borderColor: '#00D490',
    gap: 4,
  },

  countryText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },

  chevron: {
    width: 14,
    height: 14,
  },

  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    paddingVertical: 0,
  },

  input: {
    flex: 1,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#0B5ED7',
    borderRadius: 25,
    marginTop: 25,
    paddingVertical: 12,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },

  terms: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 15,
    color: '#666',
  },

  link: {
    color: '#9E9E9E',
    // color: '#0B5ED7',
  },

  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },

  modalCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? hp(3) : 20,
    paddingHorizontal: 20,
    maxHeight: hp(70),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
    
    }),
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
  },

  modalListWrap: {
    maxHeight: hp(45),
    marginBottom: 16,
  },

  countryItem: {
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },

  countryItemLast: {
    borderBottomWidth: 0,
  },

  countryName: {
    fontSize: 16,
    color: '#374151',
  },

  closeBtn: {
    backgroundColor: color.primary || '#0B5ED7',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },

 });
export default styles;
