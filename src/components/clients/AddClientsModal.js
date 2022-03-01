import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useGlobalContext } from "../../context";

const AddClientsModal = () => {
  const { showAddClientModal, setShowAddClientModal, addClient } =
    useGlobalContext();
  const [values, setValues] = useState({ name: "", phone: "" });

  const onChange = (ev) => {
    setValues({
      ...values,
      [ev.target.name]: ev.target.value,
    });
  };

  const handleSubmit = () => {
    if (values.name.length > 0 && values.phone.length > 0) {
      addClient(values);
      setShowAddClientModal(false);
      setValues({ name: "", phone: "" });
    } else {
      alert("Preencha os campos obrigatórios");
    }
  };

  return (
    <Modal
      show={showAddClientModal}
      onHide={() => setShowAddClientModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Novo Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome"
              name="name"
              value={values.name}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Telefone"
              name="phone"
              value={values.phone}
              onChange={onChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShowAddClientModal(false)}
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

export default AddClientsModal;
