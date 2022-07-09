import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/context";
import { useParams } from "react-router-dom";
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
    fetchClientIncome,
    clientData,
    clientIncome,
    setShowSelectColumnsModal,
  } = useGlobalContext();
  const { id } = useParams();

  const [dateInit, setDateInit] = useState();
  const [dateFinal, setDateFinal] = useState();

  useEffect(() => {
    setPageName("Cliente");
  }, []);

  useEffect(() => {
    fetchClient(id);
    fetchClientIncome(id, {
      dateInit: "2022-01-22",
      dateFinal: "2022-06-26",
    });
  }, [id]);

  return (
    <main>
      <div class="card bg-light mb-3">
        <div class="card-header">Cliente</div>
        <div class="card-body">
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div>
              <h5 class="card-title">Nome</h5>
              <p class="card-text">{clientData.name}</p>
            </div>
            <div>
              <h5 class="card-title">Telefone</h5>
              <p class="card-text">{clientData.phone}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="client-btn-group">
        <div>
          <div>
            <label>
              <input
                className="show-columns-btns"
                type="button"
                onClick={() => setShowSelectColumnsModal(true)}
              />
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
      <div>
        <div class="card bg-light mb-3">
          <div class="card-header">
            Caixa{" "}
            <input
              value={dateInit}
              onChange={(event) => setDateInit(event.target.value)}
              placeholder={"ano-mes-dia"}
            ></input>{" "}
            <input
              placeholder={"ano-mes-dia"}
              onChange={(event) => setDateFinal(event.target.value)}
              value={dateFinal}
            ></input>{" "}
            <btn onClick={() => fetchClientIncome(id, { dateInit, dateFinal })}>
              Buscar
            </btn>
          </div>
          <div class="card-body">
            <h5 class="card-title">Valor Vendido</h5>
            <p class="card-text">
              {clientIncome.sellIncome && clientIncome.sellIncome[0].sellIncome}
            </p>
            <h5 class="card-title">Valor Comprado</h5>
            <p class="card-text">
              {clientIncome.buyIncome && clientIncome.buyIncome[0].buyIncome}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Client;
