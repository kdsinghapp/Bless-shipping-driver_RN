import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Linking,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import DeclineReasonModal, { DeclineReasonKey } from '../../../compoent/DeclineReasonModal';
import ArrivalConfirmationModal from '../../../compoent/ArrivalConfirmationModal';
import DeliveryCompletedModal from '../../../compoent/DeliveryCompletedModal';
import ScreenNameEnum from '../../../routes/screenName.enum';
import imageIndex from '../../../assets/imageIndex';
import { color } from '../../../constant';
import { GetDriverOrderDetailsApi } from '../../../Api/apiRequest';
import { ActivityIndicator } from 'react-native';

type PodStatus = 'idle' | 'uploading' | 'error' | 'success';

type OrderStatusStep = 'assigned' | 'accepted' | 'arrived' | 'delivered' | 'completed';

const STATUS_STEPS: { key: OrderStatusStep; label: string }[] = [
  { key: 'accepted', label: 'Assigned' },
  { key: 'arrived', label: 'Accepted' },
  { key: 'delivered', label: 'Arrived' },
  { key: 'completed', label: 'Delivered' },
];

type OrderData = {
  id: string;
  orderId: string;
  pickupLocation: string;
  pickupAddress: string;
  name: string;
  postalCode: string;
  height: string;
  receiverName: string;
  receiverPhone: string;
  weight: string;
  deliveryLocation?: string;
  senderName?: string;
  productCode?: string;
  charges?: string;
};

const defaultOrder: OrderData = {
  id: '',
  orderId: 'SR9G07R',
  pickupLocation: '1234 Elm Street Springfield, IL 62701',
  pickupAddress: 'Indrapuri Colony, Bhawar Kuan, Indore, Madhya Pradesh - 452001',
  name: 'Rahul Verma',
  postalCode: '452001',
  height: '4.5 ft',
  receiverName: 'Ayesha Khan',
  receiverPhone: '+91 98765 43210',
  weight: '6.2 kg',
};

type RouteParams = { order?: Partial<OrderData>; isAccepted?: boolean };

const DeliveryOrderDetailsScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const paramOrder = route.params?.order;
  const isAcceptedFromParam = route.params?.isAccepted ?? false;
  const order: OrderData = { ...defaultOrder, ...paramOrder, id: paramOrder?.id ?? defaultOrder.id };

  const [currentStatus, setCurrentStatus] = useState<OrderStatusStep>(isAcceptedFromParam ? 'accepted' : 'assigned');
  const [declineModalVisible, setDeclineModalVisible] = useState(false);
  const [arrivalModalVisible, setArrivalModalVisible] = useState(false);
  const [completedModalVisible, setCompletedModalVisible] = useState(false);
  const [isAccepted, setIsAccepted] = useState(isAcceptedFromParam);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [podStatus, setPodStatus] = useState<PodStatus>('idle');
  const [podProgress, setPodProgress] = useState(0);
  const [podPhotoUri, setPodPhotoUri] = useState<string | null>(null);
  const uploadSimulationRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    if (order.id) {
      fetchOrderDetails();
    }
  }, [order.id]);

  const fetchOrderDetails = async () => {
    const data = await GetDriverOrderDetailsApi(order.id, setIsLoading);
    if (data) {
      setOrderData({
        id: data._id,
        orderId: data.orderNumber,
        pickupLocation: data.pickupAddress,
        pickupAddress: data.pickupAddress,
        name: data.recipientName,
        postalCode: 'N/A', // Update if API returns this
        height: 'N/A', // Update if API returns this
        receiverName: data.recipientName,
        receiverPhone: data.recipientPhone,
        weight: 'N/A', // Update if API returns this
        deliveryLocation: data.dropAddress,
      });
    }
  };

  const isStatusDone = (key: OrderStatusStep) => {
    if (currentStatus === 'assigned') return false;
    const statusOrder: OrderStatusStep[] = ['accepted', 'arrived', 'delivered', 'completed'];
    const curIdx = statusOrder.indexOf(currentStatus);
    const keyIdx = statusOrder.indexOf(key);
    if (key === 'delivered') return currentStatus === 'completed';
    return keyIdx < curIdx || (keyIdx === curIdx && currentStatus === 'completed');
  };
  const isStatusActive = (key: OrderStatusStep) => {
    if (currentStatus === 'assigned') return key === 'accepted';
    if (key === 'delivered') return currentStatus === 'arrived';
    return key === currentStatus;
  };

  const onAccept = () => {
    setIsAccepted(true);
    setCurrentStatus('accepted');
  };

  const onDecline = () => setDeclineModalVisible(true);

  const onSubmitDecline = (_reasonKey: DeclineReasonKey, _reasonLabel: string) => {
    setDeclineModalVisible(false);
    navigation.goBack();
  };

  const openMaps = () => {
    const address = order.pickupAddress || order.pickupLocation;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    Linking.openURL(url).catch(() => {});
  };

  const onCallCustomer = () => {
    const tel = order.receiverPhone.replace(/\s/g, '');
    Linking.openURL(`tel:${tel}`).catch(() => {});
  };

  const onMarkArrivedPress = () => {
    if (currentStatus === 'accepted') setArrivalModalVisible(true);
  };
  const onMarkArrived = onMarkArrivedPress;

  const onConfirmArrival = () => {
    setArrivalModalVisible(false);
    setCurrentStatus('arrived');
  };

  const onCompleteDelivery = () => {
    setCurrentStatus('completed');
    setCompletedModalVisible(true);
  };

  const onContinueNewDay = () => {
    setCompletedModalVisible(false);
    navigation.navigate(ScreenNameEnum.DeliveryDrawer);
  };

  const onViewAllOrder = () => {
    setCompletedModalVisible(false);
    navigation.navigate(ScreenNameEnum.DeliveryDrawer);
  };

  const onReportFailure = () => {
    navigation.navigate(ScreenNameEnum.DeliveryFailed, {
      order: {
        orderId: order.orderId,
        receiverName: order.receiverName,
        address: order.pickupAddress || order.pickupLocation,
      },
    });
  };

  const copyPickupAddress = () => {
    Alert.alert('Pickup Address', order.pickupAddress);
  };

  const simulateUpload = (uri: string, simulateError = false) => {
    setPodStatus('uploading');
    setPodProgress(0);
    setPodPhotoUri(uri);
    let progress = 0;
    uploadSimulationRef.current = setInterval(() => {
      progress += Math.random() * 15 + 8;
      if (progress >= 100) {
        if (uploadSimulationRef.current) clearInterval(uploadSimulationRef.current);
        uploadSimulationRef.current = null;
        setPodProgress(100);
        if (simulateError) {
          setPodStatus('error');
          setPodPhotoUri(null);
        } else {
          setPodStatus('success');
        }
        return;
      }
      setPodProgress(Math.min(Math.floor(progress), 99));
    }, 200);
  };

  const startPodUpload = () => {
    const isWeb = Platform.OS === 'web';
    if (isWeb && typeof document !== 'undefined') {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e: Event) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;
        const uri = URL.createObjectURL(file);
        simulateUpload(uri, false);
      };
      input.click();
      return;
    }
    launchImageLibrary({ mediaType: 'photo', quality: 0.7 }, (response) => {
      if (response.didCancel || !response.assets?.[0]?.uri) return;
      const uri = response.assets[0].uri;
      simulateUpload(uri, false);
    });
  };

  const reUploadPod = () => {
    setPodStatus('idle');
    setPodProgress(0);
    setPodPhotoUri(null);
    startPodUpload();
  };

  const changePodPhoto = () => {
    setPodStatus('idle');
    setPodProgress(0);
    setPodPhotoUri(null);
    startPodUpload();
  };

  const podSuccess = podStatus === 'success';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBarComponent barStyle="dark-content" backgroundColor="#fff" />

      {/* Header: Back, Title, Route locked badge */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
          <Image source={imageIndex.back} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
        {isAccepted ? (
          <View style={styles.routeLockBadge}>
            <Image source={imageIndex.lock} style={styles.lockIcon} resizeMode="contain" />
            <Text style={styles.routeLockText}>route locked after acceptance</Text>
          </View>
        ) : (
          <View style={styles.headerBtn} />
        )}
      </View>

      {/* Order Status timeline */}
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 100 }}>
          <ActivityIndicator size="large" color={color.primary} />
        </View>
      ) : orderData ? (
        <>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Order card */}
            <View style={styles.card}>
              <View style={styles.packageIconWrap}>
                <Image source={imageIndex.order2} style={styles.packageIcon} resizeMode="contain" />
              </View>

              <Text style={styles.sectionLabel}>Pickup Location</Text>
              <Text style={styles.addressText}>{orderData.pickupLocation}</Text>

              <View style={styles.twoColRow}>
                <View style={styles.col}>
                  <Text style={styles.fieldLabel}>Name</Text>
                  <Text style={styles.fieldValue}>{orderData.name}</Text>
                  <Text style={styles.fieldLabel}>Postal Code</Text>
                  <Text style={styles.fieldValue}>{orderData.postalCode}</Text>
                  <Text style={styles.fieldLabel}>Order Number</Text>
                  <Text style={styles.fieldValue}>{orderData.orderId}</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.fieldLabel}>Receiver Name</Text>
                  <Text style={styles.fieldValue}>{orderData.receiverName}</Text>
                  <Text style={styles.fieldLabel}>Receiver Phone Number</Text>
                  <Text style={styles.fieldValue}>{orderData.receiverPhone}</Text>
                  <Text style={styles.fieldLabel}>Drop Address</Text>
                  <Text style={styles.fieldValue}>{orderData.deliveryLocation}</Text>
                </View>
              </View>

              <View style={styles.pickupAddressRow}>
                <Text style={styles.sectionLabel}>Full Address</Text>
                <TouchableOpacity onPress={() => Alert.alert('Address', orderData.pickupAddress)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <Image source={imageIndex.copy} style={styles.copyIcon} resizeMode="contain" />
                </TouchableOpacity>
              </View>
              <Text style={styles.addressText}>{orderData.pickupAddress}</Text>
            </View>

            {/* Order Status timeline */}
            <View style={styles.statusSection}>
              <Text style={styles.statusTitle}>Order Status</Text>
              <Text style={styles.statusSubtitle}>System generated timeline</Text>
              <View style={styles.timelineWrap}>
                {STATUS_STEPS.map((step, index) => (
                  <React.Fragment key={step.key}>
                    <View style={styles.timelineItem}>
                      <View
                        style={[
                          styles.timelineCircle,
                          (isStatusDone(step.key) || isStatusActive(step.key)) && styles.timelineCircleActive,
                        ]}
                      >
                        {isStatusDone(step.key) ? (
                          <Text style={styles.timelineCheck}>✓</Text>
                        ) : (
                          <Image
                            source={
                              step.key === 'accepted'
                                ? imageIndex.Assigned
                                : step.key === 'arrived'
                                ? imageIndex.Accepted
                                : step.key === 'delivered'
                                ? imageIndex.Arrived
                                : imageIndex.Delivered
                            }
                            style={[
                              styles.timelineIcon,
                              isStatusActive(step.key) && styles.timelineIconActive,
                            ]}
                            resizeMode="contain"
                          />
                        )}
                      </View>
                      <Text
                        style={[
                          styles.timelineLabel,
                          (isStatusDone(step.key) || isStatusActive(step.key)) && styles.timelineLabelActive,
                        ]}
                        numberOfLines={1}
                      >
                        {step.label}
                      </Text>
                    </View>
                    {index < STATUS_STEPS.length - 1 && (
                      <View style={[styles.timelineLine, isStatusDone(step.key) && styles.timelineLineActive]} />
                    )}
                  </React.Fragment>
                ))}
              </View>
            </View>

            {/* POD section - when arrived */}
            {currentStatus === 'arrived' && (
              <View style={styles.podSection}>
                <Text style={[styles.podSectionTitle,{
                  textAlign:"center"
                }]}>Delivered (POD Required)</Text>
                <TouchableOpacity
                  style={styles.podBox}
                  onPress={() => {
                    if (podStatus === 'uploading') return;
                    if (podStatus === 'success') changePodPhoto();
                    else if (podStatus === 'error') reUploadPod();
                    else startPodUpload();
                  }}
                  activeOpacity={0.85}
                  disabled={podStatus === 'uploading'}
                >
                  {podStatus === 'success' && podPhotoUri ? (
                    <Image source={{ uri: podPhotoUri }} style={styles.podThumbnail} resizeMode="cover" />
                  ) : (
                    <Image source={imageIndex.document} style={styles.podIcon} resizeMode="contain" />
                  )}
                  <View style={styles.podBoxText}>
                    <Text style={styles.podBoxLabel}>
                      {podStatus === 'success' ? 'Proof of delivery uploaded' : 'Upload proof of delivery'}
                    </Text>
                    <Text style={[styles.podBoxSub, podStatus === 'error' && styles.podBoxSubError]}>
                      {podStatus === 'idle' && 'Upload updated if available'}
                      {podStatus === 'error' && 'Uploaded. Please try again.'}
                      {podStatus === 'uploading' && `uploading_photo....(${podProgress}%)`}
                      {podStatus === 'success' && 'Photo uploaded successfully'}
                    </Text>
                    <View style={styles.podActionRow}>
                      {podStatus === 'idle' && (
                        <Text style={styles.podActionButton}>Upload or Photo</Text>
                      )}
                      {podStatus === 'error' && (
                        <Text style={styles.podActionButton}>Re-Upload</Text>
                      )}
                      {podStatus === 'uploading' && null}
                      {podStatus === 'success' && (
                        <Text style={styles.podActionButton}>Change Photo</Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              
              </View>
            )}
            <View style={styles.podInstructions}>
              <Text style={styles.podInstructionsTitle}>Photo requirements:</Text>
              <Text style={styles.podInstructionItem}>• Parcel clearly visible</Text>
              <Text style={styles.podInstructionItem}>• Receiver name | parcel label visible</Text>
              <Text style={styles.podInstructionItem}>• Photo should not be blurred</Text>
            </View>
            <View style={styles.bottomSpacer} />
          </ScrollView>

          {/* Bottom action buttons */}
          <View style={styles.bottomActions}>
            {!isAccepted ? (
              <>
                <TouchableOpacity style={[styles.btnOutlineBlue, { backgroundColor: '#035093' }]} onPress={openMaps} activeOpacity={0.85}>
                  <Image source={imageIndex.locationpin} style={styles.btnIcon} resizeMode="contain" />
                  <Text style={[styles.btnOutlineBlueText, { color: 'white' }]}>Open In Google Maps</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnOutlineRed} onPress={onDecline} activeOpacity={0.85}>
                  <Text style={styles.btnOutlineRedText}>Decline</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnSolidGreen} onPress={onAccept} activeOpacity={0.85}>
                  <Text style={styles.btnSolidGreenText}>Accept</Text>
                </TouchableOpacity>
              </>
            ) : currentStatus === 'accepted' ? (
              <>
                <TouchableOpacity style={styles.btnDarkBlue} onPress={openMaps} activeOpacity={0.85}>
                  <Image source={imageIndex.locationpin2} style={styles.btnIconWhite} resizeMode="contain" />
                  <Text style={styles.btnWhiteText}>Open In Google Maps</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnCyan} onPress={onCallCustomer} activeOpacity={0.85}>
                  <Image source={imageIndex.Calls} style={styles.btnIconWhite} resizeMode="contain" />
                  <Text style={styles.btnWhiteText}>Call Customer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnGreen} onPress={onMarkArrivedPress} activeOpacity={0.85}>
                  <Text style={styles.btnWhiteText}>Mark Arrived</Text>
                </TouchableOpacity>
              </>
            ) : currentStatus === 'arrived' ? (
              <>
                <TouchableOpacity style={styles.btnGreen} onPress={openMaps} activeOpacity={0.85}>
                  {/* <Image source={imageIndex.locationpin2} style={styles.btnIconWhite} resizeMode="contain" /> */}
                  <Text style={styles.btnWhiteText}>Open in Google Maps</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnReportFailure} onPress={onReportFailure} activeOpacity={0.85}>
                  <Text style={styles.btnReportFailureText}>Report a failure</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.btnSubmit, !podSuccess && styles.btnSubmitDisabled]}
                  onPress={onCompleteDelivery}
                  activeOpacity={0.85}
                  disabled={!podSuccess}
                >
                  <Text style={[styles.btnSubmitText, !podSuccess && styles.btnSubmitTextDisabled]}>Submit</Text>
                </TouchableOpacity>
              </>
            ) : null}
          </View>
        </>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: color.grey }}>Order details not found.</Text>
        </View>
      )}

      <ArrivalConfirmationModal
        visible={arrivalModalVisible}
        onClose={() => setArrivalModalVisible(false)}
        onConfirmArrival={onConfirmArrival}
        onCallCustomer={onCallCustomer}
        customerName={order.receiverName}
      />

      <DeliveryCompletedModal
        visible={completedModalVisible}
        onContinueNewDay={onContinueNewDay}
        onViewAllOrder={onViewAllOrder}
        orderId={`#${order.orderId}`}
        driverName={order.name}
      />

      <DeclineReasonModal
        visible={declineModalVisible}
        onClose={() => setDeclineModalVisible(false)}
        onSubmit={onSubmitDecline}
        taskId={order.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
   },
  headerBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 40,
    height: 40,
   },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  routeLockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
    maxWidth: 160,
  },
  lockIcon: {
    width: 14,
    height: 14,
    tintColor: '#DC2626',
  },
  routeLockText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#DC2626',
  },
  scroll: { flex: 1 },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  packageIconWrap: {
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
     alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  packageIcon: {
    width: 77,
    height: 77,
   },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: 'black',
    marginBottom: 6,
  },
  addressText: {
    fontSize: 14,
    color: 'black',
    lineHeight: 20,
    marginBottom: 16,
  },
  twoColRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  col: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 2,
  },
  fieldValue: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 10,
  },
  pickupAddressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  copyIcon: {
    width: 18,
    height: 18,
    tintColor: '#64748B',
  },
  statusSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding:10,
   },
  statusTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
    marginBottom: 4,
  },
  statusSubtitle: {
    fontSize: 13,
    color: '#808080',
    marginBottom: 16,
  },
  timelineWrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  timelineItem: {
    alignItems: 'center',
   },
  timelineCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineCircleActive: {
    borderWidth: 2,
    borderColor: '#22C55E',
    borderRadius: 28,
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
  },
  timelineIcon: {
    width: 47,
    height: 47,
   },
  timelineIconActive: {
    tintColor: '#22C55E',
  },
  timelineCheck: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C55E',
  },
  timelineLabel: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
        marginTop:8

  },
  timelineLabelActive: {
    color: '#22C55E',
  },
  timelineLine: {
    width: 16,
    height: 2,
    backgroundColor: '#E2E8F0',
    marginTop: 16,
    marginBottom: 22,
  },
  timelineLineActive: {
    backgroundColor: '#22C55E',
  },
  bottomSpacer: { height: 24 },
  bottomActions: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
     borderTopColor: '#E2E8F0',
    gap: 10,
  },
  btnDarkBlue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#1E3A5F',
    gap: 8,
  },
  btnCyan: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#0EA5E9',
    gap: 8,
  },
  btnGreen: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#22C55E',
  },
  btnWhiteText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  btnIconWhite: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
  },
  btnOutlineBlue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: color.primary,
    gap: 8,
  },
  btnOutlineBlueText: {
    fontSize: 15,
    fontWeight: '600',
    color: color.primary,
  },
  btnIcon: {
    width: 20,
    height: 20,
    tintColor:"white"
   },
  btnOutlineRed: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: color.red,
  },
  btnOutlineRedText: {
    fontSize: 15,
    fontWeight: '600',
    color: color.red,
  },
  btnSolidGreen: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#22C55E',
  },
  btnSolidGreenText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  podSection: {
 backgroundColor: '#FFFFFF',
borderRadius: 14,
padding: 20,
marginBottom: 20,

// ✅ Android shadow
elevation: 6,

// ✅ iOS shadow
shadowColor: '#000',
shadowOffset: { width: 0, height: 3 },
shadowOpacity: 0.15,
shadowRadius: 6,

 
  },
  podSectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 12,
  },
  podBox: {
     alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#5DCF00',
    gap: 12,
    justifyContent:"center" ,
    borderStyle:"dashed"
  },
  podIcon: {
    width: 32,
    height: 32,
    tintColor: '#64748B',
  },
  podBoxText: { flex: 1 },
  podBoxLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  podBoxSub: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
  },
  podBoxSubError: {
    color: '#DC2626',
  },
  podThumbnail: {
    width: 200,
    height: 200,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  podActionRow: {
    marginTop: 8,
    justifyContent:"center",
    alignItems:"center"
  },
  podActionButton: {
    fontSize: 14,
    fontWeight: '600',
    color: color.primary,
  },
  podInstructions: {
    marginTop: 5,
    paddingTop: 12,
    padding:12
 
  },
  podInstructionsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
  },
  podInstructionItem: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 4,
    lineHeight: 20,
  },
  btnSubmit: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: color.primary,
  },
  btnSubmitDisabled: {
    backgroundColor: '#E2E8F0',
  },
  btnSubmitText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  btnSubmitTextDisabled: {
    color: '#94A3B8',
  },
  btnReportFailure: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  btnReportFailureText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#64748B',
  },
});

export default DeliveryOrderDetailsScreen;
