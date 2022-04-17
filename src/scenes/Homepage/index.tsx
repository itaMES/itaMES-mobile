import React, { FC, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@ui-kitten/components';
import NHCSafeAreaView from '@components/NHCSafeAreaView';
import { logoutRequest } from '@redux/actions';
import AuthContainer from '@components/AuthContainer';

const Home: FC = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutRequest());
  };

  return (
    <NHCSafeAreaView>
      <AuthContainer>
        <Button onPress={() => logout()}>Logout</Button>
      </AuthContainer>
    </NHCSafeAreaView>
  );
};

export default memo(Home);
