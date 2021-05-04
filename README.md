# Call analyzer
This project was created to analyze call logs for a particular use. It's UI intends to be in Spanish, but some parts are (as leftover) left in English, due to habit and shared library usage (e.g. footer of table - pagination - will be in english).

This analyzer evolved into basically a -csv- file analyzer, of any kind. And by "analyzer" we just mean to give tools for grouping / filtering and searching inside big amount of rows, with a simple UI.

On the left we have column names to filter by them, with their appropriate (editable) data type.
Under it, there are the grouping options, to be able to group rows by any o the columns, showing the grouped columns in the inner side of the table.
It is also possible to filter by grouped frequency (e.g. grouping by column 1, and then showing only those rows that grouped more than 5 rows).

This project was created basically to improve the table component I created and to deliver something that might be of use to anyone. In any case, versioning is at the bottom of the website, and site is currently deployed on firebase = https://moy-call-analyzer.web.app/

