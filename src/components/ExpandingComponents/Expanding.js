import React, { useMemo, useEffect } from 'react';
import { useTable, useExpanded } from 'react-table';
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

const Expanding = (props) => {
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
    state: { expanded },
  } = useTable(
    {
      columns,
      data,
    },
    useExpanded,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: 'expander',
            Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
              <span {...getToggleAllRowsExpandedProps()}>
                {isAllRowsExpanded ? '👇' : '👉'}
              </span>
            ),
            Cell: ({ row }) => (
              <span
                {...row.getToggleRowExpandedProps({
                  style: {
                    paddingLeft: `${row.depth * 2}rem`,
                  },
                })}
              >
                {row.isExpanded ? '👇' : '👉'}
              </span>
            ),
          },
          ...columns,
        ];
      });
    }
  );

  const firstPageRows = rows.slice(0, 10);

  return (
    <>
      <TableStyled {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <TrStyled {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <ThStyled {...column.getHeaderProps()}>
                  {column.render('Header')}
                </ThStyled>
              ))}
            </TrStyled>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row) => {
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
      <div>Showing the first 10 results of {rows.length} rows</div>
      <pre>
        <code>{JSON.stringify({ expanded: expanded }, null, 2)}</code>
      </pre>
    </>
  );
};

export default Expanding;
