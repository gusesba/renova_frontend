import { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { useParams } from "react-router-dom";
import {
  AiFillPlusSquare,
  AiFillDelete,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { GiCardJoker } from "react-icons/gi";
import ProductsTable from "../components/sellFront/ProductsTable";
import AddProductModal from "../components/sellFront/addProductModal";

const SellFront = () => {
  const {
    fetchClient,
    clientData,
    setShowSellFrontModal,
    sellFrontProducts,
    deleteLine,
    finishSell,
    addJoker,
  } = useGlobalContext();
  const { id } = useParams();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchClient(id);
  }, [id]);

  useEffect(() => {
    let total = 0;
    sellFrontProducts.forEach((product) => {
      total += product.price;
    });
    setTotal(total);
  }, [sellFrontProducts]);

  return (
    <main>
      <AddProductModal />
      <div className="cards">
        <div className="card-client">
          <div className="card-inside">
            <h4>{clientData.name}</h4>
            <span className="card-description">Comprador</span>
          </div>
        </div>
        <div className="card-client">
          <div className="card-inside">
            <h4>{clientData.id}</h4>
            <span className="card-description">Id</span>
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className="sellfront-card-left">
          <div className="card-client">
            <div className="card-inside">
              <h4>{sellFrontProducts.length}</h4>
              <span className="card-description">Quantidade</span>
            </div>
          </div>
          <div className="card-client">
            <div className="card-inside">
              <h4>{0.0}</h4>
              <span className="card-description">Desconto</span>
            </div>
          </div>
          <div className="card-client">
            <div className="card-inside">
              <h4>{total.toFixed(2)}</h4>
              <span className="card-description">Total</span>
            </div>
          </div>
        </div>
        <div className="sellfront-table">
          <ProductsTable />
        </div>
        <div className="sellfront-buttons">
          <AiFillPlusSquare
            onClick={() => setShowSellFrontModal(true)}
            className="add-btn"
          />
          <GiCardJoker className="joker-btn" onClick={addJoker} />
          <AiFillDelete onClick={deleteLine} className="delete-btn" />
          <AiOutlineArrowRight
            className="sell-btn"
            onClick={() => finishSell(id)}
          />
        </div>
      </div>
    </main>
  );
};

export default SellFront;
