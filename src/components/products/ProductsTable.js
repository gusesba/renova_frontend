import { useMemo, useEffect } from "react";
import {
  useTable,
  useRowSelect,
  usePagination,
  useFilters,
  useGlobalFilter,
} from "react-table";
import { useGlobalContext } from "../../context/context";
import Table from "react-bootstrap/Table";
import { Checkbox } from "../Checkbox";
import ColumnFilter from "../ColumnFilter";

const ProductsTable = () => {
  const {
    productsData,
    fetchProducts,
    setProductRows,
    setProductPageOptions,
    setProductFilter,
    setProductsColumns,
  } = useGlobalContext();

  useEffect(() => {
    fetchProducts();
  }, []);

  const data = useMemo(() => [...productsData], [productsData]);
  const columns = useMemo(
    () =>
      productsData && [
        {
          Header: "ID",
          accessor: "id", // accessor is the "key" in the data
          Filter: ColumnFilter,
        },
        {
          Header: "Preço",
          accessor: "price",
          Filter: ColumnFilter,
        },
        {
          Header: "Produto",
          accessor: "type",
          Filter: ColumnFilter,
        },
        {
          Header: "Marca",
          accessor: "brand",
          Filter: ColumnFilter,
        },
        {
          Header: "Tamanho",
          accessor: "size",
          Filter: ColumnFilter,
        },
        {
          Header: "Cor",
          accessor: "color",
          Filter: ColumnFilter,
        },
        {
          Header: "Fornecedor",
          accessor: "provider.name",
          Filter: ColumnFilter,
        },
        {
          Header: "Descrição",
          accessor: "description",
          Filter: ColumnFilter,
        },
        {
          Header: "Entrada",
          accessor: "entryDate",
          Filter: ColumnFilter,
        },
      ],
    [productsData]
  );

  const tableInstance = useTable(
    { columns, data },
    useGlobalFilter,
    useFilters,
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
    rows,
    prepareRow,
    allColumns,
    selectedFlatRows,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    setGlobalFilter,
  } = tableInstance;

  useEffect(() => {
    setProductRows(selectedFlatRows);
  }, [selectedFlatRows]);

  useEffect(() => {
    setProductPageOptions({
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
    setProductFilter({ globalFilter: state.globalFilter, setGlobalFilter });
  }, [state.globalFilter, setGlobalFilter]);

  useEffect(() => {
    setProductsColumns(allColumns);
  }, [allColumns]);

  return (
    <>
      <Table striped bordered hover {...getTableProps()}>
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
                    <th {...column.getHeaderProps()}>
                      {
                        // Render the header
                        column.render("Header")
                      }
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
    </>
  );
};

export default ProductsTable;
