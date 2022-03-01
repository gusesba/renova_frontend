import Table from "../components/clients/ClientsTable";
import { AiFillPlusSquare, AiFillDelete } from "react-icons/ai";
import AddClientsModal from "../components/clients/AddClientsModal";
import { useGlobalContext } from "../context";

const Clients = () => {
  const { setShowAddClientModal, deleteClient } = useGlobalContext();
  return (
    <main>
      <AddClientsModal />
      <div>
        <AiFillPlusSquare
          className="add-btn"
          onClick={() => setShowAddClientModal(true)}
        />
        <AiFillDelete className="delete-btn" onClick={() => deleteClient()} />
      </div>
      <Table />
    </main>
  );
};

export default Clients;
