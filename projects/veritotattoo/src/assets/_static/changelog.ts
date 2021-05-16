import { Changelog } from '@libs/moy-changelog';

export default <Changelog[]>[
  {
    version: '0.0.1',
    changes: [
      'Added "about" structural page',
      'Added "contact me" structural page',
      'Added "reserve" structural page',
      'Added temporal sidebar for navigation purposes',
    ],
    techChanges: [
      'Moved basic style logic to libs styles, this is easier to maintain on the long run'
    ]
  },
  {
    version: '0.0.0',
    changes: [
      'Initial state for website',
      'Headers, footers, and structural styling'
    ]
  }
];
