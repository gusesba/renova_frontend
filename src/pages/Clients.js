import Table from "../components/clients/ClientsTable";
import {
  AiFillPlusSquare,
  AiFillDelete,
  AiFillUpCircle,
  AiFillDollarCircle,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import AddClientsModal from "../components/clients/AddClientsModal";
import GlobalFilterClients from "../components/clients/GlobalFilterClients";
import { useGlobalContext } from "../context";

const Clients = () => {
  const {
    setShowAddClientModal,
    deleteClient,
    goToClientPage,
    goToSellFrontPage,
    pageOptions,
    clientFilter,
  } = useGlobalContext();
  return (
    <main>
      <AddClientsModal />
      <div className="client-table-header">
        <div>
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
            onClick={() => goToSellFrontPage()}
            className="sell-btn"
          />
        </div>
        <div>
          <GlobalFilterClients
            filter={clientFilter.state && clientFilter.state.globalFilter}
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
