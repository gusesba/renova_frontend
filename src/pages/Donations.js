import DonationsTable from "../components/donations/DonationsTable";
import {
  AiFillPlusSquare,
  AiFillDelete,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineArrowDown,
  AiOutlineCloudDownload,
} from "react-icons/ai";
import AddDonationModal from "../components/donations/AddDonationModal";
import { useEffect } from "react";
import { useGlobalContext } from "../context/context";
import { GlobalFilter } from "../components/GlobalFilter";
import ColumnSelector from "../components/ColumnSelector";
import { useDownloadExcel } from "react-export-table-to-excel";

const Donations = () => {
  const {
    setShowAddDonationModal,
    setPageName,
    donationsPageOptions,
    donationsFilter,
    deleteDonation,
    donationsColumns,
    setShowSelectColumnsModal,
    donationsTableRef,
  } = useGlobalContext();

  const { onDownload } = useDownloadExcel({
    currentTableRef: donationsTableRef.current,
    filename: "Renova",
    sheet: "Renova",
  });

  useEffect(() => {
    setPageName("Doações");
  }, []);
  return (
    <main>
      <AddDonationModal />
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
              <ColumnSelector allColumns={donationsColumns} />
            </label>
          </div>
          <AiFillPlusSquare
            onClick={() => setShowAddDonationModal(true)}
            className="add-btn"
          />
          <AiFillDelete onClick={deleteDonation} className="delete-btn" />
          <AiOutlineCloudDownload
            onClick={onDownload}
            className="download-btn"
          />
        </div>
        <div>
          <GlobalFilter
            filter={donationsFilter.globalFilter}
            setFilter={donationsFilter.setGlobalFilter}
          />
        </div>
        <div>
          <AiOutlineLeft
            className={
              donationsPageOptions.canPreviousPage
                ? "pagination-arrow"
                : "pagination-arrow-disabled"
            }
            onClick={() => donationsPageOptions.previousPage()}
          />
          <span>
            {" "}
            Page{" "}
            <strong>
              {donationsPageOptions.state &&
                donationsPageOptions.state.pageIndex + 1}{" "}
              of{" "}
              {donationsPageOptions.pageOptions &&
                donationsPageOptions.pageOptions.length}
            </strong>
          </span>
          <AiOutlineRight
            className={
              donationsPageOptions.canNextPage
                ? "pagination-arrow"
                : "pagination-arrow-disabled"
            }
            onClick={() => donationsPageOptions.nextPage()}
          />
        </div>
      </div>
      <DonationsTable />
    </main>
  );
};

export default Donations;
