import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useGlobalContext } from "../../context/context";

const AddDevolutionModal = () => {
  const {
    showAddDevolutionModal,
    setShowAddDevolutionModal,
    addDevolution,
    setAlert,
  } = useGlobalContext();
  const [values, setValues] = useState({ buyerId: "", productId: "" });

  const onChange = (ev) => {
    setValues({
      ...values,
      [ev.target.name]: ev.target.value,
    });
  };

  const handleSubmit = () => {
    if (values.buyerId && values.productId) {
      addDevolution(values);
      setShowAddDevolutionModal(false);
      setValues({ buyerId: "", productId: "" });
    } else {
      setAlert({
        show: true,
        message: "Preencha os campos obrigatórios",
        variant: "danger",
      });
    }
  };

  return (
    <Modal
      show={showAddDevolutionModal}
      onHide={() => setShowAddDevolutionModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Nova Devolução</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formProduct">
            <Form.Label>Produto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Produto"
              name="productId"
              value={values.productId}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBuyer">
            <Form.Label>Comprador</Form.Label>
            <Form.Control
              type="text"
              placeholder="Comprador"
              name="buyerId"
              value={values.buyerId}
              onChange={onChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShowAddDevolutionModal(false)}
        >
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Adicionar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddDevolutionModal;
