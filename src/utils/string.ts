export function toCamel(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
        if (+match === 0) {
            return ''; // or if (/\s+/.test(match)) for white spaces
        }
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
}

export function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
