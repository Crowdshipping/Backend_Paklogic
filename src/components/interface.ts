import { ViewStyle } from 'react-native';

export interface ITextBox {
  // tags: Array<string>;
  // onSave: Function;
  // type?: string;
  containerStyle?: ViewStyle;
  title?: string;
  placeholder: string;
  onChangeValue?: Function;
  password?: boolean;
  errorMessage?: String;
  isError?: boolean;
  inputType?: string;
  //((value: string) => void)
}

export interface IPicker {
  // tags: Array<string>;
  // onSave: Function;
  // type?: string;
  containerStyle?: ViewStyle;
  title?: string;
  placeholder: string;
  onChangeValue?: Function;
  errorMessage?: String;
  isError?: boolean;
  data: Array<string>;
  //((value: string) => void)
}
export interface IButton {
  containerStyle?: ViewStyle;
  title: string;
  onPress?: Function;
  color?: string;
  loading?: boolean;
  buttonStyle?:ViewStyle;
  fontSize?:number  
}
export interface IPhonePicker {
  containerStyle?: ViewStyle;
  // title: string;
  onChange?: Function;
  isError?: boolean;
  country?: any;
  number?: string;
  disabled?: boolean;
}
export interface IAddressPicker {
  containerStyle?: ViewStyle;
  // title: string;
  onChange?: Function;
  isError?: boolean;
}
export interface IHeader {
  // containerStyle?: ViewStyle;
  title: string;
  onBackPress?: Function;
  onButtonPress?: Function;
}