import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import * as qz from "qz-tray";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [pageName, setPageName] = useState("Home");

  const [clientsData, setClientsData] = useState([]);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [clientRows, setClientRows] = useState([]);
  const [clientData, setClientData] = useState({ product: [] });
  const [actualTableUsage, setActualTableUsage] = useState("total");
  const [pageOptions, setPageOptions] = useState({});
  const [clientFilter, setClientFilter] = useState({});
  const [clientPageOptions, setClientPageOptions] = useState({});

  const [productsData, setProductsData] = useState([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [productRows, setProductRows] = useState([]);
  const [productData, setProductData] = useState({});
  const [productPageOptions, setProductPageOptions] = useState({});
  const [productFilter, setProductFilter] = useState({});
  const [options, setOptions] = useState([]);

  const [sellData, setSellData] = useState([]);
  const [showAddSellModal, setShowAddSellModal] = useState(false);
  const [sellRows, setSellRows] = useState([]);
  const [sellPageOptions, setSellPageOptions] = useState({});
  const [sellFilter, setSellFilter] = useState({});

  const [borrowData, setBorrowData] = useState([]);
  const [showAddBorrowModal, setShowAddBorrowModal] = useState(false);
  const [borrowRows, setBorrowRows] = useState([]);
  const [borrowPageOptions, setBorrowPageOptions] = useState({});
  const [borrowFilter, setBorrowFilter] = useState({});

  const [sellFrontProducts, setSellFrontProducts] = useState([]);
  const [sellFrontRows, setSellFrontRows] = useState([]);
  const [showSellFrontModal, setShowSellFrontModal] = useState(false);

  const [alert, setAlert] = useState({
    show: false,
    message: "Produto já cadastrado",
    variant: "success",
  });

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
        setAlert({
          show: true,
          message: "Erro ao listar clientes",
          variant: "danger",
        });
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
        setAlert({
          show: true,
          message: "Cliente Adicionado",
          variant: "success",
        });
      })
      .catch((err) => {
        setAlert({
          show: true,
          message: "Erro ao adicionar cliente",
          variant: "danger",
        });
        console.log(err);
      });
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
        .then((err) => {
          if (err.data.error === "SequelizeForeignKeyConstraintError") {
            setAlert({
              show: true,
              message: "Cliente atrelado a produto",
              variant: "danger",
            });
          } else {
            setAlert({
              show: true,
              message: "Cliente Deletado",
              variant: "success",
            });
          }
          fetchClients();
        })
        .catch((err) => alert("Falha ao excluir cliente!"));
    } else {
      setAlert({
        show: true,
        message: "Deletar 1 Cliente por vez",
        variant: "danger",
      });
    }
  };

  const goToClientPage = () => {
    if (clientRows.length === 1) {
      window.location = "/client/".concat(clientRows[0].original.id);
    } else {
      setAlert({
        show: true,
        message: "Selecionar apenas 1 Cliente",
        variant: "danger",
      });
    }
  };

  const goToSellFrontPage = () => {
    if (clientRows.length === 1) {
      window.location = "/sell/".concat(clientRows[0].original.id);
    } else {
      setAlert({
        show: true,
        message: "Selecionar apenas 1 Cliente",
        variant: "danger",
      });
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
        setAlert({
          show: true,
          message: "Erro ao listar produtos",
          variant: "danger",
        });
        console.log(err);
      });
  };

  const addProduct = async (data) => {
    axios({
      method: "post",
      url: "http://localhost:5000/api/v1/products",
      data,
    })
      .then((res) => {
        if (res.data.error === "User not found") {
          setAlert({
            show: true,
            message: "Fornecedor Inválido",
            variant: "danger",
          });
        }
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
    } else {
      setAlert({
        show: true,
        message: "Deletar 1 produto por vez",
        variant: "danger",
      });
    }
  };

  const goToProductPage = () => {
    if (productRows.length === 1) {
      window.location = "/product/".concat(productRows[0].original.id);
    } else {
      setAlert({
        show: true,
        message: "Selecionar 1 produto",
        variant: "danger",
      });
    }
  };

  const fetchProduct = async (id, page) => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/v1/products/${id}`,
    })
      .then((response) => {
        if (page === "sell_front") {
          if (response.data.sell === null) {
            let controll = true;
            sellFrontProducts.forEach((data) => {
              if (data.id === response.data.id) {
                setAlert({
                  show: true,
                  message: "Produto Já Selecionado",
                  variant: "danger",
                });
                controll = false;
              }
            });
            if (controll) {
              setSellFrontProducts([...sellFrontProducts, response.data]);
            }
          } else {
            setAlert({
              show: true,
              message: "Produto já vendido",
              variant: "danger",
            });
          }
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
        setSellData(response.data);
      })
      .catch((err) => {
        setAlert({
          show: true,
          message: "Erro ao listar vendas",
          variant: "danger",
        });
        console.log(err);
      });
  };

  const addSell = async (data) => {
    axios({
      method: "post",
      url: "http://localhost:5000/api/v1/sells",
      data,
    })
      .then((response) => {
        if (response.data.error === "SequelizeUniqueConstraintError") {
          setAlert({
            show: true,
            message: "Produto já vendido",
            variant: "danger",
          });
        } else if (response.data.error === "Product not found") {
          setAlert({
            show: true,
            message: "Produto Inválido",
            variant: "danger",
          });
        } else if (response.data.error === "Buyer not found") {
          setAlert({
            show: true,
            message: "Cliente Inválido",
            variant: "danger",
          });
        }
        fetchSells();
      })
      .catch((err) => console.log(err));
  };

  const deleteSell = async (data) => {
    if (sellRows.length === 1) {
      const url = "http://localhost:5000/api/v1/sells/".concat(
        sellRows[0].original.id
      );
      axios({
        method: "delete",
        url: url,
      })
        .then(() => {
          fetchSells();
        })
        .catch((err) => console.log(err));
    } else {
      setAlert({
        show: true,
        message: "Deletar 1 produto por vez",
        variant: "danger",
      });
    }
  };

  // Borrows

  const fetchBorrows = async () => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/v1/sells/borrows",
    })
      .then(function (response) {
        setBorrowData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addBorrow = async (data) => {
    console.log(data);
    axios({
      method: "post",
      url: "http://localhost:5000/api/v1/sells/borrows",
      data,
    })
      .then(() => {
        fetchBorrows();
      })
      .catch((err) => console.log(err));
  };

  const deleteBorrow = async (data) => {
    if (borrowRows.length === 1) {
      const url = "http://localhost:5000/api/v1/sells/".concat(
        borrowRows[0].original.id
      );
      axios({
        method: "delete",
        url: url,
      })
        .then(() => {
          fetchBorrows();
        })
        .catch((err) => console.log(err));
    } else {
      setAlert({
        show: true,
        message: "Deletar 1 produto por vez",
        variant: "danger",
      });
    }
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

  const finishSell = (clientId) => {
    sellFrontProducts.forEach((product) => {
      addSell({ buyerId: clientId, productId: product.id });
    });
  };

  //Impressora

  const printEtiqueta2 = () => {
    qz.websocket
      .connect()
      .then(() => {
        return qz.printers.find("Argox");
      })
      .then(async (found) => {
        console.log(found);
        var config = qz.configs.create(found);
        for (let i = 0; i < Math.floor(productRows.length / 3); i++) {
          var data = [
            "\x02L\n", // Important DPL/CLP must begin with STX (x02) on
            "A3\n",
            "D11\n",
            "H30\n",
            "Q1\n",
            //Etq 1
            //Renova
            "3" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0040" + //row bottom to top - max 200
              "0080" + // collumn left to right - max 400
              "RENOVA" + // data
              "\n",
            // Desc
            "3" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0065" + //row bottom to top - max 200
              "0110" + // collumn left to right - max 400
              productRows[i * 3].original.description + // data
              "\n",
            // Data
            "3" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0090" + //row bottom to top - max 200
              "0110" + // collumn left to right - max 400
              productRows[i * 3].original.createdAt.split("T")[0] + // data
              "\n",
            //Tam
            "3" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0115" + //row bottom to top - max 200
              "0110" + // collumn left to right - max 400
              productRows[i * 3].original.size + // data
              "\n",
            //Preco
            "3" + // rotation
              "3" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0140" + //row bottom to top - max 200
              "0110" + // collumn left to right - max 400
              "R$" +
              productRows[i * 3].original.price + // data
              "\n",
            //Barcode
            "3D5200002000110" + padId(productRows[i * 3].original.id) + "\n",
            //Etq 2
            //Renova
            "3" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0040" + //row bottom to top - max 200
              "0215" + // collumn left to right - max 400
              "RENOVA" + // data
              "\n",
            // Desc
            "3" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0065" + //row bottom to top - max 200
              "0245" + // collumn left to right - max 400
              productRows[i * 3 + 1].original.description + // data
              "\n",
            // Data
            "3" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0090" + //row bottom to top - max 200
              "0245" + // collumn left to right - max 400
              productRows[i * 3 + 1].original.createdAt.split("T")[0] + // data
              "\n",
            //Tam
            "3" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0115" + //row bottom to top - max 200
              "0245" + // collumn left to right - max 400
              productRows[i * 3 + 1].original.size + // data
              "\n",
            //Preco
            "3" + // rotation
              "3" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0140" + //row bottom to top - max 200
              "0245" + // collumn left to right - max 400
              "R$" +
              productRows[i * 3 + 1].original.price + // data
              "\n",
            //Barcode
            "3D5200002000245" +
              padId(productRows[i * 3 + 1].original.id) +
              "\n",
            //Etq 3
            //Renova
            "3" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0040" + //row bottom to top - max 200
              "0350" + // collumn left to right - max 400
              "RENOVA" + // data
              "\n",
            // Desc
            "3" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0065" + //row bottom to top - max 200
              "0380" + // collumn left to right - max 400
              productRows[i * 3 + 2].original.description + // data
              "\n",
            // Data
            "3" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0090" + //row bottom to top - max 200
              "0380" + // collumn left to right - max 400
              productRows[i * 3 + 2].original.createdAt.split("T")[0] + // data
              "\n",
            //Tam
            "3" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0115" + //row bottom to top - max 200
              "0380" + // collumn left to right - max 400
              productRows[i * 3 + 2].original.size + // data
              "\n",
            //Preco
            "3" + // rotation
              "3" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0140" + //row bottom to top - max 200
              "0380" + // collumn left to right - max 400
              "R$" +
              productRows[i * 3 + 2].original.price + // data
              "\n",
            //Barcode
            "3D5200002000380" +
              padId(productRows[i * 3 + 2].original.id) +
              "\n",
            "E\n",
          ];
          await qz.print(config, data).catch(function (e) {
            console.error(e);
          });
          console.log("impressao 1");
        }

        if (productRows.length % 3 === 1) {
          var data = [
            "\x02L\n", // Important DPL/CLP must begin with STX (x02) on
            "A3\n",
            "D11\n",
            "H30\n",
            "Q1\n",
            //Etq 1
            //Renova
            "1" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0190" + //row bottom to top - max 200
              "0040" + // collumn left to right - max 400
              "RENOVA" + // data
              "\n",
            // Desc
            "1" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0165" + //row bottom to top - max 200
              "0010" + // collumn left to right - max 400
              productRows[productRows.length - 1].original.description + // data
              "\n",
            // Data
            "1" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0142" + //row bottom to top - max 200
              "0010" + // collumn left to right - max 400
              productRows[productRows.length - 1].original.createdAt.split(
                "T"
              )[0] + // data
              "\n",
            //Tam
            "1" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0120" + //row bottom to top - max 200
              "0010" + // collumn left to right - max 400
              productRows[productRows.length - 1].original.size + // data
              "\n",
            //Preco
            "1" + // rotation
              "3" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0090" + //row bottom to top - max 200
              "0010" + // collumn left to right - max 400
              "R$" +
              productRows[productRows.length - 1].original.price + // data
              "\n",
            //Barcode
            "1D5200000200020" +
              padId(productRows[productRows.length - 1].original.id) +
              "\n",
            "E\n",
          ];
          await qz.print(config, data).catch(function (e) {
            console.error(e);
          });
          console.log("impressao 2");
        }

        if (productRows.length % 3 === 2) {
          var data = [
            "\x02L\n", // Important DPL/CLP must begin with STX (x02) on
            "A3\n",
            "D11\n",
            "H30\n",
            "Q1\n",
            //Etq 1
            //Renova
            "1" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0190" + //row bottom to top - max 200
              "0040" + // collumn left to right - max 400
              "RENOVA" + // data
              "\n",
            // Desc
            "1" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0165" + //row bottom to top - max 200
              "0010" + // collumn left to right - max 400
              productRows[productRows.length - 2].original.description + // data
              "\n",
            // Data
            "1" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0142" + //row bottom to top - max 200
              "0010" + // collumn left to right - max 400
              productRows[productRows.length - 2].original.createdAt.split(
                "T"
              )[0] + // data
              "\n",
            //Tam
            "1" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0120" + //row bottom to top - max 200
              "0010" + // collumn left to right - max 400
              productRows[productRows.length - 2].original.size + // data
              "\n",
            //Preco
            "1" + // rotation
              "3" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0090" + //row bottom to top - max 200
              "0010" + // collumn left to right - max 400
              "R$" +
              productRows[productRows.length - 2].original.price + // data
              "\n",
            //Barcode
            "1D5200000200020" +
              padId(productRows[productRows.length - 2].original.id) +
              "\n",
            //Etq 2
            //Renova
            "1" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0190" + //row bottom to top - max 200
              "0180" + // collumn left to right - max 400
              "RENOVA" + // data
              "\n",
            // Desc
            "1" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0165" + //row bottom to top - max 200
              "0150" + // collumn left to right - max 400
              productRows[productRows.length - 1].original.description + // data
              "\n",
            // Data
            "1" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0142" + //row bottom to top - max 200
              "0150" + // collumn left to right - max 400
              productRows[productRows.length - 1].original.createdAt.split(
                "T"
              )[0] + // data
              "\n",
            //Tam
            "1" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0120" + //row bottom to top - max 200
              "0150" + // collumn left to right - max 400
              productRows[productRows.length - 1].original.size + // data
              "\n",
            //Preco
            "1" + // rotation
              "3" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0090" + //row bottom to top - max 200
              "0150" + // collumn left to right - max 400
              "R$" +
              productRows[productRows.length - 1].original.price + // data
              "\n",
            //Barcode
            "1D5200000200160" +
              padId(productRows[productRows.length - 1].original.id) +
              "\n",
            "E\n",
          ];
          await qz.print(config, data).catch(function (e) {
            console.error(e);
          });
          console.log("impressao 2");
        }

        await qz.print(config, data).catch(function (e) {
          console.error(e);
        });
      });
  };

  const padId = (id) => {
    let strID = String(id);
    for (let i = strID.length; i < 9; i++) {
      strID = "0".concat(strID);
    }
    return strID;
  };

  const printEtiqueta = () => {
    if (productRows.length > 0) {
      if (qz.websocket.isActive()) {
        qz.websocket.disconnect().then(() => printEtiqueta2());
      } else {
        printEtiqueta2();
      }
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
        finishSell,
        goToSellFrontPage,
        printEtiqueta,
        pageOptions,
        setPageOptions,
        clientFilter,
        setClientFilter,
        productPageOptions,
        setProductPageOptions,
        productFilter,
        setProductFilter,
        pageName,
        setPageName,
        sellRows,
        setSellRows,
        sellPageOptions,
        setSellPageOptions,
        sellFilter,
        setSellFilter,
        deleteSell,
        borrowData,
        setBorrowData,
        showAddBorrowModal,
        setShowAddBorrowModal,
        borrowRows,
        setBorrowRows,
        borrowPageOptions,
        setBorrowPageOptions,
        borrowFilter,
        setBorrowFilter,
        fetchBorrows,
        addBorrow,
        deleteBorrow,
        alert,
        setAlert,
        options,
        setOptions,
        clientPageOptions,
        setClientPageOptions,
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
