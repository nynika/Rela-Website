import React, { useState, useEffect } from 'react';
import './servicequickpay.css';

export const COLUMNS = [
  { Header: '', accessor: 'checkbox', width: '1px' },
  { Header: 'Investigation Name', accessor: 'investigations', width: '10em' },
  { Header: 'Amount', accessor: 'amount', width: '50px' },
];

const QuickpayTable = ({ data, onDelete, onRowSelectionChange }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  // Automatically select all rows by default when data is loaded
  useEffect(() => {
    const allRowIndices = data.map((_, index) => index);
    setSelectedRows(allRowIndices);
    onRowSelectionChange(allRowIndices); // Notify parent of the initial selection
  }, [data]);

  // Check if all rows are selected
  const isAllChecked = selectedRows.length === data.length && data.length > 0;

  // Handle individual row selection
  const handleCheckboxChange = (rowIdx) => {
    const updatedSelectedRows = selectedRows.includes(rowIdx)
      ? selectedRows.filter((index) => index !== rowIdx)
      : [...selectedRows, rowIdx];

    setSelectedRows(updatedSelectedRows);
    onRowSelectionChange(updatedSelectedRows); // Trigger update in parent
  };

  // Handle "Select All" checkbox
  const handleCheckAll = (event) => {
    const isChecked = event.target.checked;
    const updatedSelectedRows = isChecked ? data.map((_, index) => index) : [];
    setSelectedRows(updatedSelectedRows);
    onRowSelectionChange(updatedSelectedRows); // Trigger update in parent
  };

  // Check if a specific row is selected
  const isRowSelected = (rowIdx) => selectedRows.includes(rowIdx);

  return (
    <div className='quickpay-table'>
      <div className='quickpay-table-container'>
        <table className='quickpay-table-outline'>
          <thead>
            <tr>
              {COLUMNS.map((column, index) => (
                <th key={index} style={{ width: column.width }}>
                  {column.accessor === 'checkbox' ? (
                    <input
                      type='checkbox'
                      checked={isAllChecked}
                      onChange={handleCheckAll}
                      title='Select All'
                      className='checkbox-pointer'
                    />
                  ) : (
                    column.Header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  {COLUMNS.map((column, colIndex) => (
                    <td key={colIndex} style={{ width: column.width }}>
                      {column.accessor === 'checkbox' ? (
                        <input
                          type='checkbox'
                          checked={isRowSelected(rowIdx)}
                          onChange={() => handleCheckboxChange(rowIdx)}
                          className='checkbox-pointer'
                        />
                      ) : column.accessor === 'action' ? (
                        <span
                          className='remove-invoice'
                          onClick={() => onDelete(rowIdx)}
                          title='Delete'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            fill='currentColor'
                            className='bi bi-trash2'
                            viewBox='0 0 16 16'
                          >
                            <path d='M14 3a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2zM3.215 4.207l1.493 8.957a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836l1.493-8.957C11.69 4.689 9.954 5 8 5c-1.954 0-3.69-.311-4.785-.793z' />
                          </svg>
                        </span>
                      ) : (
                        row[column.accessor] || 'N/A'
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={COLUMNS.length} className='no-data'>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuickpayTable;
