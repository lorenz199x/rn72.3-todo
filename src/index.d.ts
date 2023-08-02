declare module 'secureToDoList' {
  export type apiParams = {
    [key: string]: any
  };

  export type Action = {
    type: string;
    payload?: any;
    meta?: any;
    error?: any;
  }

  export type SelectButton = {
    id: string;
    label: string;
    value: string;
    selected: boolean;
  }

  export type VoidFunction = () => void;
  export type ArgFunction = (arg?: any) => void;
}

declare module 'reactotron-apisauce';
// declare module 'react-native-check-box';
// declare module 'react-native-simple-radio-button';
// declare module 'react-native-extra-dimensions-android';
declare module '*.jpg';
declare module '*.jpeg';
declare module "*.png";
declare module "*.svg";
