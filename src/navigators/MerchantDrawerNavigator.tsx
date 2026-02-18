import React from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ScreenNameEnum from '../routes/screenName.enum';
import MerchantDrawerContent from './MerchantDrawerContent';

import MerchantDashboard from '../screen/MerchantRole/DashBoard/MerchantDashboard';
import UploadOrders from '../screen/MerchantRole/UploadOrders/UploadOrders';
import ViewOrders from '../screen/MerchantRole/ViewOrders/ViewOrders';
import InvoicesScreen from '../screen/MerchantRole/Invoices/InvoicesScreen';
import ImportHistoryScreen from '../screen/MerchantRole/ImportHistory/ImportHistoryScreen';

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
      <Drawer.Screen
        name={ScreenNameEnum.MerchantDashboard}
        component={MerchantDashboard}
        options={{ drawerLabel: 'Home' }}
      />
      <Drawer.Screen
        name={ScreenNameEnum.UploadOrders}
        component={UploadOrders}
        options={{ drawerLabel: 'Upload Orders' }}
      />
      <Drawer.Screen
        name={ScreenNameEnum.ViewOrders}
        component={ViewOrders}
        options={{ drawerLabel: 'Orders' }}
      />
      <Drawer.Screen
        name={ScreenNameEnum.InvoicesScreen}
        component={InvoicesScreen}
        options={{ drawerLabel: 'Invoices' }}
      />
      <Drawer.Screen
        name={ScreenNameEnum.ImportHistoryScreen}
        component={ImportHistoryScreen}
        options={{ drawerLabel: 'Import History' }}
      />
    </Drawer.Navigator>
  );
};

export default MerchantDrawerNavigator;
