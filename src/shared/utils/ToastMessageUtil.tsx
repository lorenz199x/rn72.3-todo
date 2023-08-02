import React from 'react';
import Toast, { BaseToast } from 'react-native-toast-message';

// import Images from '../models/Images';
// import { IconComponent } from '@components/IconComponent';

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderBottomWidth: 3,
        borderLeftWidth: 0,
        width: '100%',
        borderRadius: 0,
        borderBottomColor: '#33CC99',
        zIndex: 1,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 13,
        fontWeight: '400',
        paddingTop: 10,
        color: '#33CC99'
      }}
      text2Style={{ paddingBottom: 15 }}
      // renderLeadingIcon={() => <IconComponent source={Images.ic_wifi} size={40} imageStyle={{
      //   height: 40,
      //   width: 40,
      //   marginLeft: 10,
      //   marginTop: 10,
      // }} />}
      trailingIcon={null}
    />
  ),

  error: (props) => (
    <BaseToast
      {...props}
      style={{
        borderBottomWidth: 3,
        borderLeftWidth: 0,
        width: '100%',
        borderRadius: 0,
        borderBottomColor: '#E81D2C',
        zIndex: 1,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 13,
        fontWeight: '400',
        paddingTop: 10,
        color: '#E81D2C'
      }}
      text2Style={{ paddingBottom: 15 }}
      // renderLeadingIcon={() => <IconComponent source={Images.ic_wifi} size={40} imageStyle={{
      //   height: 40,
      //   width: 40,
      //   marginLeft: 10,
      //   marginTop: 10,
      // }} />}
      trailingIcon={null}
    />
  ),

  info: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'lightblue', width: '100%', zIndex: 1, }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
    />
  ),

  pharmAssist: (props) => (
    <BaseToast
      {...props}
      style={{
        width: '100%',
        borderRadius: 0,
        elevation: 5,
        zIndex: 1,
        borderLeftWidth: 0
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 13,
        fontWeight: '400',
        paddingTop: 10,
        color: '#000'
      }}
      text2Style={{ paddingBottom: 15 }}
      text2NumberOfLines={2}
      // renderLeadingIcon={() => <IconComponent source={Images.image_pharm_assist} size={40} imageStyle={{ borderRadius: 20, marginTop: 10, marginLeft: 10 }} />}
      trailingIcon={null}
    />
  )
};

type options = {
  type: 'success' | 'error' | 'info' | 'pharmAssist'
  message: string;
  subMessage?: string;
}

export const ToastMessage = {
  show: ({ type, message, subMessage }: options) => {
    Toast.show({
      type: type,
      text1: message,
      text2: subMessage,
      topOffset: 0,
      visibilityTime: 2000,
    });
  }
}