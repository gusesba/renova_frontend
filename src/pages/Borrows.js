import BorrowsTable from "../components/borrows/BorrowsTable";
import {
  AiFillPlusSquare,
  AiFillDelete,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineArrowDown,
  AiOutlineCloudDownload,
} from "react-icons/ai";
import AddBorrowsModal from "../components/borrows/AddBorrowModal";
import { useEffect } from "react";
import { useGlobalContext } from "../context/context";
import { GlobalFilter } from "../components/GlobalFilter";
import ColumnSelector from "../components/ColumnSelector";
import { useDownloadExcel } from "react-export-table-to-excel";

const Borrows = () => {
  const {
    setShowAddBorrowModal,
    setPageName,
    borrowPageOptions,
    borrowFilter,
    deleteBorrow,
    borrowsColumns,
    setShowSelectColumnsModal,
    borrowsTableRef,
  } = useGlobalContext();

  const { onDownload } = useDownloadExcel({
    currentTableRef: borrowsTableRef.current,
    filename: "Renova",
    sheet: "Renova",
  });

  useEffect(() => {
    setPageName("Emprestados");
  }, []);
  return (
    <main>
      <AddBorrowsModal />
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
              <ColumnSelector allColumns={borrowsColumns} />
            </label>
          </div>
          <AiFillPlusSquare
            onClick={() => setShowAddBorrowModal(true)}
            className="add-btn"
          />
          <AiFillDelete onClick={deleteBorrow} className="delete-btn" />
          <AiOutlineCloudDownload
            onClick={onDownload}
            className="download-btn"
          />
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
