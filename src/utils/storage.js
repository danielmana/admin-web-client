import localStorage from 'local-storage';
import cookies from 'react-cookies';

const KEY_USER = 'bt_admin:auth_user';
const useLocalStorage = isLocalStorageAvailable();

function isLocalStorageAvailable() {
  try {
    const x = '__storage_test__';
    const isAvailable = localStorage.set(x, x);
    localStorage.remove(x);
    return isAvailable;
  } catch (e) {
    return false;
  }
}

function get(key) {
  return useLocalStorage ? localStorage.get(key) : cookies.load(key);
}

function set(key, value) {
  if (useLocalStorage) {
    return localStorage.set(key, value);
  }
  return cookies.save(key, value);
}

function remove(key) {
  if (useLocalStorage) {
    return localStorage.remove(key);
  }
  return cookies.remove(key);
}

function getUser() {
  return get(KEY_USER);
}

function setUser(value) {
  return set(KEY_USER, value);
}

function removeUser() {
  return remove(KEY_USER);
}

export default {
  get,
  set,
  remove,
  getUser,
  setUser,
  removeUser,
};
