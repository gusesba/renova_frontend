import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/context";
import { useParams } from "react-router-dom";
import ClientTable from "../components/client/ClientTable";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineArrowDown,
  AiOutlineCloudDownload,
} from "react-icons/ai";
import ColumnSelector from "../components/ColumnSelector";
import { useDownloadExcel } from "react-export-table-to-excel";

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
    dateInit,
    setDateInit,
    dateFinal,
    setDateFinal,
    clientTableRef,
  } = useGlobalContext();
  const { id } = useParams();

  const { onDownload } = useDownloadExcel({
    currentTableRef: clientTableRef.current,
    filename: "Renova",
    sheet: "Renova",
  });

  useEffect(() => {
    setPageName("Cliente");
  }, []);

  useEffect(() => {
    fetchClient(id);
    fetchClientIncome(id, {
      dateInit: "2020-01-01",
      dateFinal: "2050-01-01",
    });
    console.log(clientIncome);
  }, [id]);

  return (
    <main>
      <div className="card bg-light mb-3">
        <div className="card-header">Cliente</div>
        <div className="card-body">
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div>
              <h5 className="card-title">Nome</h5>
              <p className="card-text">{clientData.name}</p>
            </div>
            <div>
              <h5 className="card-title">Telefone</h5>
              <p className="card-text">{clientData.phone}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="client-btn-group">
        <div>
          <div>
            <label style={{ marginRight: "5px" }}>
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
            <AiOutlineCloudDownload
              onClick={onDownload}
              className="download-btn"
            />
          </div>
          <div className="search-date-input">
            <Form.Group className="mb-2 mt-2" controlId="formDateInit">
              <Form.Control
                type="date"
                placeholder="Data Inicial"
                name="name"
                value={dateInit}
                onChange={(e) => setDateInit(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2 mt-2" controlId="formDateFinal">
              <Form.Control
                type="date"
                placeholder="Data Final"
                name="name"
                value={dateFinal}
                onChange={(e) => setDateFinal(e.target.value)}
              />
            </Form.Group>
            <Button
              onClick={() => fetchClientIncome(id, { dateInit, dateFinal })}
              className="btn mb-3"
              variant="light"
            >
              Pesquisar
            </Button>
          </div>
          <div className="client-buttons">
            <Button
              onClick={() => setActualTableUsage("total")}
              className="btn mb-3"
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
            <Button
              onClick={() => setActualTableUsage("borrow")}
              className="btn"
              variant="light"
            >
              Emprestados
            </Button>
            <Button
              onClick={() => setActualTableUsage("borrowed")}
              className="btn"
              variant="light"
            >
              Emprestimos
            </Button>
            <Button
              onClick={() => setActualTableUsage("donation")}
              className="btn"
              variant="light"
            >
              Doados
            </Button>
            <Button
              onClick={() => setActualTableUsage("devolution")}
              className="btn"
              variant="light"
            >
              Devolvidos
            </Button>
          </div>
        </div>
        <div style={{ marginTop: "10px", width: "170px" }}>
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
      <div className="cards">
        <div className="card-client">
          <div className="card-inside">
            <h4>
              {clientIncome.buyIncome && clientIncome.buyIncome[0].buyIncome}
            </h4>
            <span className="card-description">Comprado</span>
          </div>
        </div>
        <div className="card-client">
          <div className="card-inside">
            <h4>
              {clientIncome.sellIncome && clientIncome.sellIncome[0].sellIncome}
            </h4>
            <span className="card-description">Vendido</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Client;
