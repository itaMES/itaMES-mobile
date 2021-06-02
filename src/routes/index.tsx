import React, { FC } from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Homepage from '@/scenes/Homepage';
import OtherPage from '@/scenes/OtherPage';
import ModalPage from '@/scenes/ModalPage';
import LoginPage from '@/scenes/Login';
import { routeOverlayOption } from './routeOptions';
import { Alert } from 'react-native';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent: FC = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props} /> */}
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
      <DrawerItem
        label="Other Page"
        onPress={() => props.navigation.navigate('OtherPage')}
      />
      <DrawerItem
        label="Profile"
        onPress={() => Alert.alert('Navigate to Profile')}
      />
    </DrawerContentScrollView>
  );
}

export const MainStackScreen: FC = () => {
  return (
    <MainStack.Navigator initialRouteName={'Login'}>
      <MainStack.Screen
        name="Home"
        component={Homepage}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <MainStack.Screen
        name="Login"
        component={LoginPage}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <MainStack.Screen
        name="OtherPage"
        component={OtherPage}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </MainStack.Navigator>
  );
};

export const DrawerStackScreen: FC = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Main"
        component={MainStackScreen}
        options={{
          headerShown: false,
        }} />
    </Drawer.Navigator>
  );
}

export const RootStackScreen: FC = () => {
  return (
    <RootStack.Navigator mode="modal" screenOptions={routeOverlayOption}>
      <RootStack.Screen
        name="Drawer"
        component={DrawerStackScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <RootStack.Screen
        name="Modal"
        component={ModalPage}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
    </RootStack.Navigator>
  );
};
