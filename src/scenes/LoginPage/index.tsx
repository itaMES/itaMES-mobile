import React, { useRef, FC, memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, IconProps, Input, Button, Spinner } from '@ui-kitten/components';
import NHCSafeAreaView from '@components/NHCSafeAreaView';
import AuthContainer from '@components/AuthContainer';
import { loginRequest } from '@redux/actions';
import { loginLoading } from '@redux/auth/selectors';
import styles from './styles';
import Heading from '@components/Heading';
import { sha256 } from '@utils/common';

const Login: FC = () => {
  const loading = useSelector(loginLoading);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const dispatch = useDispatch();
  const passwordRef = useRef(null);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const login = () => {
    dispatch(loginRequest({ username, password: sha256(password), keepSignedIn: true }));
  };

  const renderIcon = (props: IconProps) => (
    <TouchableOpacity onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableOpacity>
  );

  const LoadingIndicator = props => (
    <View style={[props.style, styles.indicator]}>
      <Spinner size="small" status="basic" />
    </View>
  );

  const accessoryLeft = loading ? { accessoryLeft: LoadingIndicator } : {};

  return (
    <NHCSafeAreaView>
      <AuthContainer>
        <Heading style={styles.title}>LOGIN</Heading>
        <Input
          style={styles.input}
          placeholder="Enter username"
          value={username}
          returnKeyType="next"
          onChangeText={nextValue => setUsername(nextValue)}
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <Input
          style={styles.input}
          ref={passwordRef}
          value={password}
          placeholder="Enter password"
          // accessoryRight={renderIcon}
          secureTextEntry={secureTextEntry}
          returnKeyType="send"
          onChangeText={nextValue => setPassword(nextValue)}
          onSubmitEditing={() => login()}
        />
        <Button
          style={styles.loginButton}
          disabled={loading}
          appearance="filled"
          onPress={() => login()}
          {...accessoryLeft}
        >
          LOGIN
        </Button>
        <Button appearance="ghost">Forgot password?</Button>
      </AuthContainer>
    </NHCSafeAreaView>
  );
};

export default memo(Login);
