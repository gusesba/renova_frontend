import Table from "../components/clients/ClientsTable";
import {
  AiFillPlusSquare,
  AiFillDelete,
  AiFillUpCircle,
  AiFillDollarCircle,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineArrowDown,
} from "react-icons/ai";

import { FaShoppingBag } from "react-icons/fa";
import AddClientsModal from "../components/clients/AddClientsModal";
import { useGlobalContext } from "../context";
import { useEffect } from "react";
import { GlobalFilter } from "../components/GlobalFilter";
import ColumnSelector from "../components/ColumnSelector";

const Clients = () => {
  const {
    setShowAddClientModal,
    deleteClient,
    goToClientPage,
    goToSellFrontPage,
    pageOptions,
    setPageName,
    clientFilter,
    clientColumns,
  } = useGlobalContext();

  useEffect(() => {
    setPageName("Clientes");
  }, []);
  return (
    <main>
      <AddClientsModal />
      <div className="table-header">
        <div>
          <div>
            <label>
              <input className="show-columns-btns" type="checkbox" />
              <span className="show-columns-span">
                <AiOutlineArrowDown className="arrow-down-btn" />
              </span>
              <ColumnSelector allColumns={clientColumns} />
            </label>
          </div>
          <AiFillPlusSquare
            className="add-btn"
            onClick={() => setShowAddClientModal(true)}
          />
          <AiFillDelete className="delete-btn" onClick={() => deleteClient()} />
          <AiFillUpCircle
            className="gotopage-btn"
            onClick={() => goToClientPage()}
          />
          <AiFillDollarCircle
            onClick={() => {
              goToSellFrontPage("sell");
            }}
            className="sell-btn"
          />

          <FaShoppingBag
            onClick={() => {
              goToSellFrontPage("borrow");
            }}
            className="print-btn"
          />
        </div>
        <div>
          <GlobalFilter
            filter={clientFilter.globalFilter}
            setFilter={clientFilter.setGlobalFilter}
          />
        </div>
        <div>
          <AiOutlineLeft
            className={
              pageOptions.canPreviousPage
                ? "pagination-arrow"
                : "pagination-arrow-disabled"
            }
            onClick={() => pageOptions.previousPage()}
          />
          <span>
            {" "}
            Page{" "}
            <strong>
              {pageOptions.state && pageOptions.state.pageIndex + 1} of{" "}
              {pageOptions.pageOptions && pageOptions.pageOptions.length}
            </strong>
          </span>
          <AiOutlineRight
            className={
              pageOptions.canNextPage
                ? "pagination-arrow"
                : "pagination-arrow-disabled"
            }
            onClick={() => pageOptions.nextPage()}
          />
        </div>
      </div>
      <Table />
    </main>
  );
};

export default Clients;
