import ProductsTable from "../components/products/ProductsTable";
import { useEffect } from "react";
import {
  AiFillPlusSquare,
  AiFillDelete,
  AiFillUpCircle,
  AiFillDollarCircle,
  AiFillPrinter,
} from "react-icons/ai";
import { useGlobalContext } from "../context";
import AddProductsModal from "../components/products/AddProductsModal";
const Products = () => {
  const {
    setShowAddProductModal,
    deleteProduct,
    goToProductPage,
    connectPrinter,
    printEtiqueta,
  } = useGlobalContext();

  return (
    <main>
      <AddProductsModal />
      <div>
        <AiFillPlusSquare
          onClick={() => setShowAddProductModal(true)}
          className="add-btn"
        />
        <AiFillDelete className="delete-btn" onClick={() => deleteProduct()} />
        <AiFillUpCircle
          className="gotopage-btn"
          onClick={() => goToProductPage()}
        />
        <AiFillDollarCircle className="sell-btn" />
        <AiFillPrinter onClick={() => printEtiqueta()} className="print-btn" />
      </div>
      <ProductsTable />
    </main>
  );
};

export default Products;
