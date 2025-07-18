import {ViewStyle, TextStyle} from 'react-native'
export type ButtonProps = {
    title: string;
    onPress: () => void;
    loading?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
  };