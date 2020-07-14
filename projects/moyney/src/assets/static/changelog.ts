export const CHANGELOG: Changelog[] = [
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
