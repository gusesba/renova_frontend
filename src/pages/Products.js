import React from "react";
import ProductsTable from "../components/products/ProductsTable";
import { useEffect } from "react";
import {
  AiFillPlusSquare,
  AiFillDelete,
  AiFillEdit,
  AiFillUpCircle,
  AiFillPrinter,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineArrowDown,
} from "react-icons/ai";
import { useGlobalContext } from "../context/context";
import AddProductsModal from "../components/products/AddProductsModal";
import UpdateProductsModal from "../components/products/UpdateProductsModal";
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
    setShowSelectColumnsModal,
    openUpdateProductModal,
  } = useGlobalContext();

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    setOptions(
      clientsData.map((item) => {
        return {
          value: item.id,
          label: ("0000" + item.number).slice(-4) + " - " + item.name,
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
      <UpdateProductsModal />
      <div className="table-header">
        <div>
          <div>
            <label>
              <input
                className="show-columns-btns"
                type="button"
                onClick={() => setShowSelectColumnsModal(true)}
              />
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
          <AiFillEdit
            className="update-btn"
            onClick={() => openUpdateProductModal()}
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
