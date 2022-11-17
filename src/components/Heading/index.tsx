import React, { FC, ReactNode } from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import styles from './styles';

interface IHeading {
  children: ReactNode;
  style: StyleProp<TextStyle>;
}

const Heading: FC<IHeading> = ({ children, style, ...props }) => {
  return (
    <Text {...props} style={[styles.text, style]}>
      {children}
    </Text>
  );
};

export default Heading;
