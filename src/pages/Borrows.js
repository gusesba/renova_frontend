import BorrowsTable from "../components/borrows/BorrowsTable";
import {
  AiFillPlusSquare,
  AiFillDelete,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import AddBorrowsModal from "../components/borrows/AddBorrowModal";
import { useEffect } from "react";
import { useGlobalContext } from "../context";
import { GlobalFilter } from "../components/GlobalFilter";

const Borrows = () => {
  const {
    setShowAddBorrowModal,
    setPageName,
    borrowPageOptions,
    borrowFilter,
    deleteBorrow,
  } = useGlobalContext();

  useEffect(() => {
    setPageName("Emprestados");
  }, []);
  return (
    <main>
      <AddBorrowsModal />
      <div className="table-header">
        <div>
          <AiFillPlusSquare
            onClick={() => setShowAddBorrowModal(true)}
            className="add-btn"
          />
          <AiFillDelete onClick={deleteBorrow} className="delete-btn" />
        </div>
        <div>
          <GlobalFilter
            filter={borrowFilter.globalFilter}
            setFilter={borrowFilter.setGlobalFilter}
          />
        </div>
        <div>
          <AiOutlineLeft
            className={
              borrowPageOptions.canPreviousPage
                ? "pagination-arrow"
                : "pagination-arrow-disabled"
            }
            onClick={() => borrowPageOptions.previousPage()}
          />
          <span>
            {" "}
            Page{" "}
            <strong>
              {borrowPageOptions.state && borrowPageOptions.state.pageIndex + 1}{" "}
              of{" "}
              {borrowPageOptions.pageOptions &&
                borrowPageOptions.pageOptions.length}
            </strong>
          </span>
          <AiOutlineRight
            className={
              borrowPageOptions.canNextPage
                ? "pagination-arrow"
                : "pagination-arrow-disabled"
            }
            onClick={() => borrowPageOptions.nextPage()}
          />
        </div>
      </div>
      <BorrowsTable />
    </main>
  );
};

export default Borrows;
