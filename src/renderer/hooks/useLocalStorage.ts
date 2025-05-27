import { useState, useEffect } from 'react';

const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void, string | null] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  const [storageError, setStorageError] = useState<string | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
      setStorageError(null);
    } catch (error: any) {
      if (error && error.name === 'QuotaExceededError') {
        setStorageError('Lagringsutrymmet är fullt. Kan inte spara data.');
      } else {
        setStorageError('Fel vid sparande till localStorage.');
      }
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue, storageError];
};

export default useLocalStorage;