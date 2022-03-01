import ProductsTable from "../components/products/ProductsTable";
import { AiFillPlusSquare, AiFillDelete } from "react-icons/ai";
import { useGlobalContext } from "../context";
import AddProductsModal from "../components/products/AddProductsModal";
const Products = () => {
  const { setShowAddProductModal } = useGlobalContext();
  return (
    <main>
      <AddProductsModal />
      <div>
        <AiFillPlusSquare
          onClick={() => setShowAddProductModal(true)}
          className="add-btn"
        />
        <AiFillDelete className="delete-btn" />
      </div>
      <ProductsTable />
    </main>
  );
};

export default Products;
