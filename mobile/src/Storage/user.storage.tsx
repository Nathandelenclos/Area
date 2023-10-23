import AsyncStorage from '@react-native-async-storage/async-storage';

async function saveToken(token: string) {
  if (!token) return;
  return AsyncStorage.setItem('token', token);
}

async function getToken() {
  return AsyncStorage.getItem('token');
}

async function removeToken() {
  return AsyncStorage.removeItem('token');
}

export const Storage = {
  saveToken,
  getToken,
  removeToken,
};
