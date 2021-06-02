import React, { useCallback, FC, memo } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Button, Icon } from '@ui-kitten/components';
import EnvInfoView from '@/components/AppVersion';
import NHCSafeAreaView from '@/components/NHCSafeAreaView';
import styles from './styles';

const Login: FC = () => {
  const navigation = useNavigation();

  return (
    <NHCSafeAreaView>
      {/* <GenericHeader BodyHeader={<Icon pack="FontAwesome5" name="react" style={styles.headerIconContent} />} /> */}

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Button
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })}
        >Login</Button>
      </ScrollView>
    </NHCSafeAreaView>
  );
};

export default memo(Login);
