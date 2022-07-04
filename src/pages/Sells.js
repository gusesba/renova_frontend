import SellsTable from "../components/sells/SellsTable";
import {
  AiFillPlusSquare,
  AiFillDelete,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineArrowDown,
} from "react-icons/ai";
import AddSellsModal from "../components/sells/AddSellsModal";
import { useEffect } from "react";
import { useGlobalContext } from "../context/context";
import { GlobalFilter } from "../components/GlobalFilter";
import ColumnSelector from "../components/ColumnSelector";

const Sells = () => {
  const {
    setShowAddSellModal,
    setPageName,
    sellPageOptions,
    deleteSell,
    sellFilter,
    sellsColumns,
  } = useGlobalContext();

  useEffect(() => {
    setPageName("Vendas");
  }, []);
  return (
    <main>
      <AddSellsModal />
      <div className="table-header">
        <div>
          <div>
            <label>
              <input className="show-columns-btns" type="checkbox" />
              <span className="show-columns-span">
                <AiOutlineArrowDown className="arrow-down-btn" />
              </span>
              <ColumnSelector allColumns={sellsColumns} />
            </label>
          </div>
          <AiFillPlusSquare
            onClick={() => setShowAddSellModal(true)}
            className="add-btn"
          />
          <AiFillDelete onClick={deleteSell} className="delete-btn" />
        </div>
        <div>
          <GlobalFilter
            filter={sellFilter.globalFilter}
            setFilter={sellFilter.setGlobalFilter}
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
