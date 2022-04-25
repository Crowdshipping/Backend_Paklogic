import {ViewStyle} from 'react-native';

export interface ITextBox {
  // tags: Array<string>;
  // onSave: Function;
  // type?: string;
  containerStyle?: ViewStyle;
  title: string;
  placeholder: string;
  onChangeValue: Function;
  password?: boolean;
  errormsg?: string;
  //((value: string) => void)
}
export interface IButton {
  containerStyle?: ViewStyle;
  title: string;
  bg?: boolean;
  onPress: Function;
  loading?: boolean;
}
export interface IPhonePicker {
  containerStyle?: ViewStyle;
  // title: string;
  onChange?: Function;
  errormsg?: string;
  countryCode?: {
    name: string;
    dial_code: string;
    code: string;
    flag: string;
  };
  phone?: string;
}

export interface ICountryCode {
  name: string;
  dial_code: string;
  code: string;
  flag: string;
}
export interface IAddressPicker {
  containerStyle?: ViewStyle;
  // title: string;
  onChange?: Function;
  errormsg?: string;
}

export interface IHeader {
  // containerStyle?: ViewStyle;
  title: string;
  pressMethod?: Function;
  picture?: any;
}
