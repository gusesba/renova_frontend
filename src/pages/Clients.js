import Table from "../components/clients/ClientsTable";
import { AiFillPlusSquare, AiFillDelete, AiFillUpCircle } from "react-icons/ai";
import AddClientsModal from "../components/clients/AddClientsModal";
import { useGlobalContext } from "../context";

const Clients = () => {
  const { setShowAddClientModal, deleteClient, goToClientPage } =
    useGlobalContext();
  return (
    <main>
      <AddClientsModal />
      <div>
        <AiFillPlusSquare
          className="add-btn"
          onClick={() => setShowAddClientModal(true)}
        />
        <AiFillDelete className="delete-btn" onClick={() => deleteClient()} />
        <AiFillUpCircle onClick={() => goToClientPage()} />
      </div>
      <Table />
    </main>
  );
};

export default Clients;
