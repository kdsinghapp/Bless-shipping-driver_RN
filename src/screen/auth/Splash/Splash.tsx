import React, { useEffect, useRef } from 'react';
import { Animated, ImageBackground, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';

import ScreenNameEnum from '../../../routes/screenName.enum';
import { color } from '../../../constant';
import imageIndex from '../../../assets/imageIndex';
import { styles } from './style';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';

type RootStackParamList = {
  [key in ScreenNameEnum]: undefined;
};

const Splash: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const auth = useSelector((state: any) => state.auth);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 🔥 Animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      try {
        console.log("auth state:", auth);

        if (auth?.isLogin && auth?.userData) {
          if (auth.userData.role === "DRIVER") {
            navigation.replace(ScreenNameEnum.DeliveryDrawer);
          } else if (auth.userData.role === "MERCHANT") {
            navigation.replace(ScreenNameEnum.MerchantDrawer);
          } else {
            navigation.replace(ScreenNameEnum.ChooseRole);
          }
        } else {
          navigation.replace(ScreenNameEnum.OnboardingScreen);
        }
      } catch (error) {
        console.log('Splash navigation error:', error);
        navigation.replace(ScreenNameEnum.OnboardingScreen);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [auth]);

  return (
    <ImageBackground
      style={styles.container}
      source={imageIndex.bag}
      resizeMode="cover"
    >
      <StatusBarComponent backgroundColor={color.white} />

      <Animated.View
        style={[
          styles.centerContent,
          { opacity: fadeAnim },
        ]}
      >
        <FastImage
          style={styles.logo}
          source={imageIndex.appLogo}
          resizeMode={FastImage.resizeMode.contain}
        />
      </Animated.View>
    </ImageBackground>
  );
};

export default Splash;