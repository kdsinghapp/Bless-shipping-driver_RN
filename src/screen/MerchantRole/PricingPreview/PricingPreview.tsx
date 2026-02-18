import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
 import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import ScreenNameEnum from '../../../routes/screenName.enum';
import CustomHeader from '../../../compoent/CustomHeader';

const HEADER_BG = '#035093';

const PricingPreview = ({ navigation }: any) => {
  const basePrice = 179.5;
  const weightCharges = 15.0;
  const serviceLevel = 2.5;
  const total = 202.75;

  const onConfirm = () => {
    navigation.navigate(ScreenNameEnum.MerchantViewOrders);
    // navigation.navigate(ScreenNameEnum.ViewOrders);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: HEADER_BG }} edges={['top']}>
      <StatusBarComponent barStyle="light-content" />
      <CustomHeader label="Pricing Preview" />
      <ScrollView
        style={{ flex: 1, backgroundColor: 'white' }}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 }}>
          <Row label="Base price" value={`$${basePrice.toFixed(2)}`} />
          <Row label="Weight / volume charges" value={`$${weightCharges.toFixed(2)}`} />
          <Row label="Service level" value={`$${serviceLevel.toFixed(2)}`} />
          <View style={{ marginTop: 8, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#E2E8F0' }}>
            <Text style={{ fontSize: 13, color: '#64748B', marginBottom: 4 }}>Standard Delivery</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#0F172A' }}>Total estimated price</Text>
              <Text style={{ fontSize: 20, fontWeight: '800', color: HEADER_BG }}>${total.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, paddingBottom: 28,   borderTopColor: '#E2E8F0' }}>
        <TouchableOpacity
          onPress={onConfirm}
          style={{ backgroundColor: HEADER_BG, borderRadius: 12, paddingVertical: 16, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ fontSize: 17, fontWeight: '700', color: '#fff' }}>Confirm Upload</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10,borderBottomColor: '#F1F5F9' }}>
      <Text style={{ fontSize: 15, color: '#475569' }}>{label}</Text>
      <Text style={{ fontSize: 15, fontWeight: '600', color: '#0F172A' }}>{value}</Text>
    </View>
  );
}

export default PricingPreview;
