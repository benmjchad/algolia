/* global algoliasearch instantsearch */

const searchClient = algoliasearch(
  'DU2L2J4YHG',
  'cbf45ef94195025aac126d204068b1fb'
);

const search = instantsearch({
  indexName: 'alt.setlist.com',
  searchClient,
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    transformItems: items => items.map(item => ({ ...item,
        date_str: (new Date(item.date)).toLocaleDateString(),
    })),
    templates: {
      item: `
<div>
  <div class="hit-name">{{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}</div>
  <div class="hit-location">{{#helpers.highlight}}{ "attribute": "location" }{{/helpers.highlight}}</div>  
  <div class="hit-date">{{date_str}}</div>  
</div>
`,
    },
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.addWidgets([
  instantsearch.widgets.clearRefinements({
    container: '#clear-refinements',
    templates: {
      resetLabel: 'Reset venues',
    },
  }),

  instantsearch.widgets.refinementList({
    container: '#venue-list',
    attribute: 'location',
    limit: 8,
    showMore: true,
    showMoreLimit: 1000,
    sortBy: ['name:asc'],
    templates: {
    showMoreText: `
      {{#isShowingMore}}
        Fewer venues
      {{/isShowingMore}}
      {{^isShowingMore}}
        More venues
      {{/isShowingMore}}
    `,
  },
  }),

  instantsearch.widgets.configure({
    hitsPerPage: 16
  }),
]);

search.start();
