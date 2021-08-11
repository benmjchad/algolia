# alt-setlist-com-app

_This project was generated with [create-instantsearch-app](https://github.com/algolia/create-instantsearch-app) by [Algolia](https://algolia.com)._

## Step 1

I love live alternative music. I picked the https://github.com/algolia/datasets/tree/master/concerts dataset.

## Step 2

I indexed the data via API. You can't do this assignment without giving the API and the dashboard a good workout!

I used mostly Algolia examples, but I made sure that I respected the 10K record limit in the free tier:

```
require __DIR__ . '/vendor/autoload.php';

$client = Algolia\AlgoliaSearch\SearchClient::create(
  'DU2L2J4YHG',
  'xxx',
);

$index = $client->initIndex('alt.setlist.com');

$records = json_decode(file_get_contents('alternative_rock_artists.json'), true);
// Algolia's free plan has a limit of 10K records, let's respect that
$records = array_slice($records, 0, 9950);

// The API will automatically chunk the save into batches of 1K objects
$index->saveObjects($records, ['autoGenerateObjectIDIfNotExist' => true]);
```

## Step 3

I kept the relevance settings simple. To mix things up, I did it by the dashboard.

The searchable attributes where the (band) name and (venue) location. The attribute names could have been more descriptive, but I inherited them from the dataset.  

I setup custom ranking, adding criteria after the default ranking. I favoured terms in the band name than the venue name, and I favoured more recent concerts.

## Step 4

I kept this task relatively simple. I took the emphasis as it being a chance for me to work with the Algolia product in a meaningful way. I didn't take it as an opportunity to show off. I adapated the InstantSearch.JS example, and worked through Algolia documentation to add a transformation on the date string and show more on the venue facets. 

Most of the magic is in `src/app.js`.

## Steps 5 and 6

Done as requested.

## Step 7

This README documents the simple task I set out to achieve: Having an excuse to get my hands slightly dirty with Algolia product. I was impressed with both the simplicity of execution and the power of the product. I'd be happy to hang the next step of my career on it.

The dashboard is slick, and clearly empowers teams to do significant amounts of work with no or low code.

To see my app running, run `npm start` and open `http://localhost:3000` to see the app.
