import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  Pressable,
  Modal,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomButton from '../../../compoent/CustomButton';
import LoadingModal from '../../../utils/Loader';
import imageIndex from '../../../assets/imageIndex';
import useUserRoleLogin from './useUserRoleLogin';
import Constcounty from './Constcounty';
import styles from './style';

export default function UserRoleLoginScreen() {
  const [showCountryModal, setShowCountryModal] = useState(false);
  const {
    credentials,
    errors,
    isLoading,
    handleChange,
    handleLogin,
    selectedCountry,
    setSelectedCountry,
  } = useUserRoleLogin();

  return (
    <ImageBackground
      source={imageIndex.Loginbg}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBarComponent />
      <LoadingModal visible={isLoading} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Image
            source={imageIndex.appLogo}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>
            Enter your phone number to continue
          </Text>

          <Text style={styles.phoneLabel}>Phone Number</Text>
          <View style={styles.inputRow}>
            <Pressable
              style={styles.countryBox}
              onPress={() => setShowCountryModal(true)}
            >
              <Text style={styles.countryText}>{selectedCountry.dial_code}</Text>
              <Image
                source={imageIndex.dounArroww}
                style={styles.chevron}
                resizeMode="contain"
              />
            </Pressable>
            <TextInput
              style={styles.phoneInput}
              placeholder="87859676647"
              placeholderTextColor="#9CA3AF"
              value={credentials.phone}
              onChangeText={(value) => handleChange('phone', value)}
              keyboardType="phone-pad"
              maxLength={15}
            />
          </View>
          {errors.phone ? (
            <Text style={styles.errorText}>{errors.phone}</Text>
          ) : null}

          <View style={styles.buttonWrap}>
            <CustomButton title="Login" onPress={handleLogin} height={56} />
          </View>

          <Text style={styles.terms}>
            By continuing, you agree to our{' '}
            <Text style={styles.link}>Terms of Service</Text>
            {' and '}
            <Text style={styles.link}>Privacy Policy</Text>
          </Text>
        </View>
      </ScrollView>

      <Modal
        visible={showCountryModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCountryModal(false)}
        statusBarTranslucent
        supportedOrientations={['portrait', 'landscape']}
      >
        <View style={styles.modalBg}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setShowCountryModal(false)}
          />
          <Pressable
            style={styles.modalCard}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={styles.modalTitle}>Select country</Text>
            <View style={styles.modalListWrap}>
              <FlatList
                data={Constcounty}
                keyExtractor={(item) => item.code}
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps="handled"
                renderItem={({ item, index }) => (
                  <Pressable
                    style={[
                      styles.countryItem,
                      index === Constcounty.length - 1 && styles.countryItemLast,
                    ]}
                    onPress={() => {
                      setSelectedCountry(item);
                      setShowCountryModal(false);
                    }}
                  >
                    <Text style={styles.countryName}>
                      {item.flag} {item.country} ({item.dial_code})
                    </Text>
                  </Pressable>
                )}
              />
            </View>
            <Pressable
              style={styles.closeBtn}
              onPress={() => setShowCountryModal(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
          </Pressable>
        </View>
      </Modal>
    </ImageBackground>
  );
}
