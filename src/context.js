import React, { useContext, useState } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [clientsData, setClientsData] = useState([]);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [clientRows, setClientRows] = useState([]);
  const [clientData, setClientData] = useState({ product: [] });
  const [actualTableUsage, setActualTableUsage] = useState("total");

  const [productsData, setProductsData] = useState([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [productRows, setProductRows] = useState([]);
  const [productData, setProductData] = useState({});

  const [sellData, setSellData] = useState([]);
  const [showAddSellModal, setShowAddSellModal] = useState(false);

  const [sellFrontProducts, setSellFrontProducts] = useState([]);
  const [sellFrontRows, setSellFrontRows] = useState([]);
  const [showSellFrontModal, setShowSellFrontModal] = useState(false);

  //Clients

  const fetchClients = async () => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/v1/clients",
    })
      .then(function (response) {
        setClientsData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addClient = async (data) => {
    axios({
      method: "post",
      url: "http://localhost:5000/api/v1/clients",
      data,
    })
      .then(() => {
        fetchClients();
      })
      .catch((err) => console.log(err));
  };

  const fetchClient = async (id) => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/v1/clients/${id}`,
    })
      .then((response) => {
        response.data.client.income = response.data.income[0].grossIncome;
        response.data.client.boughtValue =
          response.data.boughtValue[0].grossIncome;
        setClientData(response.data.client);
      })
      .catch((err) => console.log(err));
  };

  const deleteClient = async (data) => {
    if (clientRows.length === 1) {
      const url = "http://localhost:5000/api/v1/clients/".concat(
        clientRows[0].original.id
      );
      axios({
        method: "delete",
        url: url,
      })
        .then(() => {
          fetchClients();
        })
        .catch((err) => alert("Falha ao excluir cliente!"));
    }
  };

  const goToClientPage = () => {
    if (clientRows.length === 1) {
      window.location = "/client/".concat(clientRows[0].original.id);
    }
  };

  //Products

  const fetchProducts = async () => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/v1/products",
    })
      .then(function (response) {
        setProductsData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addProduct = async (data) => {
    axios({
      method: "post",
      url: "http://localhost:5000/api/v1/products",
      data,
    })
      .then(() => {
        fetchProducts();
      })
      .catch((err) => console.log(err));
  };

  const deleteProduct = async (data) => {
    if (productRows.length === 1) {
      const url = "http://localhost:5000/api/v1/products/".concat(
        productRows[0].original.id
      );
      axios({
        method: "delete",
        url: url,
      })
        .then(() => {
          fetchProducts();
        })
        .catch((err) => console.log(err));
    }
  };

  const goToProductPage = () => {
    if (productRows.length === 1) {
      window.location = "/product/".concat(productRows[0].original.id);
    }
  };

  const fetchProduct = async (id, page) => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/v1/products/${id}`,
    })
      .then((response) => {
        if (page === "sell_front") {
          setSellFrontProducts([...sellFrontProducts, response.data]);
        } else {
          setProductData(response.data);
        }
      })
      .catch((err) => console.log(err));
  };

  // Sells

  const fetchSells = async () => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/v1/sells",
    })
      .then(function (response) {
        console.log(response.data);
        setSellData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addSell = async (data) => {
    axios({
      method: "post",
      url: "http://localhost:5000/api/v1/sells",
      data,
    })
      .then(() => {
        fetchSells();
      })
      .catch((err) => console.log(err));
  };

  //SellFront

  const deleteLine = () => {
    if (sellFrontRows.length === 1) {
      setSellFrontProducts(
        sellFrontProducts.filter(
          (product) => product.id !== sellFrontRows[0].original.id
        )
      );
    }
  };

  return (
    <AppContext.Provider
      value={{
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        fetchClients,
        clientsData,
        showAddClientModal,
        setShowAddClientModal,
        addClient,
        productsData,
        showAddProductModal,
        setShowAddProductModal,
        addProduct,
        sellData,
        showAddSellModal,
        setShowAddSellModal,
        addSell,
        setClientRows,
        deleteClient,
        clientData,
        fetchClient,
        goToClientPage,
        fetchSells,
        fetchProducts,
        actualTableUsage,
        setActualTableUsage,
        setProductRows,
        deleteProduct,
        goToProductPage,
        productData,
        fetchProduct,
        sellFrontProducts,
        setSellFrontRows,
        setSellFrontProducts,
        setShowSellFrontModal,
        showSellFrontModal,
        deleteLine,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
