import Modal from "react-bootstrap/Modal";
import { useGlobalContext } from "../context/context";
const ColumnSelector = ({ allColumns }) => {
  const { showSelectColumnsModal, setShowSelectColumnsModal } =
    useGlobalContext();
  return (
    <Modal
      show={showSelectColumnsModal}
      onHide={() => setShowSelectColumnsModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Novo Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="column-btns">
          {allColumns.map((column) => (
            <div key={column.id}>
              <label>
                <input
                  className="checkbox-input"
                  type="checkbox"
                  {...column.getToggleHiddenProps()}
                />
                <span className="btn btn-primary checkbox-span">
                  {column.Header}
                </span>
              </label>
            </div>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ColumnSelector;
