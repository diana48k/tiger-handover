import { useState, useEffect } from 'react';

export function useDraft(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load draft', e);
    }
    return initialValue;
  });

  const saveDraft = (data) => {
    try {
      const toSave = data !== undefined ? data : value;
      localStorage.setItem(key, JSON.stringify(toSave));
    } catch (e) {
      console.error('Failed to save draft', e);
      throw e;
    }
  };

  const clearDraft = () => {
    localStorage.removeItem(key);
  };

  return [value, setValue, saveDraft, clearDraft];
}
