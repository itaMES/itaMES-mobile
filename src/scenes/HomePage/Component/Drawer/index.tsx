import React, { ReactElement, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Avatar,
  Divider,
  Drawer,
  DrawerItem,
  DrawerElement,
  Layout,
  Text,
  IndexPath,
  Button,
} from '@ui-kitten/components';
import { SafeAreaLayout } from '@components/SafeAreaLayout';
import { useDispatch } from 'react-redux';
import { logoutRequest } from '@redux/actions';
// import { AppInfoService } from '../../services/app-info.service';

// const version: string = AppInfoService.getVersion();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const HomeDrawer = ({ navigation }): DrawerElement => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutRequest());
  };

  const DATA = [
    {
      title: 'Account',
      onPress: () => {
        navigation.toggleDrawer();
        navigation.navigate('Account');
      },
    },
    {
      title: 'Setting',
      onPress: () => {
        navigation.toggleDrawer();
        navigation.navigate('Setting');
      },
    },
  ];

  const renderHeader = (): ReactElement => (
    <SafeAreaLayout insets="top" level="2">
      <Layout style={styles.header} level="2">
        <View style={styles.profileContainer}>
          <Text style={styles.profileName} category="h6">
            Kitten Tricks
          </Text>
        </View>
      </Layout>
    </SafeAreaLayout>
  );

  const renderFooter = () => (
    <SafeAreaLayout insets="bottom">
      <React.Fragment>
        <Divider />
        <View style={styles.footer}>
          <Button size="small" appearance="outline" onPress={() => logout()}>
            Logout
          </Button>
          {/* <Text>{`Version ${AppInfoService.getVersion()}`}</Text> */}
        </View>
      </React.Fragment>
    </SafeAreaLayout>
  );

  return (
    <Drawer header={renderHeader} footer={renderFooter}>
      {DATA.map((el, index) => (
        <DrawerItem key={index} title={el.title} onPress={el.onPress} />
      ))}
    </Drawer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    height: 128,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    marginHorizontal: 16,
  },
});
