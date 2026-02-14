import type { StateStorage } from "zustand/middleware";

const inMemoryStorage = new Map<string, string>();

export const localStateStorage: StateStorage = {
  getItem: (name) => {
    if (typeof window === "undefined") {
      return inMemoryStorage.get(name) ?? null;
    }

    return window.localStorage.getItem(name);
  },
  setItem: (name, value) => {
    if (typeof window === "undefined") {
      inMemoryStorage.set(name, value);
      return;
    }

    window.localStorage.setItem(name, value);
  },
  removeItem: (name) => {
    if (typeof window === "undefined") {
      inMemoryStorage.delete(name);
      return;
    }

    window.localStorage.removeItem(name);
  },
};

export const authPersistence = {
  storage: localStateStorage,
};
