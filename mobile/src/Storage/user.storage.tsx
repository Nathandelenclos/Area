import AsyncStorage from '@react-native-async-storage/async-storage';

async function saveToken(token: string) {
  return AsyncStorage.setItem('token', token);
}

async function getToken() {
  return AsyncStorage.getItem('token');
}

async function removeToken() {
  return AsyncStorage.removeItem('token');
}
