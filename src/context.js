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

  const [productData, setProductData] = useState([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [productRows, setProductRows] = useState([]);

  const [sellData, setSellData] = useState([]);
  const [showAddSellModal, setShowAddSellModal] = useState(false);

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
        setClientData(response.data);
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
        .catch((err) => console.log(err));
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
        setProductData(response.data);
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
          console.log("teste");
          fetchProducts();
        })
        .catch((err) => console.log(err));
    }
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
        productData,
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
