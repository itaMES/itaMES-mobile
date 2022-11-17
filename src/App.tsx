import React, { FC, Suspense, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout } from '@ui-kitten/components';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store, persistor } from '@redux/store';
import { isMountedRef, navigationRef } from '@routes/navigationUtils';
import Splashscreen from '@components/Splashscreen';
import GlobalModal from '@components/GlobalModal';
import { AntDesignIconsPack } from '@components/IconsAdapter/antdesign-icons';
import { EntypoIconsPack } from '@components/IconsAdapter/entypo-icons';
import { EvilIconsPack } from '@components/IconsAdapter/evil-icons';
import { FeatherIconsPack } from '@components/IconsAdapter/feather-icons';
import { FontAwesomeIconsPack } from '@components/IconsAdapter/fontawesome-icons';
import { FontAwesome5IconsPack } from '@components/IconsAdapter/fontawesome5-icons';
import { FontistoIconsPack } from '@components/IconsAdapter/fontisto-icons';
import { FoundationIconsPack } from '@components/IconsAdapter/foundation-icons';
import { IoniconsIconsPack } from '@components/IconsAdapter/ionicons-icons';
import { MaterialIconsPack } from '@components/IconsAdapter/material-icons';
import { MaterialCommunityIconsPack } from '@components/IconsAdapter/materialcommunity-icons';
import { OcticonsIconsPack } from '@components/IconsAdapter/octicons-icons';
import { SimpleLineIconsIconsPack } from '@components/IconsAdapter/simpleline-icons';
import { ZocialIconsPack } from '@components/IconsAdapter/zocial-icons';
import { RootStackScreen } from '@routes';
import '@i18n';
import theme, { globalStyle } from '@theme';
import { palette } from '@theme/colors';

enableScreens();

const App: FC = () => {
  useEffect(() => {
    isMountedRef.current = true;

    return () => (isMountedRef.current = false);
  }, []);

  return (
    <Suspense fallback={<Splashscreen />}>
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <IconRegistry
          icons={[
            AntDesignIconsPack,
            EntypoIconsPack,
            EvilIconsPack,
            FeatherIconsPack,
            FontAwesomeIconsPack,
            FontAwesome5IconsPack,
            FontistoIconsPack,
            FoundationIconsPack,
            IoniconsIconsPack,
            MaterialIconsPack,
            MaterialCommunityIconsPack,
            OcticonsIconsPack,
            SimpleLineIconsIconsPack,
            ZocialIconsPack,
          ]}
        />
        <Provider store={store}>
          <PersistGate loading={<Splashscreen />} persistor={persistor}>
            <SafeAreaProvider>
              <NavigationContainer ref={navigationRef}>
                <StatusBar barStyle="light-content" backgroundColor={palette.NEUTRAL_LIGHT} />

                <Layout style={[globalStyle.flex1, globalStyle.justifyCenter]}>
                  <RootStackScreen />
                </Layout>
                <GlobalModal />
              </NavigationContainer>
            </SafeAreaProvider>
          </PersistGate>
        </Provider>
      </ApplicationProvider>
    </Suspense>
  );
};

export default App;
