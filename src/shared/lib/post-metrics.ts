export function getStableViewCount(key: string, base = 100, range = 500) {
    let hash = 0;

    for (let index = 0; index < key.length; index += 1) {
        hash = (hash * 31 + key.charCodeAt(index)) >>> 0;
    }

    return base + (hash % range);
}
