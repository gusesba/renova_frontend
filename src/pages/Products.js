import ProductsTable from "../components/products/ProductsTable";
import { useEffect } from "react";
import {
  AiFillPlusSquare,
  AiFillDelete,
  AiFillUpCircle,
  AiFillDollarCircle,
  AiFillPrinter,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import { useGlobalContext } from "../context";
import AddProductsModal from "../components/products/AddProductsModal";
import GlobalFilter from "../components/clients/GlobalFilter";
const Products = () => {
  const {
    setShowAddProductModal,
    deleteProduct,
    goToProductPage,
    printEtiqueta,
    productPageOptions,
    productFilter,
  } = useGlobalContext();

  return (
    <main>
      <AddProductsModal />
      <div className="table-header">
        <div>
          <AiFillPlusSquare
            onClick={() => setShowAddProductModal(true)}
            className="add-btn"
          />
          <AiFillDelete
            className="delete-btn"
            onClick={() => deleteProduct()}
          />
          <AiFillUpCircle
            className="gotopage-btn"
            onClick={() => goToProductPage()}
          />
          <AiFillDollarCircle className="sell-btn" />
          <AiFillPrinter
            onClick={() => printEtiqueta()}
            className="print-btn"
          />
        </div>
        <div>
          <GlobalFilter
            filter={productFilter.state && productFilter.state.globalFilter}
            setFilter={productFilter.setGlobalFilter}
            placeholder="Adidas"
          />
        </div>
        <div>
          <AiOutlineLeft
            className={
              productPageOptions.canPreviousPage
                ? "pagination-arrow"
                : "pagination-arrow-disabled"
            }
            onClick={() => productPageOptions.previousPage()}
          />
          <span>
            {" "}
            Page{" "}
            <strong>
              {productPageOptions.state &&
                productPageOptions.state.pageIndex + 1}{" "}
              of{" "}
              {productPageOptions.pageOptions &&
                productPageOptions.pageOptions.length}
            </strong>
          </span>
          <AiOutlineRight
            className={
              productPageOptions.canNextPage
                ? "pagination-arrow"
                : "pagination-arrow-disabled"
            }
            onClick={() => productPageOptions.nextPage()}
          />
        </div>
      </div>
      <ProductsTable />
    </main>
  );
};

export default Products;
