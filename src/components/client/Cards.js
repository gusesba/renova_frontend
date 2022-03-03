import React from "react";
import { useGlobalContext } from "../../context";

const Cards = () => {
  const { clientData } = useGlobalContext();
  return (
    <>
      <div className="cards">
        <div className="card-client">
          <div className="card-inside">
            <h4>{clientData.name}</h4>
            <span className="card-description">Name</span>
          </div>
        </div>
        <div className="card-client">
          <div className="card-inside">
            <h3>{clientData.product && clientData.product.length}</h3>
            <span className="card-description">Quantidade de Produtos</span>
          </div>
        </div>
        <div className="card-client">
          <div className="card-inside">
            <h3>
              {clientData.product &&
                clientData.product.filter((product) => product.sell !== null)
                  .length}
            </h3>
            <span className="card-description">Produtos Vendidos</span>
          </div>
        </div>
        <div className="card-client">
          <div className="card-inside">
            <h3>{clientData.buyer && clientData.buyer.length}</h3>
            <span className="card-description">Produtos Comprados</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
