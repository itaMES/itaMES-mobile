import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyledComponentProps, LayoutProps, Layout, useTheme } from '@ui-kitten/components';

type Inset = 'top' | 'bottom';

export interface SafeAreaLayoutProps extends StyledComponentProps, LayoutProps {
  insets?: Inset;
  children?: React.ReactNode;
}

export const SafeAreaLayout: React.FC<SafeAreaLayoutProps> = ({ insets, ...props }) => {
  const theme = useTheme();
  const insetsConfig = useSafeAreaInsets();

  return (
    <Layout
      {...props}
      style={[
        props.style,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          paddingTop: insets === 'top' ? insetsConfig.top : 0,
          paddingBottom: insets === 'bottom' ? insetsConfig.bottom : 0,
        },
      ]}
    />
  );
};
