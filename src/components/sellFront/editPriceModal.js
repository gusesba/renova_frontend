import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useGlobalContext } from "../../context/context";

const EditPriceModal = () => {
  const {
    showEditPriceModal,
    setShowEditPriceModal,
    editSellFrontProductPrice,
  } = useGlobalContext();

  const [price, setPrice] = useState(12.1);

  const handleSubmit = (e) => {
    editSellFrontProductPrice(price);
    e.preventDefault();
  };

  useEffect(() => {
    if (showEditPriceModal) {
      document.getElementById("formId").focus();
    }
  }, [showEditPriceModal]);

  return (
    <Modal
      show={showEditPriceModal}
      onHide={() => setShowEditPriceModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Preço Venda</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} id="sellFrontPrice">
          <Form.Group controlId="formId">
            <Form.Control
              type="number"
              placeholder="Preço"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShowEditPriceModal(false)}
        >
          Cancelar
        </Button>
        <Button variant="primary" type="submit" form="sellFrontPrice">
          Adicionar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPriceModal;
