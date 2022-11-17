import React, { FC } from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import LoginPage from '@scenes/LoginPage';
import ModalPage from '@scenes/ModalPage';
import { routeOverlayOption } from './routeOptions';
import { userLogin } from '@redux/auth/selectors';
import { HomeNavigator } from './home.navigator';
import { HomeDrawer } from '@scenes/HomePage/Component/Drawer';
import HomePage from '@scenes/HomePage';

const RootStack = createStackNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const MainStackScreen: FC = () => {
  const currentUser = useSelector(userLogin);
  const isLogin = !isEmpty(currentUser) && currentUser.token;
  const initialRouteName = isLogin ? 'HomePage' : 'Login';
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      {!isLogin ? (
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
      ) : (
        <Stack.Screen
          name="Login"
          component={MainNavigator}
          options={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
      )}
    </Stack.Navigator>
  );
};

const MainNavigator = (): React.ReactElement => (
  <Drawer.Navigator drawerContent={props => <HomeDrawer {...props} />}>
    <Drawer.Screen name="Home" options={{ headerShown: false }} component={HomePage} />
    {/* <Drawer.Screen name="Libraries" component={LibrariesScreen} /> */}
  </Drawer.Navigator>
);

export const RootStackScreen: FC = () => {
  return (
    <RootStack.Navigator screenOptions={{ presentation: 'modal', ...routeOverlayOption }}>
      <RootStack.Screen
        name="Main"
        component={MainStackScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="MyModal"
        component={ModalPage}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
    </RootStack.Navigator>
  );
};
