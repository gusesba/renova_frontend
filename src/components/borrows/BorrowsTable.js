import { useMemo, useEffect } from "react";
import {
  useTable,
  useRowSelect,
  usePagination,
  useFilters,
  useGlobalFilter,
  useSortBy,
} from "react-table";
import { useGlobalContext } from "../../context/context";
import Table from "react-bootstrap/Table";
import { Checkbox } from "../Checkbox";
import ColumnFilter from "../ColumnFilter";

const BorrowsTable = () => {
  const {
    borrowData,
    fetchBorrows,
    setBorrowRows,
    setBorrowPageOptions,
    setBorrowFilter,
    setBorrowsColumns,
    borrowsTableRef,
  } = useGlobalContext();
  const data = useMemo(() => [...borrowData], [borrowData]);
  useEffect(() => {
    fetchBorrows();
  }, []);
  const columns = useMemo(
    () =>
      borrowData && [
        {
          Header: "ID",
          accessor: "product.id", // accessor is the "key" in the data
          Filter: ColumnFilter,
        },
        {
          Header: "Preço",
          accessor: "product.price",
          Filter: ColumnFilter,
        },
        {
          Header: "Roupa",
          accessor: "product.type",
          Filter: ColumnFilter,
        },
        {
          Header: "Marca",
          accessor: "product.brand",
          Filter: ColumnFilter,
        },
        {
          Header: "Tamanho",
          accessor: "product.size",
          Filter: ColumnFilter,
        },
        {
          Header: "Cor",
          accessor: "product.color",
          Filter: ColumnFilter,
        },
        {
          Header: "Fornecedor",
          accessor: "product.provider.name",
          Filter: ColumnFilter,
        },
        {
          Header: "Descrição",
          accessor: "product.description",
          Filter: ColumnFilter,
        },
        {
          Header: "Emprestado",
          accessor: "buyer.name",
          Filter: ColumnFilter,
        },
        {
          Header: "Entrada",
          accessor: "entryDate",
          Filter: ColumnFilter,
        },
        {
          Header: "Emprestimo",
          accessor: "borrowDate",
          Filter: ColumnFilter,
        },
      ],
    [borrowData]
  );

  const tableInstance = useTable(
    { columns, data },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ];
      });
    }
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    setGlobalFilter,
    prepareRow,
    selectedFlatRows,
    allColumns,
  } = tableInstance;

  useEffect(() => {
    setBorrowRows(selectedFlatRows);
  }, [selectedFlatRows]);

  useEffect(() => {
    setBorrowPageOptions({
      page,
      nextPage,
      previousPage,
      canNextPage,
      canPreviousPage,
      pageOptions,
      state,
    });
  }, [
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
  ]);

  useEffect(() => {
    setBorrowFilter({ globalFilter: state.globalFilter, setGlobalFilter });
  }, [state.globalFilter, setGlobalFilter]);

  useEffect(() => {
    setBorrowsColumns(allColumns);
  }, [allColumns]);

  return (
    <Table ref={borrowsTableRef} striped bordered hover {...getTableProps()}>
      <thead>
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {
                      // Render the header
                      column.render("Header")
                    }
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                    <div>
                      {column.canFilter ? column.render("Filter") : null}{" "}
                    </div>
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows
          page.map((row) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell) => {
                    // Apply the cell props
                    return (
                      <td {...cell.getCellProps()}>
                        {
                          // Render the cell contents
                          cell.render("Cell")
                        }
                      </td>
                    );
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </Table>
  );
};

export default BorrowsTable;
