export function useLocalStorage<T>(key: string) {
    const value = JSON.parse(localStorage.getItem(key) ?? "[]") as T
    function setValue(value: T) {
        localStorage.setItem(key, JSON.stringify(value))
    }
    return { value, setValue }
}
