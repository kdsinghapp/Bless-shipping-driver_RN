import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import imageIndex from '../../../assets/imageIndex';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import { styles } from './style';
import CustomButton from '../../../compoent/CustomButton';
import { color } from '../../../constant';
import SlideButton from '../../../compoent/SlideRightButton/SlideRightButton';
import ScreenNameEnum from '../../../routes/screenName.enum';

const { width, height } = Dimensions.get('window');

interface Slide {
  id: string;
  title: string;
  description: string;
  img: any;
}

const slides: Slide[] = [
  {
    id: '1',
    title: 'Welcome to ',
    description: 'Lorem ipsum dolor sit amet consectetur.',
    img: imageIndex.sp2,
  },
  {
    id: '2',
    title: 'Welcome to  ',
    description: 'Lorem ipsum dolor sit amet consectetur.',
    img: imageIndex.sp1,
  },
  {
    id: '3',
    title: 'Welcome to  ',
    description: 'Lorem ipsum dolor sit amet consectetur.',
    img: imageIndex.sp3,
  },
];

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

const OnboardingScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const updateCurrentIndex = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    if (index !== currentIndex) setCurrentIndex(index);
  };

  const handleNextPress = () => {
    // if (currentIndex < slides.length - 1) {
    //   flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    // } else {
  navigation.navigate(ScreenNameEnum.PhoneLogin);
    //  navigation.navigate(ScreenNameEnum.ChooseRole);
    // }
  };

  const handleSkip = () => {
    navigation.navigate(ScreenNameEnum.ChooseRole);
  };

  const renderSlide = ({ item }: { item: Slide }) => (
    <View style={[styles.slide,]}>
      {/* <View style={styles.image}/> */}
      {/* <Image source={item.img} style={styles.image} /> */}
      {/* Dots */}
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => {
          const isActive = currentIndex === index;
          return (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor: isActive ? '#035093' : color.primary,
                  width: isActive ? 13 : 8,
                  height: isActive ? 5 : 8,
                  justifyContent: "center",
                  marginHorizontal: 5,
                  borderRadius: isActive ? 8 : 5,



                },
              ]}
            />
          );
        })}
      </View>
      <View> 
    <Text style={styles.title}>{item.title} 

<Text style={{
  color:"#5DCF00"
}}>Bless Shipping</Text>

    </Text>
 
      </View>
  
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <ImageBackground
      style={styles.container}
      source={imageIndex.Onboarddingbg}
      resizeMode="cover"
    >
      <StatusBarComponent />

      {/* Skip Button */}
      {/* <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity> */}

      <Animated.FlatList
        data={slides}
        horizontal
        pagingEnabled
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderSlide}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false, listener: updateCurrentIndex }
        )}
        scrollEventThrottle={16}
      />
      {currentIndex === slides.length - 1 ?
        <View style={{
          marginBottom: 55,
 width: "50%",
 alignSelf:'center'
        }}>
          <CustomButton title={"Next"} onPress={handleNextPress} />

        </View>
        :
        <View style={{
          width: "50%",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          marginBottom: 55
        }}>
          <CustomButton title={"Next"} onPress={handleNextPress}/>

        </View>
      }


    </ImageBackground>
  );
};

export default OnboardingScreen;
