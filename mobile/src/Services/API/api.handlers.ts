import Toast from 'react-native-toast-message';

const defaultApiHandler = {
  defaultHandlers: (data: any) => {
    const message = data?.message || 'Something went wrong';
    Toast.show({
      type: 'error',
      text1: `${message}`,
      position: 'bottom',
    });
  },
};

export default defaultApiHandler;
