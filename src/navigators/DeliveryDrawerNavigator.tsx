import React from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ScreenNameEnum from '../routes/screenName.enum';
import DeliveryDrawerContent from './DeliveryDrawerContent';

import DeliveryTabNavigator from './DeliveryTabNavigator';
import DeliveryOrdersList from '../screen/DeliveryRole/DeliveryOrdersList/DeliveryOrdersList';
import DeliveryProfileScreen from '../screen/DeliveryRole/DeliveryProfile/DeliveryProfileScreen';
import DeliveryEarningsScreen from '../screen/DeliveryRole/DeliveryEarnings/DeliveryEarningsScreen';
import DeliveryPayoutHistoryScreen from '../screen/DeliveryRole/DeliveryPayoutHistory/DeliveryPayoutHistoryScreen';
import DeliveryDocumentsScreen from '../screen/DeliveryRole/DeliveryDocuments/DeliveryDocumentsScreen';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = Math.min(SCREEN_WIDTH * 0.78, 320);

export type DeliveryDrawerParamList = {
  [ScreenNameEnum.DeliveryTabNavigator]: undefined;
  [ScreenNameEnum.DeliveryOrdersList]: undefined;
  [ScreenNameEnum.DeliveryProfileScreen]: undefined;
  [ScreenNameEnum.DeliveryEarningsScreen]: undefined;
  [ScreenNameEnum.DeliveryPayoutHistoryScreen]: undefined;
  [ScreenNameEnum.DeliveryDocumentsScreen]: undefined;
};

const Drawer = createDrawerNavigator<DeliveryDrawerParamList>();

const DeliveryDrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName={ScreenNameEnum.DeliveryTabNavigator}
      drawerContent={(props) => <DeliveryDrawerContent {...props} />}
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
        name={ScreenNameEnum.DeliveryTabNavigator}
        component={DeliveryTabNavigator}
        options={{ drawerLabel: 'Home' }}
      />
      <Drawer.Screen
        name={ScreenNameEnum.DeliveryOrdersList}
        component={DeliveryOrdersList}
        options={{ drawerLabel: 'Orders' }}
      />
      <Drawer.Screen
        name={ScreenNameEnum.DeliveryProfileScreen}
        component={DeliveryProfileScreen}
        options={{ drawerLabel: 'Profile' }}
      />
      <Drawer.Screen
        name={ScreenNameEnum.DeliveryEarningsScreen}
        component={DeliveryEarningsScreen}
        options={{ drawerLabel: 'Earnings' }}
      />
      <Drawer.Screen
        name={ScreenNameEnum.DeliveryPayoutHistoryScreen}
        component={DeliveryPayoutHistoryScreen}
        options={{ drawerLabel: 'Payout History' }}
      />
      <Drawer.Screen
        name={ScreenNameEnum.DeliveryDocumentsScreen}
        component={DeliveryDocumentsScreen}
        options={{ drawerLabel: 'Documents' }}
      />
    </Drawer.Navigator>
  );
};

export default DeliveryDrawerNavigator;
