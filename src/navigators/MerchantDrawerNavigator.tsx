import React from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ScreenNameEnum from '../routes/screenName.enum';
import MerchantDrawerContent from './MerchantDrawerContent';

 

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = Math.min(SCREEN_WIDTH * 0.78, 320);

export type MerchantDrawerParamList = {
  [ScreenNameEnum.MerchantDashboard]: undefined;
  [ScreenNameEnum.UploadOrders]: undefined;
  [ScreenNameEnum.ViewOrders]: undefined;
  [ScreenNameEnum.InvoicesScreen]: undefined;
  [ScreenNameEnum.ImportHistoryScreen]: undefined;
};

const Drawer = createDrawerNavigator<MerchantDrawerParamList>();

const MerchantDrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName={ScreenNameEnum.MerchantDashboard}
      drawerContent={(props) => <MerchantDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: DRAWER_WIDTH,
          backgroundColor: '#FFFFFF',
        },
        swipeEnabled: true,
        swipeEdgeWidth: 30,
        overlayColor: 'rgba(0,0,0,0.5)',
      }}
    >
     </Drawer.Navigator>
  );
};

export default MerchantDrawerNavigator;
