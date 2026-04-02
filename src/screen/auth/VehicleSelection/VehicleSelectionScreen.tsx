import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useVehicleSelection } from './useVehicleSelection';
import CustomHeader from '../../../compoent/CustomHeader';
import CustomButton from '../../../compoent/CustomButton';
import { color } from '../../../constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const VehicleSelectionScreen = () => {
  const {
    vehicles,
    loading,
    selectedVehicle,
    handleSelect,
    handleContinue,
    handleContinue1
  } = useVehicleSelection();

  const renderVehicleItem = ({ item }: { item: any }) => {
    const isSelected = selectedVehicle === item._id;

    return (
      <TouchableOpacity
        style={[
          styles.vehicleCard,
          isSelected && styles.selectedCard,
        ]}
        onPress={() => handleSelect(item._id)}
        activeOpacity={0.7}
      >
        <View style={styles.iconContainer}>
          <Icon
            name={getVehicleIcon(item.name)}
            size={wp(10)}
            color={isSelected ? color.white : color.primary}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.vehicleName, isSelected && styles.selectedText]}>
            {item.name}
          </Text>
          <Text style={[styles.vehicleDesc, isSelected && styles.selectedDescText]}>
            {item.description}
          </Text>
        </View>
        {isSelected && (
          <View style={styles.checkCircle}>
            <Icon name="check-bold" size={wp(4)} color={color.primary} />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const getVehicleIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('car')) return 'car';
    if (lowerName.includes('suv')) return 'car-suv';
    if (lowerName.includes('minivan')) return 'van-utility';
    if (lowerName.includes('truck')) return 'truck-delivery';
    return 'car';
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader label="Select Vehicle" />
      <View style={styles.content}>
        <Text style={styles.title}>Choose your vehicle type</Text>
        <Text style={styles.subtitle}>
          Select the vehicle you will be using for deliveries
        </Text>

        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={color.primary} />
          </View>
        ) : (
          <FlatList
            data={vehicles}
            renderItem={renderVehicleItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <View style={{
        marginHorizontal: 15
      }}>
        <CustomButton
          title="Continue"
          onPress={handleContinue}
          disable={!selectedVehicle || loading}
          style={[
            styles.continueButton,
            (!selectedVehicle || loading) && styles.disabledButton,
          ]}
        />
      </View>
      <View style={{
        padding: wp(5),
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
      }}>
        <CustomButton
          title="Skip"
          onPress={handleContinue1}
          style={[
            styles.continueButton,

          ]}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
  },
  title: {
    fontSize: wp(6),
    fontWeight: '700',
    color: color.black,
    marginBottom: hp(0.5),
  },
  subtitle: {
    fontSize: wp(3.8),
    color: color.grey,
    marginBottom: hp(3),
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingBottom: hp(2),
  },
  vehicleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: wp(4),
    padding: wp(4),
    marginBottom: hp(2),
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    backgroundColor: color.primary,
    borderColor: color.primary,
  },
  iconContainer: {
    width: wp(16),
    height: wp(16),
    borderRadius: wp(8),
    backgroundColor: color.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(4),
  },
  textContainer: {
    flex: 1,
  },
  vehicleName: {
    fontSize: wp(4.5),
    fontWeight: '600',
    color: color.black,
  },
  vehicleDesc: {
    fontSize: wp(3.3),
    color: color.grey,
    marginTop: hp(0.5),
  },
  selectedText: {
    color: color.white,
  },
  selectedDescText: {
    color: '#E5E7EB',
  },
  checkCircle: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(3),
    backgroundColor: color.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    padding: wp(5),
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  continueButton: {
    width: '100%',
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default VehicleSelectionScreen;
