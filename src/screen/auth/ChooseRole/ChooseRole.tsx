import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  ScrollView,
  Easing,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomButton from '../../../compoent/CustomButton';
import ScreenNameEnum from '../../../routes/screenName.enum';
import imageIndex from '../../../assets/imageIndex';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { errorToast } from '../../../utils/customToast';
import { styles } from './style';
import { color } from '../../../constant';

const options = [
  {
    id: 1,
    type: 'user',
    label: 'Merchant',
    description: 'Manage orders, products & shipments',
    image: imageIndex.userLogo,
  },
  {
    id: 2,
    type: 'Delivery',
    label: 'Driver',
    description: 'Deliver orders and track your trips',
    image: imageIndex.Deliver,
  },
    {
    id: 3,
    type: 'User',
    label: 'User',
    description: 'Browse products and place orders easily',
    image: imageIndex.userLogo,
  },

];

const ChooseRole = () => {
  const [selected, setSelected] = useState<any>(null);
  const navigation = useNavigation();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSelect = (item: (typeof options)[0]) => {
    setSelected(item);
    pulseAnim.setValue(1);
    Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1.04,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(pulseAnim, {
        toValue: 1,
        friction: 4,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleNext = async () => {
    if (!selected) {
      errorToast('Please select your role before proceeding.');
      return;
    }
    await AsyncStorage.setItem('selectedRole', selected.type);
    if(selected.type === "User") {
 

    navigation.navigate(ScreenNameEnum.UserRoleLoginScreen);

    }else{
    navigation.navigate(ScreenNameEnum.PhoneLogin);

    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBarComponent />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View
          style={[
            styles.container,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
          ]}
        >
          <Animated.Image
            source={imageIndex.appLogo1}
            style={[styles.image, { transform: [{ scale: scaleAnim }] }]}
            resizeMode="contain"
          />

          <Text style={styles.title}>Choose your role</Text>
          <Text style={styles.subtitle}>
            Select how you'll use Bless Shipping
          </Text>

          {options.map((item) => {
            const isSelected = selected?.id === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.touchContainer}
                activeOpacity={0.85}
                onPress={() => handleSelect(item)}
              >
                <Animated.View
                  style={[
                    styles.option,
                    isSelected && styles.optionSelected,
                    {
                      transform: [
                        { scale: isSelected ? pulseAnim : 1 },
                      ],
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.iconWrap,
                      isSelected && styles.iconWrapSelected,
                    ]}
                  >
                    <Image
                      source={item.image}
                      style={[
                        styles.optionIcon,
                        { tintColor: isSelected ? '#FFFFFF' : color.primary },
                      ]}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.optionContent}>
                    <Text
                      style={[
                        styles.optionLabel,
                        isSelected && styles.optionLabelSelected,
                      ]}
                    >
                      {item.label}
                    </Text>
                    <Text
                      style={[
                        styles.optionDesc,
                        isSelected && styles.optionDescSelected,
                      ]}
                      numberOfLines={2}
                    >
                      {item.description}
                    </Text>
                  </View>
                  {isSelected && (
                    <View style={styles.checkWrap}>
                      <Text style={{ color: '#fff', fontSize: 14, fontWeight: '700' }}>✓</Text>
                    </View>
                  )}
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      </ScrollView>

      <View style={styles.bottomButtonContainer}>
        <CustomButton title="Continue" onPress={handleNext} height={56} />
      </View>
    </SafeAreaView>
  );
};

export default ChooseRole;
