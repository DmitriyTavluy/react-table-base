import { format } from 'date-fns';
//import ColumnFilter from "./ColumnFilter";

export const COLUMNS = [
  {
    Header: 'Id',
    Footer: 'Id',
    //disableFilters: true,
    accessor: 'id',
  },
  {
    Header: 'First Name',
    Footer: 'First Name',
    accessor: 'first_name',
  },
  {
    Header: 'Last Name',
    Footer: 'Last Name',

    accessor: 'last_name',
  },
  {
    Header: 'Date of birth',
    Footer: 'Date of birth',

    accessor: 'date_of_birth',
    Cell: ({ value }) => {
      return format(new Date(value), 'dd.MM.yyyy');
    },
  },
  {
    Header: 'Country',
    Footer: 'Country',

    accessor: 'country',
  },
  {
    Header: 'Phone number',
    Footer: 'Phone number',

    accessor: 'phone',
  },
];

export const GROUPED_COLUMNS = [
  {
    Header: 'Id',
    Footer: 'Id',

    accessor: 'id',
  },
  {
    Header: 'Name',
    Footer: 'Name',
    columns: [
      {
        Header: 'First Name',
        Footer: 'First Name',

        accessor: 'first_name',
      },
      {
        Header: 'Last Name',
        Footer: 'Last Name',

        accessor: 'last_name',
      },
    ],
  },
  {
    Header: 'Info',
    Footer: 'Info',
    columns: [
      {
        Header: 'Date of birth',
        Footer: 'Date of birth',
        accessor: 'date_of_birth',

        Cell: ({ value }) => {
          return format(new Date(value), 'dd.MM.yyyy');
        },
      },
      {
        Header: 'Country',
        Footer: 'Country',

        accessor: 'country',
      },
      {
        Header: 'Phone number',
        Footer: 'Phone number',

        accessor: 'phone',
      },
    ],
  },
];
