
export function mapToArray(map, callback = e => e) {
    const result = [];
    for (const key in map) {
        if (map.hasOwnProperty(key)) {
            result.push(callback(map[key]));
        }
    }
    return result;
}

export function arrayToMap(array, key, callback = e => e) {
    const result = {};
    for (const element of array) {
        result[element[key]] = callback(element);
    }
    return result;
}
