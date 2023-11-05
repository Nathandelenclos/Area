import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

class UrlServiceTs {
  url = 'http://34.38.50.181:8080';

  constructor() {
    this.reloadUrl();
  }

  async reloadUrl(): Promise<void> {
    const resp = await AsyncStorage.getItem('url');
    if (resp) {
      this.url = resp;
    }
  }

  getBaseUrl(): string {
    return this.url;
  }

  showErrorUrl(textMessage: string) {
    Toast.show({
      type: 'error',
      text1: textMessage,
      visibilityTime: 3000,
      autoHide: true,
      position: 'bottom',
    });
  }

  tryEditUrl(url: string, message: string): boolean {
    if (!url) {
      this.showErrorUrl(message);
      return false;
    }
    const regex = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i',
    );
    if (!regex.test(url)) {
      this.showErrorUrl(message);
      return false;
    }
    let newUrl = url;
    if (newUrl[newUrl.length - 1] === '/') {
      newUrl = newUrl.slice(0, newUrl.length - 1);
    }
    this.url = newUrl;
    AsyncStorage.setItem('url', url);
    return true;
  }

  async editUrl(url: string): Promise<void> {
    this.url = url;
    await AsyncStorage.setItem('url', url);
  }
}

export default new UrlServiceTs();
