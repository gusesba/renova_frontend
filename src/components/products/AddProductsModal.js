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

  const [optionsType, setOptionsType] = useState([]);
  const [optionsColor, setOptionsColor] = useState([]);
  const [optionsSize, setOptionsSize] = useState([]);

  const [values, setValues] = useState({
    price: "",
    type: "",
    brand: "",
    size: "",
    color: "",
    providerId: 0,
    description: "",
  });

  useEffect(() => {
    setOptionsSize(
      [
        "PP",
        "P",
        "M",
        "G",
        "GG",
        "EXG",
        "30",
        "31",
        "32",
        "33",
        "34",
        "35",
        "36",
        "37",
        "38",
        "39",
        "40",
        "41",
        "42",
        "43",
        "44",
        "45",
        "46",
        "47",
        "48",
        "49",
        "50",
        "Unico",
        "Outro",
      ].map((item) => {
        return {
          value: item,
          label: item,
          target: {
            name: "size",
            value: item,
          },
        };
      })
    );
    setOptionsColor(
      [
        "Azul",
        "Amarelo",
        "Preto",
        "Branco",
        "Caramelo",
        "Mostarda",
        "Estampado",
        "Colorido",
        "Vermelho",
        "Roxo",
        "Lilas",
        "Rosa",
        "Pink",
        "Laranja",
        "Verde",
        "Bege",
        "Creme",
        "Cinza",
        "Chumbo",
        "Jeans",
        "Marrom",
        "Uva",
        "Xadrez",
        "Listras",
        "Marinho",
        "Nude",
        "Dourado",
        "Bronze",
        "Prata",
        "Bordo",

        "Outro",
      ].map((item) => {
        return {
          value: item,
          label: item,
          target: {
            name: "color",
            value: item,
          },
        };
      })
    );
    setOptionsType(
      [
        "Calca",
        "Bermuda",
        "Shorts",
        "Pantacourt",
        "Saia",
        "Sapato",
        "Sandalia",
        "Sapatilha",
        "Peeptoe",
        "Tamanco",
        "Mullet",
        "Chinelo",
        "Tenis",
        "Sapatenis",
        "Bota",
        "Calcado",
        "Boots",
        "Vestido",
        "Blusa",
        "Camiseta",
        "Regata",
        "Casaco",
        "Cinto",
        "Poncho",
        "Manta",
        "Paschmina",
        "Echarpe",
        "Brinco",
        "Anel",
        "Pulseira",
        "Colar",
        "Relogio",
        "Oculos",
        "Biquini",
        "Maio",
        "Body",
        "Legging",
        "Sobretudo",
        "Blazer",
        "Cropped",
        "Top",
        "Sutia",
        "Calcinha",
        "Meia",
        "Cueca",
        "Calcao",
        "Saida",
        "Chapeu",
        "Bone",
        "Viseira",
        "Touca",
        "Tiara",
        "Bolsa",
        "Carteira",
        "Necessaire",
        "Basica",
        "Pijama",
        "Camisola",
        "Roupao",
        "Kimono",
        "Camisa",
        "Colete",
        "Conjunto",
        "Jaqueta",
        "Outro",
      ].map((item) => {
        return {
          value: item,
          label: item,
          target: {
            name: "type",
            value: item,
          },
        };
      })
    );
  }, []);

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
            <Form.Group className="mb-3 form-group" controlId="formType">
              <Form.Label>Produto</Form.Label>
              <Select onChange={onChange} options={optionsType} />
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
              <Select onChange={onChange} options={optionsSize} />
            </Form.Group>
          </div>
          <div className="div-large-form">
            <Form.Group className="mb-3 form-group" controlId="formColor">
              <Form.Label>Cor</Form.Label>
              <Select onChange={onChange} options={optionsColor} />
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
