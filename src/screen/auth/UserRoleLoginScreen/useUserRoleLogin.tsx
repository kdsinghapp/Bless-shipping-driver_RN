import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { errorToast } from '../../../utils/customToast';

export interface CountryOption {
  country: string;
  code: string;
  dial_code: string;
  flag: string;
}

interface Credentials {
  phone: string;
}

const useUserRoleLogin = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    phone: '',
  });
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>({
    country: 'Indonesia',
    code: 'ID',
    dial_code: '+62',
    flag: '🇮🇩',
  });

  const [errors, setErrors] = useState<Partial<Credentials>>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<any>();

  const handleChange = (field: keyof Credentials, value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateFields = () => {
    const validationErrors: Partial<Credentials> = {};
    if (!credentials.phone.trim()) validationErrors.phone = 'Phone number is required';
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const fullPhoneNumber = `${selectedCountry.dial_code.replace('+', '')}${credentials.phone.replace(/\D/g, '')}`;

  const handleLogin = async () => {
      navigation.navigate(ScreenNameEnum.OtpScreen, {
        phone: fullPhoneNumber,
        code: selectedCountry.dial_code,
        fromUserLogin: true,
      });
    // if (!validateFields()) return;

    // setIsLoading(true);
    // try {
    //   navigation.navigate(ScreenNameEnum.OtpScreen, {
    //     phone: fullPhoneNumber,
    //     code: selectedCountry.dial_code,
    //     fromUserLogin: true,
    //   });
    // } catch (error: any) {
    //   errorToast(error?.message || 'Login Error');
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return {
    credentials,
    errors,
    isLoading,
    handleChange,
    handleLogin,
    navigation,
    selectedCountry,
    setSelectedCountry,
  };
};

export default useUserRoleLogin;
