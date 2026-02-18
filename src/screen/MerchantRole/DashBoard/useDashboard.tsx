import { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
 import { STATUS } from '../../../utils/Constant';

// Dummy orders for UI when API returns empty (today, tomorrow, scheduled)
const getDummyOrderData = () => {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayMid = new Date(todayStart.getTime() + 9 * 60 * 60 * 1000 + 8 * 60 * 1000); // 09:08
  const todayEvening = new Date(todayStart.getTime() + 21 * 60 * 60 * 1000); // 09:00 PM
  const tomorrowStart = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);
  const tomorrowMid = new Date(tomorrowStart.getTime() + 10 * 60 * 60 * 1000);
  const scheduledStart = new Date(tomorrowStart.getTime() + 24 * 60 * 60 * 1000);
  const scheduledMid = new Date(scheduledStart.getTime() + 14 * 60 * 60 * 1000);

  return [
    { id: 'd1', trackingId: '1043', receiverName: 'Cheyenne Torff', deliveryStatus: STATUS.ON_THE_WAY, createdAt: todayMid.toISOString(), toCity: 'Downtown' },
    { id: 'd2', trackingId: '1044', receiverName: 'Lindsey Press', deliveryStatus: STATUS.DELIVERED, createdAt: todayEvening.toISOString(), toCity: 'Midtown' },
    { id: 'd3', trackingId: '1045', receiverName: 'John Smith', deliveryStatus: STATUS.ASSIGNED, createdAt: todayMid.toISOString(), toCity: 'Uptown' },
    { id: 'd4', trackingId: '1046', receiverName: 'Sarah Wilson', deliveryStatus: STATUS.PICKED_UP, createdAt: todayMid.toISOString(), toCity: 'West End' },
    { id: 'd5', trackingId: '1047', receiverName: 'Mike Johnson', deliveryStatus: STATUS.CANCELLED, createdAt: todayStart.toISOString(), toCity: 'East Side' },
    { id: 'd6', trackingId: '1048', receiverName: 'Emma Davis', deliveryStatus: STATUS.PENDING, createdAt: tomorrowMid.toISOString(), toCity: 'Central' },
    { id: 'd7', trackingId: '1049', receiverName: 'James Brown', deliveryStatus: STATUS.GOING_TO_PICKUP, createdAt: tomorrowMid.toISOString(), toCity: 'North' },
    { id: 'd8', trackingId: '1050', receiverName: 'Olivia Green', deliveryStatus: STATUS.PENDING, createdAt: scheduledMid.toISOString(), toCity: 'South' },
    { id: 'd9', trackingId: '1051', receiverName: 'David Lee', deliveryStatus: STATUS.ASSIGNED, createdAt: scheduledMid.toISOString(), toCity: 'Harbor' },
  ];
};

const useDashboard = () => {
  const navigation = useNavigation();
  const [address, setAddress] = useState("");
  const [locationModal, setlocationModal] = useState(false);
  const [location, setLocation] = useState(null);
  const [currentlocation, setcurrentlocation] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [orderData, setorderData] = useState<any[]>(getDummyOrderData());
 
   const locationRef: any = useRef(null);
 
 

 

  const getParceldetailsApi = async () => {
    
  };



 


 
 

  useEffect(() => {
    getParceldetailsApi();
  }, []);

 

  return {
    navigation,
    address, setAddress,
    location, setLocation,
    locationModal, setlocationModal,
    locationRef,
    currentlocation,
    isLoading,
    orderData
  };
};

export default useDashboard;
