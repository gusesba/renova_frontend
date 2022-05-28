import React, { useEffect } from "react";
import { useGlobalContext } from "../context";
import { useParams } from "react-router-dom";
import Cards from "../components/client/Cards";
import ClientTable from "../components/client/ClientTable";
import Button from "react-bootstrap/Button";
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineArrowDown,
} from "react-icons/ai";
import ColumnSelector from "../components/ColumnSelector";

const Client = () => {
  const {
    fetchClient,
    setActualTableUsage,
    setPageName,
    clientPageOptions,
    clientColumns,
  } = useGlobalContext();
  const { id } = useParams();

  useEffect(() => {
    setPageName("Cliente");
  }, []);

  useEffect(() => {
    fetchClient(id);
  }, [id]);

  return (
    <main>
      <Cards />
      <div className="client-btn-group">
        <div>
          <div>
            <label>
              <input className="show-columns-btns" type="checkbox" />
              <span className="show-columns-span">
                <AiOutlineArrowDown className="arrow-down-btn" />
              </span>
              <ColumnSelector allColumns={clientColumns} />
            </label>
          </div>
          <Button
            onClick={() => setActualTableUsage("total")}
            className="btn"
            variant="light"
          >
            Fornecidos
          </Button>
          <Button
            onClick={() => setActualTableUsage("sold")}
            className="btn"
            variant="light"
          >
            Vendidos
          </Button>
          <Button
            onClick={() => setActualTableUsage("inventory")}
            className="btn"
            variant="light"
          >
            Estoque
          </Button>
          <Button
            onClick={() => setActualTableUsage("bought")}
            className="btn"
            variant="light"
          >
            Comprados
          </Button>
        </div>
        <div style={{ marginTop: "10px" }}>
          <AiOutlineLeft
            className={
              clientPageOptions.canPreviousPage
                ? "pagination-arrow"
                : "pagination-arrow-disabled"
            }
            onClick={() => clientPageOptions.previousPage()}
          />
          <span>
            {" "}
            Page{" "}
            <strong>
              {clientPageOptions.state && clientPageOptions.state.pageIndex + 1}{" "}
              of{" "}
              {clientPageOptions.pageOptions &&
                clientPageOptions.pageOptions.length}
            </strong>
          </span>
          <AiOutlineRight
            className={
              clientPageOptions.canNextPage
                ? "pagination-arrow"
                : "pagination-arrow-disabled"
            }
            onClick={() => clientPageOptions.nextPage()}
          />
        </div>
      </div>
      <ClientTable />
    </main>
  );
};

export default Client;
