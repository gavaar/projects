import { Changelog } from '@libs/moy-changelog/moy-changelog.module';

export const CHANGELOG: Changelog[] = [
  {
    version: '0.6.0',
    changes: [
      'Added table grouping option. This way, rows can hold several values inside by grouping strategy',
      'Fixed a bug in which removing number filters broke table filtering',
    ],
    techChanges: [
      'Created toggle button component',
      'Updated changelog component to now be able to include technical changes',
      'Only grouping strategy right now is to group those with equal names, needs expansion',
      'Updated filterManager and created pageManager and rowManager for table component. Trying to SOLID',
      'Improved button components to be easier to initialize',
    ],
  },
  {
    version: '0.5.5',
    changes: [
      '(dev) Improved table creation logic. Expandability of features is simpler now.',
    ]
  },
  {
    version: '0.5.4',
    changes: [
      '(dev) Removed old moy-table and renamed moy-table-2 > moy-table',
      'Fixed pagination error on last page of table'
    ]
  },
  {
    version: '0.5.3',
    changes: [
      'Old table deprecated, new table now has pagination and works faster',
      'Added media queries for smaller than 1440px wide screens',
    ],
    techChanges: [
      'Added paths to local project scope',
      'Updated localStorage manager to check if key exists',
      'Added index for helpers folder',
      'Encapsulated uploader component logic into handlers',
    ],
  },
  {
    version: '0.5.2',
    changes: [
      'Number is now properly searching as a number type',
    ]
  },
  {
    version: '0.5.1',
    changes: [
      'Fixed sizing for different screens'
    ]
  },
  {
    version: '0.5.0',
    changes: [
      'Table can be successfully filtered now!',
      'Minor improvements for buttons, but more is required',
      'Table now shows 500 rows instead of 100',
    ]
  },
  {
    version: '0.4.0',
    changes: [
      'Added datepicker input type for moy-input',
      'Added module-preloading to app, this improves speed and version management',
      'Updated uploader to include datepicker type',
    ]
  },
  {
    version: '0.3.0',
    changes: [
      'Updated table, inputs and scrollbar styles',
      'Csv reader / uploader now merges previous table with new one. This is to be used on future saving rows instances',
      'Csv reader now remembers what was uploaded previously. To clear table, recreate a new CsvReader',
      'Sidebar styles and logic on uploader updated',
    ]
  },
  {
    version: '0.2.0',
    changes: [
      'Created MoyTable 2 to improve table maintainability and performance',
      'Updated uploader component. Columns are gotten from the CSV now, and filters are appropiately set on left side for it',
      'Persistence of selected filters on DataBase for future use.'
    ]
  },
  {
    version: '0.1.0',
    changes: [
      'Created base app structure',
      'Updated table component, added a few filters',
      'Updated table and header styles'
    ],
  }
];
