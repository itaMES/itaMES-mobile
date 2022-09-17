import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import HomePage from '@scenes/HomePage';
import OtherPage from '@scenes/OtherPage';
import ExamplePage from '@scenes/ExamplePage';

const Stack = createStackNavigator();

export const HomeNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen
      name="HomePage"
      component={HomePage}
      options={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    />
    <Stack.Screen
      name="ExamplePage"
      component={ExamplePage}
      options={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    />
    <Stack.Screen
      name="OtherPage"
      component={OtherPage}
      options={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    />
  </Stack.Navigator>
);
