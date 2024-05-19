interface Store<T> {
  subscribe(cb: () => void): () => void;
  setValue(value: T): void;
  getValue(): T;
}
export function createStore<T>(defaultValue: T): Store<T> {
  let value = defaultValue;
  const listeners = new Set<() => void>();
  return {
    subscribe(cb: () => void) {
      listeners.add(cb);
      return () => {
        listeners.delete(cb);
      };
    },
    getValue() {
      return value;
    },
    setValue(newValue: T) {
      value = newValue;
      listeners.forEach((listener) => {
        listener();
      });
    },
  };
}
