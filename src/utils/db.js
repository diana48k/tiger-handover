const DB_NAME = 'TGXHandoverDB';
const DB_VERSION = 1;
const STORE_NAME = 'handoverStore';

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(e.target.error);
  });
};

export const dbSetItem = async (key, value) => {
  try {
    const db = await openDB();
    return await new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(value, key);
      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('IndexedDB write failed, falling back to localStorage', err);
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (localErr) {
      console.error('localStorage write failed too', localErr);
      throw new Error('Database write failed: ' + (err.message || localErr.message || 'unknown error'));
    }
  }
};

export const dbGetItem = async (key) => {
  try {
    const db = await openDB();
    const result = await new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    if (result !== undefined) return result;
  } catch (err) {
    console.error('IndexedDB read failed, falling back to localStorage', err);
  }
  // Fallback
  const raw = localStorage.getItem(key);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch (e) {
      return raw;
    }
  }
  return null;
};

export const dbRemoveItem = async (key) => {
  try {
    const db = await openDB();
    return await new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(key);
      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('IndexedDB delete failed, falling back to localStorage', err);
    try {
      localStorage.removeItem(key);
      return true;
    } catch (localErr) {
      console.error('localStorage delete failed too', localErr);
      throw new Error('Database delete failed: ' + (err.message || localErr.message || 'unknown error'));
    }
  }
};
