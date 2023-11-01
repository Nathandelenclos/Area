import AsyncStorage from '@react-native-async-storage/async-storage';

class UrlServiceTs {
  url = 'http://34.38.103.92:8081/api';

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

  async editUrl(url: string): Promise<void> {
    this.url = url;
    await AsyncStorage.setItem('url', url);
  }
}

export default new UrlServiceTs();
