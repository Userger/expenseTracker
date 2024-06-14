export function deepClone(obj: { [key: string]: any }) {
    const newObj: { [key: string]: any } = {}
    for (let key in obj) {
        const value = obj[key]
        if (typeof value === "object") {
            newObj[key] = deepClone(value)
        } else {
            newObj[key] = value
        }
    }
    return newObj
}
