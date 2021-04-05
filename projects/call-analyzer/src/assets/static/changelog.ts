import { Changelog } from '@libs/moy-changelog/moy-changelog.module';

export const CHANGELOG: Changelog[] = [
  {
    version: '0.0.3',
    changes: [
      'Updated table, inputs and scrollbar styles',
      'Csv reader / uploader now merges previous table with new one. This is to be used on future saving rows instances',
      'Csv reader now remembers what was uploaded previously. To clear table, recreate a new CsvReader',
      'Sidebar styles and logic on uploader updated',
    ]
  },
  {
    version: '0.0.2',
    changes: [
      'Created MoyTable 2 to improve table maintainability and performance',
      'Updated uploader component. Columns are gotten from the CSV now, and filters are appropiately set on left side for it',
      'Persistence of selected filters on DataBase for future use.'
    ]
  },
  {
    version: '0.0.1',
    changes: [
      'Created base app structure',
      'Updated table component, added a few filters',
      'Updated table and header styles'
    ],
  }
]