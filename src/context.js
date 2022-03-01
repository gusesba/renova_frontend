import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [clientData, setClientData] = useState([]);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [clientRows, setClientRows] = useState([]);

  const [productData, setProductData] = useState([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  const [sellData, setSellData] = useState([]);
  const [showAddSellModal, setShowAddSellModal] = useState(false);

  //Clients
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/v1/clients",
    })
      .then(function (response) {
        setClientData(response.data);
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

  //Products

  useEffect(() => {
    fetchProducts();
  }, []);

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

  // Sells
  useEffect(() => {
    fetchSells();
  }, []);

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
        clientData,
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
