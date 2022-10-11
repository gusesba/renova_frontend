import { useMemo, useEffect, useState } from "react";
import { useGlobalContext } from "../../context/context";
import { useTable, usePagination, useSortBy } from "react-table";
import Table from "react-bootstrap/Table";

const ClientTable = () => {
  const [impressao, setImpressao] = useState(false);

  const dateCheck = (from, to, check) => {
    var fDate, lDate, cDate;
    fDate = Date.parse(from);
    lDate = Date.parse(to);
    cDate = Date.parse(check);

    if (cDate <= lDate && cDate >= fDate) {
      return true;
    }
    return false;
  };

  const {
    clientData,
    actualTableUsage,
    setClientPageOptions,
    setClientColumns,
    dateInit,
    dateFinal,
    clientTableRef,
  } = useGlobalContext();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (actualTableUsage === "total") {
      setTableData(clientData.product);
    } else if (actualTableUsage === "sold") {
      setTableData(
        clientData.product.filter((product) => {
          return (
            product.sell !== null &&
            dateCheck(dateInit, dateFinal, product.sell.createdAt) &&
            product.sell.type === "sell"
          );
        })
      );
    } else if (actualTableUsage === "inventory") {
      setTableData(
        clientData.product.filter((product) => product.sell === null)
      );
    } else if (actualTableUsage === "bought") {
      setTableData(
        clientData.buyer
          .filter(
            (buyer) =>
              dateCheck(dateInit, dateFinal, buyer.createdAt) &&
              buyer.type === "sell"
          )
          .map((buyer) => buyer.product)
      );
    } else if (actualTableUsage === "borrow") {
      setTableData(
        clientData.product.filter((product) => {
          return (
            product.sell !== null &&
            dateCheck(dateInit, dateFinal, product.sell.createdAt) &&
            product.sell.type === "borrow"
          );
        })
      );
    } else if (actualTableUsage === "borrowed") {
      setTableData(
        clientData.buyer
          .filter(
            (buyer) =>
              dateCheck(dateInit, dateFinal, buyer.createdAt) &&
              buyer.type === "borrow"
          )
          .map((buyer) => buyer.product)
      );
    } else if (actualTableUsage === "donation") {
      setTableData(
        clientData.product.filter((product) => {
          return (
            product.sell !== null &&
            dateCheck(dateInit, dateFinal, product.sell.createdAt) &&
            product.sell.type === "donation"
          );
        })
      );
    } else if (actualTableUsage === "devolution") {
      setTableData(
        clientData.product.filter((product) => {
          return (
            product.sell !== null &&
            dateCheck(dateInit, dateFinal, product.sell.createdAt) &&
            product.sell.type === "devolution"
          );
        })
      );
    }
  }, [actualTableUsage, clientData, dateInit, dateFinal]);

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
        {
          Header: "Saída",
          accessor: "departureDate",
        },
      ],
    [tableData]
  );

  const tableInstance = useTable({ columns, data }, useSortBy, usePagination);

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
      <button onClick={() => setImpressao(!impressao)}>Paginação/Todos</button>
      <Table
        ref={clientTableRef}
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
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
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
            impressao
              ? rows.map((row) => {
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
              : page.map((row) => {
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
