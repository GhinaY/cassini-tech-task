export function updateStorageItem(key, value) {
  value ? sessionStorage.setItem(key, value) : sessionStorage.removeItem(key);
};

export function getStorageItem(key) {
  return sessionStorage.getItem(key);
}