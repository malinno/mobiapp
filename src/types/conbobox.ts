import {DimensionValue} from 'react-native'
export type ComboBoxProps = {
    items: { label: string; value: string }[];
    value: string | null;
    onChange: (value: string) => void;
    placeholder?: string;
    width?: DimensionValue;
    height?: DimensionValue;
    searchable?: boolean;
  };