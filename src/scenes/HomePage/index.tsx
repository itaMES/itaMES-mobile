import React, { FC, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@ui-kitten/components';
import NHCSafeAreaView from '@components/NHCSafeAreaView';
import { logoutRequest } from '@redux/actions';
import AuthContainer from '@components/AuthContainer';
import HomeIcon from './Component/HomeIcon';
import { View } from 'react-native';
import Menu from './Component/Menu';
import { DrawerActions, useNavigation } from '@react-navigation/native';

const Home: FC = () => {
  const navigation = useNavigation();

  return (
    <NHCSafeAreaView>
      <AuthContainer>
        <Menu />
        <Button onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>open drawer</Button>
      </AuthContainer>
    </NHCSafeAreaView>
  );
};

export default memo(Home);
