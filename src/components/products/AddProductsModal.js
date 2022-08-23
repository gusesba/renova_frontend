import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import { useGlobalContext } from "../../context/context";

const AddProductsModal = () => {
  const {
    showAddProductModal,
    setShowAddProductModal,
    addProduct,
    setAlert,
    options,
  } = useGlobalContext();

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
    if (
      values.price &&
      values.type &&
      values.brand &&
      values.size &&
      values.color &&
      values.providerId
    ) {
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
        product: "",
      });
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
            <Form.Group className="mb-3 form-group" controlId="formProviderId">
              <Form.Label>Fornecedor</Form.Label>
              <Select onChange={onChange} options={options} />
            </Form.Group>
            <Form.Group className="mb-3 form-group" controlId="formtype">
              <Form.Label>Produto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Produto"
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
            <Form.Group className="mb-3 form-group" controlId="formPrice">
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="number"
                placeholder="Preço"
                name="price"
                value={values.price}
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
