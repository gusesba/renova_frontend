import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context";

const Product = () => {
  const { fetchProduct, productData, setPageName } = useGlobalContext();
  const { id } = useParams();

  useEffect(() => {
    setPageName("Produto");
  }, []);

  useEffect(() => {
    fetchProduct(id);
    console.log(productData);
  }, [id]);

  return (
    <main>
      <>
        <div className="cards">
          <div className="card-client">
            <div className="card-inside">
              <h3>{productData.id}</h3>
              <span className="card-description">ID</span>
            </div>
          </div>
          <div className="card-client">
            <div className="card-inside">
              <h3>{productData.type}</h3>
              <span className="card-description">Roupa</span>
            </div>
          </div>
          <div className="card-client">
            <div className="card-inside">
              <h3>{productData.price}</h3>
              <span className="card-description">Preço</span>
            </div>
          </div>
          <div className="card-client">
            <div className="card-inside">
              <h3>{productData.brand}</h3>
              <span className="card-description">Marca</span>
            </div>
          </div>
        </div>
        <div className="cards">
          <div className="card-client">
            <div className="card-inside">
              <h3>{productData.size}</h3>
              <span className="card-description">Tamanho</span>
            </div>
          </div>
          <div className="card-client">
            <div className="card-inside">
              <h3>{productData.color}</h3>
              <span className="card-description">Cor</span>
            </div>
          </div>
          <div className="card-client">
            <div className="card-inside">
              <h3>{productData.provider && productData.provider.name}</h3>
              <span className="card-description">Fornecedor</span>
            </div>
          </div>
          <div className="card-client">
            <div className="card-inside">
              <h3>{productData.description}</h3>
              <span className="card-description">Descrição</span>
            </div>
          </div>
        </div>
      </>
    </main>
  );
};

export default Product;
