# NHentai Wrapper

## Installation

```bash
npm install nhentai-wrapper
```

## Usage

## Example Code

```javascript
const { getDoujinshiDetails, searchDoujinshis } = require("./nhentai");

async function main() {
  // Get details of a specific doujinshi
  const doujinshiId = 473546;
  const details = await getDoujinshiDetails(doujinshiId);
  console.log(details);

  // Search doujinshis
  const searchQuery = 'furry';
  const searchResults = await searchDoujinshis(searchQuery);
  console.log(searchResults);
}

main();
```
