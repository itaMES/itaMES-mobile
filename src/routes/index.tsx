import React, { FC } from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Homepage from '@scenes/Homepage';
import LoginPage from '@scenes/LoginPage';
import OtherPage from '@scenes/OtherPage';
import ModalPage from '@scenes/ModalPage';
import { routeOverlayOption } from './routeOptions';
import { userLogin } from '@redux/auth/selectors';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

export const MainStackScreen: FC = () => {
  const currentUser = useSelector(userLogin);
  const isLogin = !isEmpty(currentUser) && currentUser.token;
  const initialRouteName = isLogin ? 'Home' : 'Login';
  return (
    <MainStack.Navigator initialRouteName={initialRouteName}>
      {!isLogin ? (
        <>
          <MainStack.Screen
            name="Login"
            component={LoginPage}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
        </>
      ) : (
        <>
          <MainStack.Screen
            name="Home"
            component={Homepage}
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
        </>
      )}
    </MainStack.Navigator>
  );
};

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
