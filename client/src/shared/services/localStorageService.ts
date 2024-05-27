/* eslint-disable no-console */
class LocalStorageService {
  set(key: string, value: any) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error setting item ${key} in localStorage`, e);
    }
  }

  get(key: string) {
    try {
      const value = localStorage.getItem(key);

      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.error(`Error getting item ${key} from localStorage`, e);

      return null;
    }
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}

export default new LocalStorageService();
