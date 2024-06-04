export const decodeSearchParams = (searchParams: URLSearchParams) => {
    return [...searchParams.entries()].reduce((acc, [key, val]) => {
        try {
            return {
                ...acc,
                [key]: JSON.parse(val),
            }
        } catch {
            return {
                ...acc,
                [key]: val,
            }
        }
    }, {})
}
