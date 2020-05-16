/**
 * Transformed escaped HTML into regular HTML
 * @param {*} html_text 
 */
const htmlDecode = (html_text) => {
  return new DOMParser().parseFromString(html_text, "text/html").documentElement.textContent;
}

export default htmlDecode;