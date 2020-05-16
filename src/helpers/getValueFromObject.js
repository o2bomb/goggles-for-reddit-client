/**
 * Gets the value at the specified field from a given object. Returns
 * null if the field does not exist within the object
 * @param {*} p An array representing the path of the parameter (e.g. ['data', 0, 'title'])
 * @param {*} o The object to retrieve the data from
 */
const get = (p, o) => p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o);

export default get;