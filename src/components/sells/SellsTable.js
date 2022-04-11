import { useMemo, useEffect } from "react";
import {
  useTable,
  useRowSelect,
  usePagination,
  useGlobalFilter,
} from "react-table";
import { useGlobalContext } from "../../context";
import Table from "react-bootstrap/Table";
import { Checkbox } from "../Checkbox";

const SellsTable = () => {
  const {
    sellData,
    fetchSells,
    setSellRows,
    setSellPageOptions,
    setSellFilter,
  } = useGlobalContext();
  const data = useMemo(() => [...sellData], [sellData]);
  useEffect(() => {
    fetchSells();
  }, []);
  const columns = useMemo(
    () =>
      sellData && [
        {
          Header: "ID",
          accessor: "product.id", // accessor is the "key" in the data
        },
        {
          Header: "Preço",
          accessor: "product.price",
        },
        {
          Header: "Roupa",
          accessor: "product.type",
        },
        {
          Header: "Marca",
          accessor: "product.brand",
        },
        {
          Header: "Tamanho",
          accessor: "product.size",
        },
        {
          Header: "Cor",
          accessor: "product.color",
        },
        {
          Header: "Fornecedor",
          accessor: "product.provider.name",
        },
        {
          Header: "Descrição",
          accessor: "product.description",
        },
        {
          Header: "Comprador",
          accessor: "buyer.name",
        },
      ],
    [sellData]
  );

  const tableInstance = useTable(
    { columns, data },
    useGlobalFilter,
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
  } = tableInstance;

  useEffect(() => {
    setSellRows(selectedFlatRows);
  }, [selectedFlatRows]);

  useEffect(() => {
    setSellPageOptions({
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
    setSellFilter({ state, setGlobalFilter });
  }, [state, setGlobalFilter]);

  return (
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

export default SellsTable;
