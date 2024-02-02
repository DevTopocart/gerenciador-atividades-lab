export function filter2ndElementFrom3PartsArray(array: Array<any>) {
    let filteredValues = []
    for (let i = 1; i < array.length; i += 3) {
        filteredValues.push(array[i]);
    }
    
    return filteredValues
}