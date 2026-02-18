import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Resend_otp, Verifyotp } from '../../../Api/apiRequest';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { loginSuccess } from '../../../redux/feature/authSlice';
import { successToast } from '../../../utils/customToast';

export const useOtpVerification = (cellCount: number = 4) => {
  const navigation = useNavigation<any>();
  const route: any = useRoute();
  const { phone, code, fromUserLogin } = route.params || {};
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(fromUserLogin ? 60 : 0);
  // Timer countdown logic
  // useEffect(() => {
  //   let interval;
  //   if (timer > 0) {
  //     interval = setInterval(() => {
  //       setTimer(prev => prev - 1);
  //     }, 1000);
  //   }
  //   return () => clearInterval(interval);]\
  // }, [timer]);
  const data = {
    mob: phone,
    code: fromUserLogin ? '' : code,
    fromUserLogin: !!fromUserLogin,
  };
  const [errorMessage, setErrorMessage] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });
  const handleChangeText = (text: string) => {
    setValue(text);
    setErrorMessage(text.length < cellCount ? 'Please enter 4 digit otp' : '');
  };

  const handleResendOTP = async () => {
    if (timer > 0) return;
    setIsLoading(true);
    try {
      if (fromUserLogin) {
        // User email flow: no phone API, just reset timer
        setTimer(60);
        successToast('Verification code resent');
      } else {
        const params = { phone, code };
        await Resend_otp(params, setIsLoading);
        setTimer(30);
      }
    } catch (error) {
      console.error('OTP resend error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {

            navigation.replace(ScreenNameEnum.UserRoleDashBoard);

    // if (value.length !== cellCount) {
    //   setErrorMessage('Please enter 4 digit OTP');
    //   return;
    // }
    setErrorMessage('');

    
  };

  return {
    value,
    setValue,
    isLoading,
    errorMessage,
    ref,
    props,
    getCellOnLayoutHandler,
    handleChangeText,
    handleVerifyOTP,
    navigation,
    handleResendOTP,
    data,
    timer,
  };
};
