import React, { useMemo, useEffect } from 'react';
import { useTable, useSortBy } from 'react-table';
import { COLUMNS } from '../../assets/columns';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTablesItems } from '../../redux/itemSlice';
import {
  TableStyled,
  ThStyled,
  TrStyled,
  TdStyled,
  TdFootStyled,
} from '../../assets/table.style.js';

const SortTable = (props) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.item.items);

  useEffect(() => {
    dispatch(fetchTablesItems());
  }, [dispatch]);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => items, [items]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  return (
    <TableStyled {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <TrStyled {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <ThStyled
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render('Header')}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? '↓' : '↑') : ''}
                </span>
              </ThStyled>
            ))}
          </TrStyled>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <TrStyled {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <TdStyled {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TdStyled>
                );
              })}
            </TrStyled>
          );
        })}
      </tbody>
      <tfoot>
        {footerGroups.map((footerGroup) => (
          <TrStyled {...footerGroup.getFooterGroupProps()}>
            {footerGroup.headers.map((column) => (
              <TdFootStyled {...column.getFooterProps()}>
                {column.render('Header')}
              </TdFootStyled>
            ))}
          </TrStyled>
        ))}
      </tfoot>
    </TableStyled>
  );
};

export default SortTable;
