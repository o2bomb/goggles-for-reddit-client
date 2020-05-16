/**
 * SOURCE:
 *  - https://stackoverflow.com/a/23259289
 * Returns the time elapsed since the inputted Date object
 * @param {Date} date The date to compare with
 */
const getTimeSince = function (date) {
  if (typeof date !== "object") {
    date = new Date(date);
  }

  const seconds = Math.floor((new Date() - date) / 1000);
  let intervalType;

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    intervalType = "year";
  } else {
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      intervalType = "month";
    } else {
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        intervalType = "day";
      } else {
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          intervalType = "hour";
        } else {
          interval = Math.floor(seconds / 60);
          if (interval >= 1) {
            intervalType = "minute";
          } else {
            interval = seconds;
            intervalType = "seconds";
          }
        }
      }
    }
  }

  if (interval > 1 || interval === 0) {
    intervalType += "s";
  }
  return `${interval} ${intervalType}`;
};
export default getTimeSince;
