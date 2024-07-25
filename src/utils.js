/**
 * Function to get the HTML of a web page
 * @param {string} url - The url of the web page you want to get
 * @returns {Promise<string>} - returns HTML of the web page
 */
async function fetchPage(url) {
  const response = await fetch(url);

  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

  const html = await response.text();
  return html;
}

module.exports = { fetchPage };
