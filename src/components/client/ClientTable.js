import { useMemo, useEffect, useState } from "react";
import { useGlobalContext } from "../../context/context";
import { useTable, usePagination } from "react-table";
import Table from "react-bootstrap/Table";

const ClientTable = () => {
  const {
    clientData,
    actualTableUsage,
    setClientPageOptions,
    setClientColumns,
  } = useGlobalContext();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (actualTableUsage === "total") {
      setTableData(clientData.product);
    } else if (actualTableUsage === "sold") {
      setTableData(
        clientData.product.filter((product) => product.sell !== null)
      );
    } else if (actualTableUsage === "inventory") {
      setTableData(
        clientData.product.filter((product) => product.sell === null)
      );
    } else {
      setTableData(
        clientData.buyer.map((buyer) => {
          return buyer.product;
        })
      );
      console.log(tableData);
    }
  }, [actualTableUsage, clientData]);

  const data = useMemo(() => [...tableData], [tableData]);

  const columns = useMemo(
    () =>
      tableData && [
        {
          Header: "ID",
          accessor: "id", // accessor is the "key" in the data
        },
        {
          Header: "Preço",
          accessor: "price",
        },
        { Header: "Venda", accessor: "sell.sellPrice" },
        {
          Header: "Roupa",
          accessor: "type",
        },
        {
          Header: "Marca",
          accessor: "brand",
        },
        {
          Header: "Tamanho",
          accessor: "size",
        },
        {
          Header: "Cor",
          accessor: "color",
        },
        {
          Header: "Fornecedor",
          accessor: "provider.name",
        },
        {
          Header: "Descrição",
          accessor: "description",
        },
        {
          Header: "Entrada",
          accessor: "entryDate",
        },
      ],
    [tableData]
  );

  const tableInstance = useTable({ columns, data }, usePagination);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    allColumns,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
  } = tableInstance;

  useEffect(() => {
    setClientPageOptions({
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
    setClientColumns(allColumns);
  }, [allColumns]);

  return (
    <>
      <Table
        style={{ marginTop: "20px" }}
        striped
        bordered
        hover
        {...getTableProps()}
      >
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
    </>
  );
};

export default ClientTable;
