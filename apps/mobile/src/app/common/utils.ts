import { Platform, ToastAndroid, Vibration } from 'react-native';
import { ToastType } from 'react-native-toast-notifications';

export const showToast = (toast: ToastType, message: string) => {
  if (Platform.OS === 'ios') {
    toast.show(message, {
      placement: 'top',
    });
  } else {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  }

  Vibration.vibrate(50);
};
