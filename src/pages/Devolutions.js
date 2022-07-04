import DevolutionsTable from "../components/devolutions/DevolutionsTable";
import {
  AiFillPlusSquare,
  AiFillDelete,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineArrowDown,
} from "react-icons/ai";
import AddDevolutionModal from "../components/devolutions/AddDevolutionModal";
import { useEffect } from "react";
import { useGlobalContext } from "../context/context";
import { GlobalFilter } from "../components/GlobalFilter";
import ColumnSelector from "../components/ColumnSelector";

const Devolutions = () => {
  const {
    setShowAddDevolutionModal,
    setPageName,
    devolutionsPageOptions,
    devolutionsFilter,
    deleteDevolution,
    devolutionsColumns,
    setShowSelectColumnsModal,
  } = useGlobalContext();

  useEffect(() => {
    setPageName("Devolvidos");
  }, []);
  return (
    <main>
      <AddDevolutionModal />
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
              <ColumnSelector allColumns={devolutionsColumns} />
            </label>
          </div>
          <AiFillPlusSquare
            onClick={() => setShowAddDevolutionModal(true)}
            className="add-btn"
          />
          <AiFillDelete onClick={deleteDevolution} className="delete-btn" />
        </div>
        <div>
          <GlobalFilter
            filter={devolutionsFilter.globalFilter}
            setFilter={devolutionsFilter.setGlobalFilter}
          />
        </div>
        <div>
          <AiOutlineLeft
            className={
              devolutionsPageOptions.canPreviousPage
                ? "pagination-arrow"
                : "pagination-arrow-disabled"
            }
            onClick={() => devolutionsPageOptions.previousPage()}
          />
          <span>
            {" "}
            Page{" "}
            <strong>
              {devolutionsPageOptions.state &&
                devolutionsPageOptions.state.pageIndex + 1}{" "}
              of{" "}
              {devolutionsPageOptions.pageOptions &&
                devolutionsPageOptions.pageOptions.length}
            </strong>
          </span>
          <AiOutlineRight
            className={
              devolutionsPageOptions.canNextPage
                ? "pagination-arrow"
                : "pagination-arrow-disabled"
            }
            onClick={() => devolutionsPageOptions.nextPage()}
          />
        </div>
      </div>
      <DevolutionsTable />
    </main>
  );
};

export default Devolutions;
