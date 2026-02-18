import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import imageIndex from '../../../assets/imageIndex';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import ScreenNameEnum from '../../../routes/screenName.enum';
import CustomHeader from '../../../compoent/CustomHeader';

const HEADER_BG = '#035093';
const RED = '#EF4444';

const REJECTED_ERRORS = [
  'Row 12-Invalid phone number.',
  'Row 15-Incomplete address provided.',
  'Row 23-Customer unavailable for confirmation',
];

const OrderConfirmation = ({ navigation }: any) => {
  const [rejectedOpen, setRejectedOpen] = useState(true);
  const [acceptedOpen, setAcceptedOpen] = useState(false);
  const [scheduledOpen, setScheduledOpen] = useState(false);

  const accepted = 120;
  const scheduled = 10;
  const rejected = 3;

  const goToPricing = () => {
    navigation.navigate(ScreenNameEnum.PricingPreview);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: HEADER_BG }} edges={['top']}>
      <StatusBarComponent barStyle="light-content" />
      <CustomHeader label="Order Confirmation" />
      <ScrollView
        style={{ flex: 1, backgroundColor: 'white' }}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            backgroundColor: "white",
            marginBottom: 10,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 11,
            borderWidth: 0.5,
            borderColor: "#035093",
            marginTop: 3,


          }}
        >


          <View style={{
            flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16,
            marginTop: 11,
            alignItems: "center",
            paddingVertical: 8
          }}>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ fontSize: 22, fontWeight: '700', color: '#0F172A' }}> 
                0
                {/* {accepted} */}
                </Text>
              <Text style={{ fontSize: 12, color: '#64748B', marginTop: 4, textAlign: 'center' }}>Accepted Orders</Text>
            </View>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ fontSize: 22, fontWeight: '700', color: '#0F172A' }}>
                   0
                {/* {scheduled} */}
                </Text>
              <Text style={{ fontSize: 12, color: '#64748B', marginTop: 4, textAlign: 'center' }}>Scheduled for Tomorrow</Text>
            </View>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ fontSize: 22, fontWeight: '700', color: '#0F172A' }}>
                 0
                {/* {rejected} */}
                </Text>
              <Text style={{ fontSize: 12, color: '#64748B', marginTop: 4, textAlign: 'center' }}>Rejected Orders</Text>
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 }}>


          <Pressable
            onPress={() => setAcceptedOpen(!acceptedOpen)}
            style={{
              flexDirection: 'row',
              marginBottom: 11,
              alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E2E8F0'
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: '600', color: '#035093' }}>Accepted Orders</Text>
            <Image source={imageIndex.arrowqdown} style={{ width: 20, height: 20, transform: [{ rotate: acceptedOpen ? '180deg' : '0deg' }], tintColor: '#64748B' }} resizeMode="contain" />
          </Pressable>
          {acceptedOpen && (
            <View style={{ paddingVertical: 8, paddingBottom: 12 }}>
              <Text style={{ fontSize: 13, color: '#64748B' }}> 
              0
               orders accepted</Text>
            </View>
          )}

          <Pressable
            onPress={() => setScheduledOpen(!scheduledOpen)}
            style={{
              flexDirection: 'row',
              marginBottom: 11,

              alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E2E8F0'
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: '600', color: '#035093' }}>Scheduled For Tomorrow Orders</Text>
            <Image source={imageIndex.arrowqdown} style={{ width: 20, height: 20, transform: [{ rotate: scheduledOpen ? '180deg' : '0deg' }], tintColor: '#64748B' }} resizeMode="contain" />
          </Pressable>
          {scheduledOpen && (
            <View style={{ paddingVertical: 8 }}>
              <Text style={{ fontSize: 13, color: '#64748B' }}>Orders scheduled for next day</Text>
            </View>
          )}


        </View>

        <View style={{
          backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2
        }}>

          <Pressable
            onPress={() => setRejectedOpen(!rejectedOpen)}
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 }}
          >
            <Text style={{ fontSize: 15, fontWeight: '600', color: '#FF383C' }}>Rejected Orders ({rejected})</Text>
            <Image source={imageIndex.arrowqdown} style={{ width: 20, height: 20, transform: [{ rotate: rejectedOpen ? '180deg' : '0deg' }], tintColor: '#64748B' }} resizeMode="contain" />
          </Pressable>
          {rejectedOpen && (
            <View style={{ paddingTop: 4, paddingBottom: 12 }}>
              {REJECTED_ERRORS.map((msg, i) => (
                <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                  <Text style={{ fontSize: 16, color: RED, marginRight: 10 }}>⚠</Text>
                  <Text style={{ flex: 1, fontSize: 13, color: RED, fontWeight: '500' }}>{msg}</Text>
                </View>
              ))}
              <TouchableOpacity
                style={{ alignSelf: 'center', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 8, backgroundColor: HEADER_BG, marginTop: 8 }}
                onPress={() => { }}
                activeOpacity={0.8}
              >
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#fff' }}>Retry Failed Rows</Text>
              </TouchableOpacity>
            </View>
          )}

        
        </View>

      </ScrollView>

      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, paddingBottom: 28, backgroundColor: '#fff', borderTopColor: '#E2E8F0' }}>
        <TouchableOpacity
          onPress={goToPricing}
          style={{ backgroundColor: HEADER_BG, borderRadius: 12, paddingVertical: 16, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ fontSize: 17, fontWeight: '700', color: '#fff' }}>Continue to Pricing Preview</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OrderConfirmation;
