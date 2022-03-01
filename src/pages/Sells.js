import SellsTable from "../components/sells/SellsTable";
import { AiFillPlusSquare, AiFillDelete } from "react-icons/ai";
import AddSellsModal from "../components/sells/AddSellsModal";
import { useGlobalContext } from "../context";

const Sells = () => {
  const { setShowAddSellModal } = useGlobalContext();
  return (
    <main>
      <AddSellsModal />
      <div>
        <AiFillPlusSquare
          onClick={() => setShowAddSellModal(true)}
          className="add-btn"
        />
        <AiFillDelete className="delete-btn" />
      </div>
      <SellsTable />
    </main>
  );
};

export default Sells;
