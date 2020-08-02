export const CHANGELOG: Changelog[] = [
  {
    version: '0.16.7',
    changes: ['Fixed showing wrong values for overflowing loadings', 'Added mock spend-per-day-index'],
  },
  {
    version: '0.16.6',
    changes: [
      'Created Logo and favicon',
      'Added Logo to Home Screen',
      'Fixed a bug in which loading prompted a confirmation dialog',
      'Created Horizontal Loading Bar graphs',
      'Graphs interact with the Add Income form',
      'Fixed bug that left a big empty space below table',
      'Adding incomes now autofocuses on next field when hitting enter, or comes back to first field if successfully added',
    ],
  },
  {
    version: '0.16.5',
    changes: [
      'Created loading bar reusable component',
      'Made summary and recently added views, to be loaded when requested, instead of eagerly',
    ],
  },
  {
    version: '0.16.4',
    changes: ['Added summary view as default view'],
  },
  {
    version: '0.16.3',
    changes: [
      'Added changelog to project. This is the first version of it',
      'Made some random improvements on stylings and some animations',
      'Added scrollable pages to all base sections of the application',
    ],
  },
  {
    version: '0.16.2',
    changes: ['Moyney version now appears at the bottom of the page'],
  },
];

interface Changelog {
  version: string;
  changes: string[];
}
