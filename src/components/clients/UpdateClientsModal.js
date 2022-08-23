import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useGlobalContext } from "../../context/context";

const UpdateClientsModal = () => {
  const {
    showUpdateClientModal,
    setShowUpdateClientModal,
    updateClient,
    setAlert,
    clientRows,
  } = useGlobalContext();
  const [values, setValues] = useState({
    name: "",
    phone: "",
    id: "",
  });

  const onChange = (ev) => {
    setValues({
      ...values,
      [ev.target.name]: ev.target.value,
    });
  };

  useEffect(() => {
    if (clientRows.length === 1) {
      setValues({
        id: clientRows[0].original.id,
        name: clientRows[0].original.name,

        phone: clientRows[0].original.phone,
      });
    }
  }, [clientRows]);

  const handleSubmit = () => {
    if (values.name.length && values.phone.length) {
      updateClient(values);
      setShowUpdateClientModal(false);
      setValues({ name: "", phone: "" });
    } else {
      setAlert({
        show: true,
        message: "Preencha os Campos",
        variant: "danger",
      });
    }
  };

  return (
    <Modal
      show={showUpdateClientModal}
      onHide={() => setShowUpdateClientModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Atualizar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formID">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="ID"
              name="id"
              value={values.id}
              onChange={onChange}
              disabled
            />
          </Form.Group>
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
          onClick={() => setShowUpdateClientModal(false)}
        >
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Atualizar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateClientsModal;
