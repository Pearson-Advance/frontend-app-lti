/* eslint-disable import/prefer-default-export */
const columns = [
  {
    Header: 'Class',
    accessor: 'title',
    Cell: ({ row }) => row.values.title,
  },
];

export { columns };
