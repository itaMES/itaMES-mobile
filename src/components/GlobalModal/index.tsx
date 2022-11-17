import React, { FC, memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Text, Card } from '@ui-kitten/components';
import { removeErrorRequest } from '@redux/actions';
import { errorInfo } from '@redux/error/selectors';
import styles from './styles';

const GlobalModal: FC = () => {
  const errorDetail = useSelector(errorInfo);
  // const [visible, setVisible] = useState(true);
  const dispatch = useDispatch();

  const removeError = () => {
    dispatch(removeErrorRequest());
  };

  const visible = !!(errorDetail && Object.keys(errorDetail).length);
  const { message = '' } = errorDetail ?? {};

  return (
    <Modal visible={visible} backdropStyle={styles.backdropStyle}>
      <Card>
        <Text>{message}</Text>
        <Button onPress={() => removeError()}>Ok</Button>
      </Card>
    </Modal>
  );
};

export default memo(GlobalModal);
