/**
 * Takes a number and transforms it into a readable format, determined
 * by the thousand. Returns the formatted number as a string
 * (e.g. 120000 becomes 120k)
 * @param {*} num The number to be formatted
 */
export const kFormatter = (num) => {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
};
