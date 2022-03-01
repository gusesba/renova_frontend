import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useGlobalContext } from "../../context";

const AddProductsModal = () => {
  const { showAddProductModal, setShowAddProductModal, addProduct } =
    useGlobalContext();
  const [values, setValues] = useState({
    price: "",
    type: "",
    brand: "",
    size: "",
    color: "",
    providerId: 0,
    description: "",
  });

  const onChange = (ev) => {
    setValues({
      ...values,
      [ev.target.name]: ev.target.value,
    });
  };

  const handleSubmit = () => {
    if (true) {
      addProduct(values);
      setShowAddProductModal(false);
      setValues({
        price: "",
        type: "",
        brand: "",
        size: "",
        color: "",
        providerId: 0,
        description: "",
      });
    } else {
      alert("Preencha os campos obrigatórios");
    }
  };

  return (
    <Modal
      size="lg"
      show={showAddProductModal}
      onHide={() => setShowAddProductModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Novo Produto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="div-large-form">
            <Form.Group className="mb-3 form-group" controlId="formPrice">
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="text"
                placeholder="Preço"
                name="price"
                value={values.price}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3 form-group" controlId="formtype">
              <Form.Label>Roupa</Form.Label>
              <Form.Control
                type="text"
                placeholder="Roupa"
                name="type"
                value={values.type}
                onChange={onChange}
              />
            </Form.Group>
          </div>
          <div className="div-large-form">
            <Form.Group className="mb-3 form-group" controlId="formBrand">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                placeholder="Marca"
                name="brand"
                value={values.brand}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3 form-group" controlId="formSize">
              <Form.Label>Tamanho</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tamanho"
                name="size"
                value={values.size}
                onChange={onChange}
              />
            </Form.Group>
          </div>
          <div className="div-large-form">
            <Form.Group className="mb-3 form-group" controlId="formColor">
              <Form.Label>Cor</Form.Label>
              <Form.Control
                type="text"
                placeholder="Cor"
                name="color"
                value={values.color}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3 form-group" controlId="formProviderId">
              <Form.Label>Fornecedor</Form.Label>
              <Form.Control
                type="text"
                placeholder="Fornecedor"
                name="providerId"
                value={values.providerId}
                onChange={onChange}
              />
            </Form.Group>
          </div>
          <div className="div-large-form">
            <Form.Group className="mb-3 form-group" controlId="formDescription">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                placeholder="Descrição"
                name="description"
                value={values.description}
                onChange={onChange}
              />
            </Form.Group>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShowAddProductModal(false)}
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

export default AddProductsModal;