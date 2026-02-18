import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import ScreenNameEnum from '../../../routes/screenName.enum';
import imageIndex from '../../../assets/imageIndex';
import styles from './style';

const GREEN = '#22C55E';

type DeliveryStep = 'received' | 'in_transit' | 'delivered' | 'canceled';

const STEPS: { key: DeliveryStep; label: string; icon: string }[] = [
  { key: 'received', label: 'Received', icon: '✓' },
  { key: 'in_transit', label: 'In Transit', icon: '✓' },
  { key: 'delivered', label: 'Delivered', icon: '○' },
  { key: 'canceled', label: 'Canceled', icon: '○' },
];

type RouteParams = { order?: { id: string; orderNo: string; customerName: string; date: string; status: string } };

const DeliveryRequestScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const order = route.params?.order || { id: '1', orderNo: 'ORD-1001', customerName: 'Bless Shipping', date: '13 Feb 2025', status: 'Pending' };

  const [currentStep, setCurrentStep] = useState<DeliveryStep>('in_transit');
  const [showProof, setShowProof] = useState(false);

  const receivedDone = currentStep !== 'received';
  const inTransitDone = currentStep === 'delivered' || currentStep === 'in_transit';
  const deliveredDone = currentStep === 'delivered';

  const stepDone = (key: DeliveryStep) => {
    if (key === 'received') return receivedDone;
    if (key === 'in_transit') return inTransitDone;
    if (key === 'delivered') return deliveredDone;
    return false;
  };

  const handleUpdateStatus = () => {
    if (currentStep === 'in_transit') {
      setShowProof(true);
      setCurrentStep('delivered');
    } else if (currentStep === 'delivered') {
      navigation.replace(ScreenNameEnum.DeliveryDrawer);
    } else {
      setCurrentStep('in_transit');
    }
  };

  const buttonLabel = currentStep === 'delivered' && showProof
    ? 'BACK TO HOME'
    : showProof
    ? 'UPLOAD PROOF OF DELIVERY'
    : 'UPDATE STATUS';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBarComponent barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Image source={imageIndex.back} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>
        <View style={styles.avatarWrap}>
          <Text style={styles.avatarText}>DA</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconCircleIcon}>📦</Text>
        </View>
        <Text style={styles.title}>Delivery Request</Text>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Order No</Text>
          <Text style={styles.detailValue}>{order.orderNo}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Customer Name</Text>
          <Text style={styles.detailValue}>{order.customerName}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Origin</Text>
          <Text style={styles.detailValue}>Warehouse A</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Destination</Text>
          <Text style={styles.detailValue}>Customer Address</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Distance</Text>
          <Text style={styles.detailValue}>2.5 km</Text>
        </View>
        <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
          <Text style={styles.detailLabel}>Price</Text>
          <Text style={styles.detailValue}>₦1,500</Text>
        </View>

        <View style={styles.stepsSection}>
          <Text style={styles.stepsTitle}>Delivery steps</Text>
          <View style={styles.stepsRow}>
            {STEPS.map((step, index) => (
              <React.Fragment key={step.key}>
                <View style={[styles.stepCircle, stepDone(step.key) && styles.stepCircleDone]}>
                  <Text style={{ fontSize: 18, fontWeight: '700', color: stepDone(step.key) ? GREEN : '#94A3B8' }}>
                    {stepDone(step.key) ? '✓' : step.icon}
                  </Text>
                </View>
                {index < STEPS.length - 1 && (
                  <View style={[styles.stepLine, stepDone(step.key) && styles.stepLineDone]} />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>

        {showProof && (
          <View style={styles.proofBox}>
            <Text style={styles.proofPlaceholder}>Upload image (Optional)</Text>
          </View>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.bottomBtn} activeOpacity={0.85} onPress={handleUpdateStatus}>
        <Text style={styles.bottomBtnText}>{buttonLabel}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DeliveryRequestScreen;
