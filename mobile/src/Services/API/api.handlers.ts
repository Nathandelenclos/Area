import Toast from 'react-native-toast-message';

const profileApiHandler = {
  defaultHandlers: (data: any) => {
    return;
  },
};

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

export { defaultApiHandler, profileApiHandler };
