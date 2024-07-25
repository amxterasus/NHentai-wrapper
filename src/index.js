const { getDoujinshiDetails, searchDoujinshis } = require("./nhentai");

async function main() {
  // Get details of a specific doujinshi
  const doujinshiId = 111111;
  const details = await getDoujinshiDetails(doujinshiId);
  console.log(details);

  // Search doujinshis
  const searchQuery = 'furry';
  const searchResults = await searchDoujinshis(searchQuery);
  console.log(searchResults);
}

main();