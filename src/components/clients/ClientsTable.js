import { useMemo, useEffect } from "react";
import {
  useTable,
  useRowSelect,
  usePagination,
  useGlobalFilter,
  useFilters,
} from "react-table";
import { useGlobalContext } from "../../context";
import Table from "react-bootstrap/Table";
import { Checkbox } from "../Checkbox";
import ColumnFilter from "../ColumnFilter";

const ClientsTable = () => {
  const {
    clientsData,
    setClientRows,
    fetchClients,
    setPageOptions,
    setClientFilter,
    setClientColumns,
  } = useGlobalContext();

  useEffect(() => {
    fetchClients();
  }, []);

  const data = useMemo(() => [...clientsData], [clientsData]);

  const columns = useMemo(
    () =>
      clientsData && [
        {
          Header: "ID",
          accessor: "id", // accessor is the "key" in the data
          Filter: ColumnFilter,
        },
        {
          Header: "Nome",
          accessor: "name",
          Filter: ColumnFilter,
        },
        {
          Header: "Telefone",
          accessor: "phone",
          Filter: ColumnFilter,
        },
      ],
    [clientsData]
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
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    setGlobalFilter,
    prepareRow,
    allColumns,
    getToggleHideAllColumnsProps,
    selectedFlatRows,
  } = tableInstance;

  useEffect(() => {
    setClientRows(selectedFlatRows);
  }, [selectedFlatRows]);

  useEffect(() => {
    setPageOptions({
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
    setClientFilter({ globalFilter: state.globalFilter, setGlobalFilter });
  }, [state.globalFilter, setGlobalFilter]);

  useEffect(() => {
    setClientColumns(allColumns);
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

export default ClientsTable;
