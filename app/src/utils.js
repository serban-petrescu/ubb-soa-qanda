
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

export function replaceElementById(array, newElement, property = "_id") {
    const index = array.findIndex(o => o[property] === newElement[property]);
    const copy = array.slice();
    if (index >= 0) {
        copy[index] = newElement;
        return copy;
    } else {
        copy.push(newElement);
        return copy;
    }
}