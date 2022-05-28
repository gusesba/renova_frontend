import React from "react";
import ProductsTable from "../components/products/ProductsTable";
import { useEffect } from "react";
import {
  AiFillPlusSquare,
  AiFillDelete,
  AiFillUpCircle,
  AiFillPrinter,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineArrowDown,
} from "react-icons/ai";
import { useGlobalContext } from "../context";
import AddProductsModal from "../components/products/AddProductsModal";
import { GlobalFilter } from "../components/GlobalFilter";
import ColumnSelector from "../components/ColumnSelector";

const Products = () => {
  const {
    setShowAddProductModal,
    deleteProduct,
    goToProductPage,
    printEtiqueta,
    productPageOptions,
    setPageName,
    fetchClients,
    setOptions,
    clientsData,
    productFilter,
    productsColumns,
  } = useGlobalContext();

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    setOptions(
      clientsData.map((item) => {
        return {
          value: item.id,
          label: item.name,
          target: {
            name: "providerId",
            value: item.id,
          },
        };
      })
    );
  }, [clientsData]);

  useEffect(() => {
    setPageName("Produtos");
  }, []);

  return (
    <main>
      <AddProductsModal />
      <div className="table-header">
        <div>
          <div>
            <label>
              <input className="show-columns-btns" type="checkbox" />
              <span className="show-columns-span">
                <AiOutlineArrowDown className="arrow-down-btn" />
              </span>
              <ColumnSelector allColumns={productsColumns} />
            </label>
          </div>
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
          <AiFillPrinter
            onClick={() => printEtiqueta()}
            className="print-btn"
          />
        </div>
        <div>
          <GlobalFilter
            filter={productFilter.globalFilter}
            setFilter={productFilter.setGlobalFilter}
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
