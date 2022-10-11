import { useMemo, useEffect } from "react";
import { useTable, useRowSelect } from "react-table";
import { useGlobalContext } from "../../context/context";
import Table from "react-bootstrap/Table";
import { Checkbox } from "../Checkbox";

const ProductsTable = () => {
  const {
    sellFrontProducts,
    setSellFrontProducts,
    setSellFrontRows,
    sellFrontTableRef,
  } = useGlobalContext();

  useEffect(() => {
    setSellFrontProducts([]);
  }, []);

  const data = useMemo(() => [...sellFrontProducts], [sellFrontProducts]);
  const columns = useMemo(
    () =>
      sellFrontProducts && [
        {
          Header: "ID",
          accessor: "id", // accessor is the "key" in the data
        },
        {
          Header: "Preço",
          accessor: "price",
        },
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
          Header: "Descrição",
          accessor: "description",
        },
        {
          Header: "Preço Venda",
          accessor: "sellPrice",
        },
      ],
    [sellFrontProducts]
  );

  const tableInstance = useTable({ columns, data }, useRowSelect, (hooks) => {
    hooks.visibleColumns.push((columns) => {
      return [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ];
    });
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = tableInstance;

  useEffect(() => {
    setSellFrontRows(selectedFlatRows);
  }, [selectedFlatRows]);

  return (
    <Table ref={sellFrontTableRef} striped bordered hover {...getTableProps()}>
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
          rows.map((row) => {
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

export default ProductsTable;
