export const storage = {
  get<T>(key: string): T | null {
    if (typeof window === "undefined") return null;

    const item = window.localStorage.getItem(key);

    if (!item) return null;

    try {
      return JSON.parse(item) as T;
    } catch {
      return null;
    }
  },

  set<T>(key: string, value: T) {
    if (typeof window === "undefined") return;

    window.localStorage.setItem(key, JSON.stringify(value));
  },

  remove(key: string) {
    if (typeof window === "undefined") return;

    window.localStorage.removeItem(key);
  },
};
