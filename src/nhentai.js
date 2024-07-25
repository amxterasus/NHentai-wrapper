const cheerio = require("cheerio");
const { fetchPage } = require("./utils");

const baseUrl = "https://nhentai.net";

/**
 * Get details of a doujinshi given its ID
 * @param {number} id - Doujinshi's ID
 * @returns {Promise<object>} - returns doujinshi's details
 */
async function getDoujinshiDetails(id) {
  const url = `${baseUrl}/g/${id}`;
  const html = await fetchPage(url);

  const $ = cheerio.load(html);

  const title = $("h1.title").text().trim();

  const categories = {
    parodies: [],
    characters: [],
    tags: [],
    artists: [],
    groups: [],
    languages: [],
    pages: [],
  };

  const categorySelectors = {
    parodies: ".tag-container:contains('Parodies') .tags a",
    characters: ".tag-container:contains('Characters') .tags a",
    tags: ".tag-container:contains('Tags') .tags a",
    artists: ".tag-container:contains('Artists') .tags a",
    groups: ".tag-container:contains('Groups') .tags a",
    languages: ".tag-container:contains('Languages') .tags a",
    pages: ".tag-container:contains('Pages') .tags a",
  };

  for (const [category, selector] of Object.entries(categorySelectors)) {
    $(selector).each((index, element) => {
      const tag = $(element).find(".name").text().trim();
      if (tag) categories[category].push(tag);
    });
  }

  const imageUrls = [];
  $(".gallerythumb img").each((index, element) => {
    const imageUrl = $(element).attr("data-src");
    if (imageUrl) imageUrls.push(imageUrl);
  });

  return { id, title, categories, imageUrls };
}

async function searchDoujinshis(query) {
  const url = `${baseUrl}/search/?q=${encodeURIComponent(query)}`;
  const html = await fetchPage(url);

  const $ = cheerio.load(html);
  const results = [];

  $(".gallery a").each((index, element) => {
    const link = $(element).attr("href");
    const id = link.split("/")[2];
    const title = $(element).find(".caption").text().trim();

    results.push({ id, title });
  });

  return results;
}

module.exports = { getDoujinshiDetails, searchDoujinshis };
