import Table from "../components/clients/ClientsTable";
import {
  AiFillPlusSquare,
  AiFillDelete,
  AiFillEdit,
  AiFillUpCircle,
  AiFillDollarCircle,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineArrowDown,
} from "react-icons/ai";

import { FaShoppingBag } from "react-icons/fa";
import AddClientsModal from "../components/clients/AddClientsModal";
import UpdateClientsModal from "../components/clients/UpdateClientsModal";
import { useGlobalContext } from "../context/context";
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
    clientsColumns,
    setShowSelectColumnsModal,
    openUpdateClientModal,
  } = useGlobalContext();

  useEffect(() => {
    setPageName("Clientes");
  }, []);
  return (
    <main>
      <AddClientsModal />
      <UpdateClientsModal />
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
              <ColumnSelector allColumns={clientsColumns} />
            </label>
          </div>
          <AiFillPlusSquare
            className="add-btn"
            onClick={() => setShowAddClientModal(true)}
          />
          <AiFillDelete className="delete-btn" onClick={() => deleteClient()} />
          <AiFillEdit
            className="update-btn"
            onClick={() => openUpdateClientModal()}
          />
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
