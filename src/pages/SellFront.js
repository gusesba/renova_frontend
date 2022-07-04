import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/context";
import { useParams } from "react-router-dom";
import {
  AiFillPlusSquare,
  AiFillDelete,
  AiOutlineArrowRight,
  AiFillEdit,
  AiFillPrinter,
} from "react-icons/ai";
import { GiCardJoker } from "react-icons/gi";
import ProductsTable from "../components/sellFront/ProductsTable";
import AddProductModal from "../components/sellFront/addProductModal";
import EditPriceModal from "../components/sellFront/editPriceModal";

const SellFront = () => {
  const {
    fetchClient,
    clientData,
    setShowSellFrontModal,
    setShowEditPriceModal,
    sellFrontProducts,
    deleteLine,
    finishSell,
    addJoker,
    printRecibo,
    setPageName,
  } = useGlobalContext();
  const { id, sell } = useParams();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (sell === "sell") {
      setPageName("Venda");
    } else {
      setPageName("Empréstimo");
    }
  }, [sell]);

  useEffect(() => {
    fetchClient(id);
  }, [id]);

  useEffect(() => {
    let total = 0.0;
    sellFrontProducts.forEach((product) => {
      total += parseFloat(product.sellPrice);
    });
    setTotal(total);
  }, [sellFrontProducts]);

  return (
    <main>
      <AddProductModal />
      <EditPriceModal />
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
              <h4>{sell === "sell" ? total.toFixed(2) : 0}</h4>
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
          <AiFillEdit
            className="edit-btn"
            onClick={() => setShowEditPriceModal(true)}
          />
          <AiFillDelete onClick={deleteLine} className="delete-btn" />
          <AiFillPrinter
            className="print-btn"
            onClick={() =>
              printRecibo(sell === "sell" ? "Venda" : "Emprestimo")
            }
          />
          <AiOutlineArrowRight
            className="sell-btn"
            onClick={() => finishSell(id, sell)}
          />
        </div>
      </div>
    </main>
  );
};

export default SellFront;
