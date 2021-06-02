import { StyleSheet } from 'react-native';
import { palette } from '@/theme/colors';
import { fonts } from '@/theme/fonts';
import theme from '@/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    padding: 15,
  },
});

export default styles;
