const STORAGE_KEY_PREFIX = "UNIAPP_WOT_TEMPLATE_";

const UPPER_SNAKE_CASE_KEY = /^[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)*$/;

export interface StorageLike {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}

const warnStorageKey = (key: string) => {
  if (!UPPER_SNAKE_CASE_KEY.test(key)) {
    console.warn(`[storage] key "${key}" should be UPPER_SNAKE_CASE (e.g. ACCESS_TOKEN, LOCALE)`);
  }
};

class MemoryStorage {
  private readonly store = new Map<string, string>();

  get length() {
    return this.store.size;
  }

  key(index: number) {
    return [...this.store.keys()][index] ?? null;
  }

  getItem(key: string) {
    return this.store.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.store.set(key, value);
  }

  removeItem(key: string) {
    this.store.delete(key);
  }

  clear() {
    this.store.clear();
  }
}

class UniStorage {
  private readonly prefix: string;
  private readonly memoryDriver = new MemoryStorage();

  constructor(
    prefix: string,
    private readonly session = false
  ) {
    this.prefix = prefix;
  }

  private resolveKey(key: string) {
    warnStorageKey(key);
    return `${this.prefix}${key}`;
  }

  get<T = unknown>(key: string, defaultValue?: T): T | null {
    const resolvedKey = this.resolveKey(key);

    if (this.session) {
      const raw = this.memoryDriver.getItem(resolvedKey);
      if (raw === null) {
        return defaultValue ?? null;
      }
      try {
        return JSON.parse(raw) as T;
      } catch {
        return raw as T;
      }
    }

    const raw = uni.getStorageSync(resolvedKey);
    if (raw === "" || raw === null || raw === undefined) {
      return defaultValue ?? null;
    }

    if (typeof raw === "string") {
      try {
        return JSON.parse(raw) as T;
      } catch {
        return raw as T;
      }
    }

    return raw as T;
  }

  set<T = unknown>(key: string, value: T) {
    const resolvedKey = this.resolveKey(key);
    const serialized = JSON.stringify(value);

    if (this.session) {
      this.memoryDriver.setItem(resolvedKey, serialized);
      return;
    }

    uni.setStorageSync(resolvedKey, serialized);
  }

  remove(key: string) {
    const resolvedKey = this.resolveKey(key);

    if (this.session) {
      this.memoryDriver.removeItem(resolvedKey);
      return;
    }

    uni.removeStorageSync(resolvedKey);
  }

  clear() {
    if (this.session) {
      for (let i = this.memoryDriver.length - 1; i >= 0; i--) {
        const key = this.memoryDriver.key(i);
        if (key?.startsWith(this.prefix)) {
          this.memoryDriver.removeItem(key);
        }
      }
      return;
    }

    const { keys } = uni.getStorageInfoSync();
    keys.forEach((key) => {
      if (key.startsWith(this.prefix)) {
        uni.removeStorageSync(key);
      }
    });
  }

  toStorageLike(): StorageLike {
    return {
      getItem: (key: string) => {
        const value = this.get<string>(key);
        return value === null ? null : JSON.stringify(value);
      },
      setItem: (key: string, value: string) => {
        try {
          this.set(key, JSON.parse(value));
        } catch {
          this.set(key, value);
        }
      },
      removeItem: (key: string) => {
        this.remove(key);
      },
    };
  }
}

export const storage = {
  local: new UniStorage(STORAGE_KEY_PREFIX),
  session: new UniStorage(STORAGE_KEY_PREFIX, true),
};

export { STORAGE_KEY_PREFIX };
