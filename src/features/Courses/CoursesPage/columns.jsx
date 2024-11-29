/* eslint-disable import/prefer-default-export */
const columns = [
  {
    Header: 'Licensed Courses',
    accessor: 'title',
    Cell: ({ row }) => row.values.title,
  },
];

export { columns };
