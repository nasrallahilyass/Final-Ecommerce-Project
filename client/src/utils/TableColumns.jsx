
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
  function Avatar({ src, alt = "avatar" }) {
    return (
      <img src={src} alt={alt} className="w-8 h-8 rounded-full object-cover" />
    );
  }
const columnHelper = createColumnHelper()
const Productscolumns = [
    columnHelper.accessor("Product_name", {
      header: "Product Name",
      cell: ({ row, getValue }) => {
        const productImage = row.original.product_image;
        const avatarAlt = getValue?.() ? `${getValue()} Avatar` : "avatar";
  
        return (
          <div className="flex gap-2 items-center">
            <Avatar src={productImage} alt={avatarAlt} />
            <div>{getValue?.()}</div>
          </div>
        );
      },
    }),
    columnHelper.accessor('sku', {
      header: 'SKU',
    }),
    columnHelper.accessor('short_description', {
      header: 'Short Description',
    }),
    columnHelper.accessor('price', {
      header: 'Price',
    }),
    columnHelper.accessor('discount_price', {
      header: 'Discount Price',
    }),
    columnHelper.accessor('options', {
      header: 'Options',
      cell: ({ row, getValue }) => {
        const value = getValue?.() || []; // Use an empty array as a default
        return (
          <div className="relative">
            <select
              className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-xl shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
              defaultValue={value[0]}
            >
              {value.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <FaChevronDown
                size="0.80rem"
                className="text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>
        );
      },
    }),
    columnHelper.accessor('active', {
      header: 'Active',
      cell: ({ getValue }) => {
        return getValue?.() ? 'Yes' : 'No';
      },
    }),
    columnHelper.accessor('subcategory_name', {
      header: 'Subcategory Name',
      cell: ({ row }) => {
        return row.original.subcategory_name || ''; // Use an empty string as a default
      },
    }),
    columnHelper.accessor('seller_id', {
      header: 'Seller ID',
      cell: ({ row }) => {
        return row.original.seller_id || ''; // Use an empty string as a default
      },
    }),
    columnHelper.accessor('category_name', {
      header: 'Category Name',
      cell: ({ row }) => {
        return row.original.category_name || ''; // Use an empty string as a default
      },
    }),
    
    columnHelper.accessor('actions', {
      header: 'Actions'
    }),
  ];
  const SubcategoryColumns = [
    columnHelper.accessor("subcategory_name", {
      header: "Subcategory Name",
      cell: ({ row }) => {
        return row.original.subcategory_name || ''; // Use an empty string as a default
      },
    }),
    columnHelper.accessor('categorie_id', {
      header: 'Category ID',
    }),
    columnHelper.accessor('category_name', {
      header: 'Category Name',
    }),
    columnHelper.accessor('active', {
      header: 'Active',
      cell: ({ getValue }) => {
        return getValue?.() ? 'Yes' : 'No';
      },
    }),
    columnHelper.accessor('actions', {
      header: 'Actions'
    }),
  ];
  const CategoryColumns =[
    columnHelper.accessor("category_name", {
      header: "Category Name",
      cell: ({ row }) => {
        return row.original.category_name || ''; // Use an empty string as a default
      },}),
      columnHelper.accessor('active', {
        header: 'Active',
        cell: ({ getValue }) => {
          return getValue?.() ? 'Yes' : 'No';
        },}),
        columnHelper.accessor('actions', {
          header: 'Actions'
        }),
  ]
export {Productscolumns,SubcategoryColumns,CategoryColumns} ;
