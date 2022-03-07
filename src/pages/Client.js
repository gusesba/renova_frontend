import React, { useEffect } from "react";
import { useGlobalContext } from "../context";
import { useParams } from "react-router-dom";
import Cards from "../components/client/Cards";
import ClientTable from "../components/client/ClientTable";
import Button from "react-bootstrap/Button";

const Client = () => {
  const { fetchClient, setActualTableUsage } = useGlobalContext();
  const { id } = useParams();

  useEffect(() => {
    fetchClient(id);
  }, [id]);

  return (
    <main>
      <Cards />
      <div className="client-btn-group">
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
      <ClientTable />
    </main>
  );
};

export default Client;
