import { Changelog } from '@libs/moy-changelog';

export default <Changelog[]>[
  {
    version: '0.0.5',
    changes: [
      'Header now show expanded on non scrollable pages',
    ],
  },
  {
    version: '0.0.4',
    changes: [
      'Justified text on about me paragraph, also replaced Loren Ipsum',
      'Added pop animation to Vero\'s image. Feedback about it required',
      'Made document resize header on routing, and also auto calculate header on different displays',
    ],
    techChanges: [
      'Separated DynamicHeaderDimensions logic to its own class',
      'Removed 100% height default on base moy-styles stylesheet',
    ]
  },
  {
    version: '0.0.3',
    changes: [
      'Added temporal routing to changelog from Home h1 element',
      'Changing view will now scroll page to top',
      'Bar will also smooth edges when collapsing',
    ],
    techChanges: [
      'Added temporal routing to changelog from Home h1 element',
      'Modules preloading strategy to PreloadAllModules',
    ]
  },
  {
    version: '0.0.2',
    changes: [
      'Dynamic headers added',
      'Used profile picture of instagram as profile picture for website',
      'Updated folder names and routes, but navigation bar is still missing',
      'Added palette component, for possible page style edition',
      'Added header component to have a dynamic approach to the header',
    ],
    techChanges: [
      'Hosting settings updated',
      'Created directive for scrollbar styling',
      'Added scrollbar styling to libs/styles/components',
      'Removed scrollbar styling from projects src',
      'Removed material iconfont from project, we must use cdn on index now (to keep up to date)',
    ],
  },
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
