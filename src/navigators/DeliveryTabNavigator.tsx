import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, Platform } from 'react-native';
import ScreenNameEnum from '../routes/screenName.enum';
import { color } from '../constant';
import imageIndex from '../assets/imageIndex';


import DeliveryNewTasksScreen from '../screen/DeliveryRole/DeliveryNewTasks/DeliveryNewTasksScreen';
import DeliveryToPickUpScreen from '../screen/DeliveryRole/DeliveryToPickUp/DeliveryToPickUpScreen';
import DeliveryDeliveringScreen from '../screen/DeliveryRole/DeliveryDelivering/DeliveryDeliveringScreen';
import DeliveryCompletedScreen from '../screen/DeliveryRole/DeliveryCompleted/DeliveryCompletedScreen';

export type DeliveryTabParamList = {
  [ScreenNameEnum.DeliveryNewTasks]: undefined;
  [ScreenNameEnum.DeliveryToPickUp]: undefined;
  [ScreenNameEnum.DeliveryDelivering]: undefined;
  [ScreenNameEnum.DeliveryCompleted]: undefined;
};

const Tab = createBottomTabNavigator<DeliveryTabParamList>();

const TAB_ICONS = {
  NewTasks: imageIndex.NewTasks,
  ToPickUp: imageIndex.ToPickUp,
  Delivering: imageIndex.Delivering,
  Completed: imageIndex.Completed,
} as const;

type TabIconKey = keyof typeof TAB_ICONS;

const tabIcon = (iconKey: TabIconKey, focused: boolean) => {
  const source = TAB_ICONS[iconKey];
  return (
    <Image
      source={source}
      style={[styles.tabIcon, focused ? styles.tabIconActive : styles.tabIconInactive]}
      resizeMode="contain"
    />
  );
};

const DeliveryTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName={ScreenNameEnum.DeliveryNewTasks}
      screenOptions={{
        headerShown: false,
        // tabBarStyle: styles.tabBar,
        // tabBarActiveTintColor: color.primary,
        // tabBarInactiveTintColor: '#94A3B8',
        // tabBarLabelStyle: styles.tabLabel,
        // tabBarItemStyle: styles.tabItem,
        // tabBarIconStyle: styles.tabIconWrap,
        // tabBarShowLabel: true,
        // tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name={ScreenNameEnum.DeliveryNewTasks}
        component={DeliveryNewTasksScreen}
        options={{
          tabBarLabel: 'New Tasks',
          tabBarIcon: ({ focused }) => tabIcon('NewTasks', focused),
        }}
      />
      <Tab.Screen
        name={ScreenNameEnum.DeliveryToPickUp}
        component={DeliveryToPickUpScreen}
        options={{
          tabBarLabel: 'To Pick Up',
          tabBarIcon: ({ focused }) => tabIcon('ToPickUp', focused),
        }}
      />
      <Tab.Screen
        name={ScreenNameEnum.DeliveryDelivering}
        component={DeliveryDeliveringScreen}
        options={{
          tabBarLabel: 'Delivering',
          tabBarIcon: ({ focused }) => tabIcon('Delivering', focused),
        }}
      />
      <Tab.Screen
        name={ScreenNameEnum.DeliveryCompleted}
        component={DeliveryCompletedScreen}
        options={{
          tabBarLabel: 'Completed',
          tabBarIcon: ({ focused }) => tabIcon('Completed', focused),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 28 : 20,
    height: Platform.OS === 'ios' ? 88 : 76,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
      },
      android: {
        elevation: 16,
        overflow: 'hidden',
      },
    }),
  },
  tabIconWrap: {
    marginBottom: Platform.OS === 'android' ? 4 : 2,
  },
  tabIcon: {
    width: 26,
    height: 26,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabIconInactive: {
    opacity: 0.6,
  },
  tabLabel: {
    fontSize: Platform.OS === 'android' ? 12 : 11,
    fontWeight: '600',
    ...(Platform.OS === 'android' && { marginBottom: 2 }),
  },
  tabItem: {
    paddingTop: Platform.OS === 'android' ? 6 : 4,
    ...(Platform.OS === 'android' && { paddingBottom: 4, minHeight: 48 }),
  },
});

export default DeliveryTabNavigator;
