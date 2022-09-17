import React, { FC, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon } from '@ui-kitten/components';
import { logoutRequest } from '@redux/actions';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import styles from './styles';
import HomeIcon from '../HomeIcon';

interface IMenu {
  style?: StyleProp<ViewStyle>;
}

const Menu: FC<IMenu> = ({ style }) => {
  const dispatch = useDispatch();

  const menus = [
    {
      label: 'Báo cáo',
      icon: {
        name: 'pie-chart',
        pack: 'SimpleLineIcons',
      },
      key: 1,
    },
    {
      label: 'Lệnh sản xuất',
      icon: {
        name: 'codesquareo',
        pack: 'AntDesign',
      },
      key: 2,
    },
    {
      label: 'Tiến độ sản xuất',
      icon: {
        name: 'linechart',
        pack: 'AntDesign',
      },
      key: 3,
    },
    {
      label: 'Cảnh báo',
      icon: {
        name: 'warning',
        pack: 'AntDesign',
      },
      key: 4,
    },
    {
      label: 'Gia công',
      icon: {
        name: 'tool',
        pack: 'AntDesign',
      },
      key: 5,
    },
    {
      label: 'Đơn hàng',
      icon: {
        name: 'filetext1',
        pack: 'AntDesign',
      },
      key: 6,
    },
    {
      label: 'Kho',
      icon: {
        name: 'home',
        pack: 'AntDesign',
      },
      key: 7,
    },
  ];

  const menuEl = menus.map(item => <HomeIcon text={item.label} icon={item.icon} key={item.key} />);

  return <View style={styles.container}>{menuEl}</View>;
};

export default memo(Menu);
