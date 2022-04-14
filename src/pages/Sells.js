import SellsTable from "../components/sells/SellsTable";
import {
  AiFillPlusSquare,
  AiFillDelete,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import AddSellsModal from "../components/sells/AddSellsModal";
import { useEffect } from "react";
import { useGlobalContext } from "../context";
import GlobalFilter from "../components/clients/GlobalFilter";

const Sells = () => {
  const {
    setShowAddSellModal,
    setPageName,
    sellPageOptions,
    sellFilter,
    deleteSell,
  } = useGlobalContext();

  useEffect(() => {
    setPageName("Vendas");
  }, []);
  return (
    <main>
      <AddSellsModal />
      <div className="table-header">
        <div>
          <AiFillPlusSquare
            onClick={() => setShowAddSellModal(true)}
            className="add-btn"
          />
          <AiFillDelete onClick={deleteSell} className="delete-btn" />
        </div>
        <div>
          <GlobalFilter
            filter={sellFilter.state && sellFilter.state.globalFilter}
            setFilter={sellFilter.setGlobalFilter}
            placeholder="Busca"
          />
        </div>
        <div>
          <AiOutlineLeft
            className={
              sellPageOptions.canPreviousPage
                ? "pagination-arrow"
                : "pagination-arrow-disabled"
            }
            onClick={() => sellPageOptions.previousPage()}
          />
          <span>
            {" "}
            Page{" "}
            <strong>
              {sellPageOptions.state && sellPageOptions.state.pageIndex + 1} of{" "}
              {sellPageOptions.pageOptions &&
                sellPageOptions.pageOptions.length}
            </strong>
          </span>
          <AiOutlineRight
            className={
              sellPageOptions.canNextPage
                ? "pagination-arrow"
                : "pagination-arrow-disabled"
            }
            onClick={() => sellPageOptions.nextPage()}
          />
        </div>
      </div>
      <SellsTable />
    </main>
  );
};

export default Sells;
