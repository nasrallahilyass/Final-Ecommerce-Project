
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'
import { useMemo, Fragment, useCallback } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import {
  FaSearch,
  FaChevronDown,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaSortUp,
  FaSortDown,
} from "react-icons/fa";
import { Listbox, Transition } from "@headlessui/react";

const columnHelper = createColumnHelper()



// const generateData = (numberOfRows = 25) =>
//   [...Array(numberOfRows)].map(() => ({
//     name: faker.name.fullName(),
//     image: faker.image.avatar(),
//     accountNumber: faker.finance.account(8),
//     accountName: faker.finance.accountName(),
//     amount: faker.finance.amount(500, 1e4, 2, "$"),
//   }));

function InputGroup7({
  label,
  name,
  value,
  onChange,
  type = "text",
  decoration,
  className = "",
  inputClassName = "",
  decorationClassName = "",
  disabled,
}) {
  return (
    <div
      className={`flex flex-row-reverse items-stretch w-full rounded-xl overflow-hidden bg-white shadow-[0_4px_10px_rgba(0,0,0,0.03)] ${className}`}
    >
      <input
        id={name}
        name={name}
        value={value}
        type={type}
        placeholder={label}
        aria-label={label}
        onChange={onChange} 
        className={`peer block w-full p-3 text-gray-600 focus:outline-none focus:ring-0 appearance-none ${disabled ? "bg-gray-200" : ""
          } ${inputClassName}`}
        disabled={disabled}
      />
      <div
        className={`flex items-center pl-3 py-3 text-gray-600 ${disabled ? "bg-gray-200" : ""
          } ${decorationClassName}`}
      >
        {decoration}
      </div>
    </div>
  );
}


function Filter({ column, table }) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);
  const columnFilterValue = column.getFilterValue();

  const commonInputStyles = 'w-24 border shadow rounded';

  if (column.id === 'actions'|| column.id ==='categorie_id'|| column.id ==='active'||column.id ==='first name'||column.id ==='Last name') {
    // No filter for the "Actions" column
    return null;
  }

  if (typeof firstValue === 'number') {
    return (
      <div className="flex items-center space-x-4">
        <InputGroup7
          type="number"
          value={columnFilterValue?.[0] || ''}
          onChange={(e) =>
            column.setFilterValue((old) => [
              e.target.value,
              old?.[1],
            ])
          }
          label="Min"
          className={commonInputStyles}
        />
        <InputGroup7
          type="number"
          value={columnFilterValue?.[1] || ''}
          onChange={(e) =>
            column.setFilterValue((old) => [
              old?.[0],
              e.target.value,
            ])
          }
          label="Max"
          className={commonInputStyles}
        />
      </div>
    );
  } else {
    return (
      <InputGroup7
        type="text"
        value={columnFilterValue ?? ''}
        onChange={(e) => column.setFilterValue(e.target.value)}
        label="Search"
        className="w-36 border shadow rounded"
      />
    );
  }
}


function Table1({ data, handleActionsProductClick,columns}) {
  console.log("data", data);
  const table = useReactTable(
    {
      data,
      columns,
      // Pipeline
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    }
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row justify-between">
        {/* herer was global filter */}
      </div>
      {/* here was tablecomponant func */}
      <div className="w-full min-w-[30rem] p-4 bg-white rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.03)]">
        
        <table>
        {/* herer was global filter */}
          <thead>
          {table.getHeaderGroups().map((headerGroup, index) => (
            <tr key={index}>
             {headerGroup.headers.map((header) => (
               <th
                 key={header.id}
                colSpan={header.colSpan}
                className="px-3 text-start text-xs font-light uppercase cursor-pointer"
                >
              <div className="flex gap-2 items-center">
                {header.isPlaceholder ? null : (
                  <div className="text-gray-600">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getCanFilter() ? (
                      <div className="flex flex-col">
                        <Filter column={header.column} table={table} />
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </th>
          ))}
        </tr>
      ))}

          </thead>
        
          <tbody>
            {table.getRowModel().rows.map((row) => {
              console.log("row data", row.original);

              return (
                <tr key={row.id} className="hover:bg-gray-100">
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className="p-3 text-sm font-normal text-gray-700 first:rounded-l-lg last:rounded-r-lg"
                      >
                        {cell.column.id === 'actions' ? (
                          <div className="flex gap-2">
                            <button onClick={() => handleActionsProductClick(row.original._id)}>
                              <FaTrash />
                            </button>
                            <button onClick={() => handleActionsProductClick(row.original._id)}>
                              <FaEdit />
                            </button>
                          </div>
                        ) : (
                          flexRender(cell.column.columnDef.cell, cell.getContext())
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>

        </table>
      </div>
      <div className="flex justify-center">
        {/* <PaginationNav
          gotoPage={gotoPage}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          pageCount={pageCount}
          pageIndex={pageIndex}
        /> */}
      </div>
    </div>
  );
}
export { Table1 };


