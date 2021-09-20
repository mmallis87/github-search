/* eslint-disable react/display-name */
import { h } from 'preact';
import React from 'preact/compat';

/* Note: I found an issue with antd Table component in Chrome and Firefox
    where cells colspan and rowspan is automatically set to 0
    which makes the row overlap in those browsers.
    I created a slim version of the antd Table component below
    until the issue is fixed. */
const Table = ({ dataSource, columns }) => {
  const headers = columns && columns.flatMap(({ title }) => title);

  return (
    <div className="ant-table ant-table-bordered">
      <div className="ant-table-container">
        <div className="ant-table-content">
          <table>
            <thead className="ant-table-thead">
              <tr>
                {headers &&
                  headers.map((header) => (
                    <th className="ant-table-cell">{header}</th>
                  ))}
              </tr>
            </thead>
            <tbody className="ant-table-tbody">
              {dataSource &&
                dataSource.map((record) => {
                  return (
                    <tr
                      data-row-key={record.id}
                      className="ant-table-row ant-table-row-level-0"
                    >
                      {columns &&
                        columns.map((column) => {
                          return (
                            <td className="ant-table-cell">
                              {typeof column.render === 'function' &&
                                column.render(record[column.dataIndex], record)}
                            </td>
                          );
                        })}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
