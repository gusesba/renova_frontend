import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useGlobalContext } from "../../context";

const AddProductModal = () => {
  const { showSellFrontModal, setShowSellFrontModal, fetchProduct } =
    useGlobalContext();
  const [id, setId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchProduct(id, "sell_front");
  };

  return (
    <Modal
      show={showSellFrontModal}
      onHide={() => setShowSellFrontModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Novo Produto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} id="sellFrontAdd">
          <Form.Group controlId="formId">
            <Form.Control
              type="number"
              placeholder="Id"
              name="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShowSellFrontModal(false)}
        >
          Cancelar
        </Button>
        <Button variant="primary" type="submit" form="sellFrontAdd">
          Adicionar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProductModal;
