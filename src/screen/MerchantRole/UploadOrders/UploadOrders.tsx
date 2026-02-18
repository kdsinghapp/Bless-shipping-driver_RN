import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { pick, types } from '@react-native-documents/picker';
import imageIndex from '../../../assets/imageIndex';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import ScreenNameEnum from '../../../routes/screenName.enum';
import CustomHeader from '../../../compoent/CustomHeader';

const HEADER_BG = '#035093';
const GREEN = '#22C55E';

type FileInfo = { name: string; size: string; uri?: string } | null;

const UploadOrders = ({ navigation }: any) => {
  const [file, setFile] = useState<FileInfo>(null);

  const openPicker = async () => {
    try {
      const result = await pick({
        type: [types.csv, types.pdf, types.xls, types.xlsx],
        allowMultiSelection: false,
      });
      const arr = Array.isArray(result) ? result : (result as any)?.files;
      const f = arr?.[0];
      if (f) {
        const name = f.name ?? 'order_file';
        const size = f.size != null ? `${Math.round(f.size / 1024)} KB` : '—';
        setFile({ name, size, uri: f.uri });
      }
    } catch (e: any) {
      if (e?.code !== 'E_DOCUMENT_PICKER_CANCELED') {
        Alert.alert('Error', 'Could not open file picker. Please try again.');
      }
    }
  };

  const onUploadOrder = () => {
    if (!file) {
      Alert.alert('Select file', 'Please select a CSV, XLS, XLSX or PDF file first.');
      return;
    }
    navigation.navigate(ScreenNameEnum.OrderConfirmation, { file });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: HEADER_BG }} edges={['top']}>
      <StatusBarComponent barStyle ="light-content"/>
       <CustomHeader label="Upload Orders"/>

      <ScrollView
        style={{ flex: 1, backgroundColor: 'white' }}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ backgroundColor: '#fff', borderRadius: 12, marginTop:20, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#0F172A', marginBottom: 20 , textAlign:"center" }}>Upload File</Text>
          <TouchableOpacity
            activeOpacity={0.9}
         onPress={openPicker}
            style={{
              borderWidth: 2,
              borderStyle: 'dashed',
              borderColor: GREEN,
              borderRadius: 12,
              paddingVertical: 28,
              paddingHorizontal: 20,
              alignItems: 'center',
              justifyContent: 'center',
             }}
          >
                          <Image source={imageIndex.document} style={{ width: 24, height: 24, tintColor: GREEN }} resizeMode="contain" />

            <Text style={{ fontSize: 15, fontWeight:"500", marginTop:12, color: 'black', marginBottom: 4 }}>Drop & drop your file here</Text>
            <Text style={{ fontSize: 14, color: 'black', marginVertical: 12 }}>or click to browse</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <View style={{ paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, borderWidth: 1, borderColor: GREEN, backgroundColor: '#fff' }}>
                <Text style={{ fontSize: 15, fontWeight: '600', color: GREEN }}>Browse File</Text>
              </View>
            </View>
            <Text style={{ fontSize: 13, color: 'black', marginTop: 14 }}>Supported file types</Text>
            <Text style={{ fontSize: 13, color: 'black', marginTop: 3 }}>CSV, XLS, XLSX, PDF</Text>
          </TouchableOpacity>
 {file && (
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 12, backgroundColor: '#F8FAFC', borderRadius: 10, marginTop: 12, gap: 12 }}>
              <Image source={imageIndex.document} style={{ width: 36, height: 36, tintColor: '#64748B' }} resizeMode="contain" />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#0F172A' }}>{file.name}</Text>
                <Text style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>{file.size}</Text>
              </View>
              
            </View>
          )}
     
        </View>
            
      </ScrollView>

      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, paddingBottom: 28, backgroundColor: '#fff',  borderTopColor: '#E2E8F0' }}>
        <TouchableOpacity
          onPress={onUploadOrder}
          style={{ backgroundColor: HEADER_BG, borderRadius: 12, paddingVertical: 16, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ fontSize: 17, fontWeight: '700', color: '#fff' }}>Upload Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UploadOrders;
