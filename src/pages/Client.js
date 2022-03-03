import React, { useEffect } from "react";
import { useGlobalContext } from "../context";
import { useParams } from "react-router-dom";
import Cards from "../components/client/Cards";
import ClientTable from "../components/client/ClientTable";
import Button from "react-bootstrap/Button";

const Client = () => {
  const { fetchClient } = useGlobalContext();
  const { id } = useParams();

  useEffect(() => {
    fetchClient(id);
    console.log(id);
  }, [id]);

  return (
    <main>
      <Cards />
      <div className="client-btn-group">
        <Button className="btn" variant="light">
          Light
        </Button>
        <Button className="btn" variant="light">
          Light
        </Button>
        <Button className="btn" variant="light">
          Light
        </Button>
      </div>
      <ClientTable />
    </main>
  );
};

export default Client;
