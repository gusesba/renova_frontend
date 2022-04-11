import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useGlobalContext } from "../../context";

const AddProductModal = () => {
  const { showSellFrontModal, setShowSellFrontModal, fetchProduct } =
    useGlobalContext();
  const [id, setId] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchProduct(id, "sell_front");
    setId("");
    document.getElementById("formId").focus();
  };

  useEffect(() => {
    if (showSellFrontModal) {
      document.getElementById("formId").focus();
    }
  }, [showSellFrontModal]);

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
