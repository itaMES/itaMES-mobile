import React, { FC, memo } from 'react';
import { useDispatch } from 'react-redux';
import { Icon } from '@ui-kitten/components';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

interface IHomeIcon {
  text: string;
  icon: {
    name: string;
    pack: string;
  };
  style?: StyleProp<ViewStyle>;
}

const HomeIcon: FC<IHomeIcon> = ({ text = '', icon, style }) => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity>
      <Icon pack={icon.pack} name={icon.name} />
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

export default memo(HomeIcon);
