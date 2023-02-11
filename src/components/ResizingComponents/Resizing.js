import React, { useEffect, useMemo } from 'react';
import { useTable, useBlockLayout, useResizeColumns } from 'react-table';

import { COLUMNS } from '../../assets/columns';

import { useDispatch, useSelector } from 'react-redux';
import { fetchTablesItems } from '../../redux/itemSlice';
import {
  TableStyled,
  ThStyled,
  TrStyled,
  TdStyled,
  TdFootStyled,
  Resizer,
} from '../../assets/table.style.js';

const Resizing = (props) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.item.items);

  useEffect(() => {
    dispatch(fetchTablesItems());
  }, [dispatch]);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => items, [items]);
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 400,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    resetResizing,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout,
    useResizeColumns
  );

  return (
    <>
      <button onClick={resetResizing}>Initial Size</button>
      <TableStyled {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <TrStyled {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <ThStyled {...column.getHeaderProps()}>
                  {column.render('Header')}
                  <Resizer {...column.getResizerProps()} />
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
      <pre>
        <code>{JSON.stringify(state, null, 2)}</code>
      </pre>
    </>
  );
};

export default Resizing;
