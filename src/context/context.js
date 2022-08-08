import React, { useContext, useState } from "react";
import axios from "axios";
import * as qz from "qz-tray";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [pageName, setPageName] = useState("Home");

  const [clientsData, setClientsData] = useState([]);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showUpdateClientModal, setShowUpdateClientModal] = useState(false);
  const [clientRows, setClientRows] = useState([]);
  const [clientData, setClientData] = useState({ product: [] });
  const [actualTableUsage, setActualTableUsage] = useState("total");
  const [pageOptions, setPageOptions] = useState({});
  const [clientFilter, setClientFilter] = useState({});
  const [clientPageOptions, setClientPageOptions] = useState({});
  const [clientsColumns, setClientsColumns] = useState([]);
  const [clientColumns, setClientColumns] = useState([]);
  const [clientIncome, setClientIncome] = useState({});
  const [dateInit, setDateInit] = useState("2020-01-01");
  const [dateFinal, setDateFinal] = useState("2025-01-01");

  const [productsData, setProductsData] = useState([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showUpdateProductModal, setShowUpdateProductModal] = useState(false);
  const [productRows, setProductRows] = useState([]);
  const [productData, setProductData] = useState({});
  const [productPageOptions, setProductPageOptions] = useState({});
  const [productFilter, setProductFilter] = useState({});
  const [options, setOptions] = useState([]);
  const [productsColumns, setProductsColumns] = useState([]);

  const [sellData, setSellData] = useState([]);
  const [showAddSellModal, setShowAddSellModal] = useState(false);
  const [sellRows, setSellRows] = useState([]);
  const [sellPageOptions, setSellPageOptions] = useState({});
  const [sellFilter, setSellFilter] = useState({});
  const [sellsColumns, setSellsColumns] = useState([]);

  const [borrowData, setBorrowData] = useState([]);
  const [showAddBorrowModal, setShowAddBorrowModal] = useState(false);
  const [borrowRows, setBorrowRows] = useState([]);
  const [borrowPageOptions, setBorrowPageOptions] = useState({});
  const [borrowFilter, setBorrowFilter] = useState({});
  const [borrowsColumns, setBorrowsColumns] = useState([]);

  const [donationsData, setDonationsData] = useState([]);
  const [showAddDonationModal, setShowAddDonationModal] = useState(false);
  const [donationsRows, setDonationsRows] = useState([]);
  const [donationsPageOptions, setDonationsPageOptions] = useState({});
  const [donationsFilter, setDonationsFilter] = useState({});
  const [donationsColumns, setDonationsColumns] = useState([]);

  const [devolutionsData, setDevolutionsData] = useState([]);
  const [showAddDevolutionModal, setShowAddDevolutionModal] = useState(false);
  const [devolutionsRows, setDevolutionsRows] = useState([]);
  const [devolutionsPageOptions, setDevolutionsPageOptions] = useState({});
  const [devolutionsFilter, setDevolutionsFilter] = useState({});
  const [devolutionsColumns, setDevolutionsColumns] = useState([]);

  const [sellFrontProducts, setSellFrontProducts] = useState([]);
  const [sellFrontRows, setSellFrontRows] = useState([]);
  const [showSellFrontModal, setShowSellFrontModal] = useState(false);
  const [showEditPriceModal, setShowEditPriceModal] = useState(false);

  const [showSelectColumnsModal, setShowSelectColumnsModal] = useState(false);

  const url_server = "https://renovab.herokuapp.com";
  //const url_server = "http://localhost:5000";

  const [alert, setAlert] = useState({
    show: false,
    message: "Produto já cadastrado",
    variant: "success",
  });

  //Clients

  const fetchClients = async () => {
    axios({
      method: "get",
      url: url_server + "/api/v1/clients",
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
      url: url_server + "/api/v1/clients",
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

  const fetchClient = async (id, date) => {
    axios({
      method: "get",
      url: url_server + `/api/v1/clients/${id}`,
    })
      .then((response) => {
        console.log(response.data);
        response.data.client.product.forEach((product) => {
          let date = new Date(product.createdAt);
          product.entryDate = date.getMonth() + 1 + "/" + date.getFullYear();
          if (product.sell !== null) {
            let departureDate = new Date(product.sell.createdAt);
            product.departureDate =
              departureDate.getMonth() + 1 + "/" + departureDate.getFullYear();
          }
        });
        response.data.client.buyer.forEach((buyer) => {
          let date = new Date(buyer.product.createdAt);
          buyer.product.entryDate =
            date.getMonth() + 1 + "/" + date.getFullYear();
          if (buyer.product.sell !== null) {
            let departureDate = new Date(buyer.product.sell.createdAt);
            buyer.product.departureDate =
              departureDate.getMonth() + 1 + "/" + departureDate.getFullYear();
          }
        });
        setClientData(response.data.client);
      })
      .catch((err) => console.log(err));
  };

  const fetchClientIncome = async (id, data) => {
    console.log(data);
    axios({
      method: "post",
      url: url_server + `/api/v1/sells/${id}/income`,
      data,
    })
      .then((response) => {
        setClientIncome(response.data);
      })
      .catch((err) => console.log(err));
  };

  const deleteClient = async () => {
    if (clientRows.length === 1) {
      const url =
        url_server + "/api/v1/clients/".concat(clientRows[0].original.id);
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

  const updateClient = async (data) => {
    if (clientRows.length === 1) {
      const url =
        url_server + "/api/v1/clients/".concat(clientRows[0].original.id);
      axios({
        method: "patch",
        url: url,
        data,
      })
        .then(() => {
          fetchClients();
          setAlert({
            show: true,
            message: "Cliente Atualizado",
            variant: "success",
          });
        })
        .catch((err) => {
          setAlert({
            show: true,
            message: "Erro ao atualizar cliente",
            variant: "danger",
          });
          console.log(err);
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

  const openUpdateClientModal = () => {
    if (clientRows.length === 1) {
      setShowUpdateClientModal(true);
    } else {
      setAlert({
        show: true,
        message: "Selecionar apenas 1 Cliente",
        variant: "danger",
      });
    }
  };

  const goToSellFrontPage = (sell) => {
    if (clientRows.length === 1) {
      window.location = "/sell/"
        .concat(clientRows[0].original.id)
        .concat("/" + sell);
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
      url: url_server + "/api/v1/products",
    })
      .then(function (response) {
        response.data.forEach((product) => {
          let date = new Date(product.createdAt);
          product.entryDate = date.getMonth() + 1 + "/" + date.getFullYear();
        });
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
      url: url_server + "/api/v1/products",
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
      const url =
        url_server + "/api/v1/products/".concat(productRows[0].original.id);
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

  const updateProduct = async (data) => {
    if (productRows.length === 1) {
      const url =
        url_server + "/api/v1/products/".concat(productRows[0].original.id);
      axios({
        method: "patch",
        url: url,
        data,
      })
        .then(() => {
          fetchProducts();
          setAlert({
            show: true,
            message: "Produto Atualizado",
            variant: "success",
          });
        })
        .catch((err) => {
          setAlert({
            show: true,
            message: "Erro ao atualizar produto",
            variant: "danger",
          });
          console.log(err);
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

  const openUpdateProductModal = () => {
    if (productRows.length === 1) {
      setShowUpdateProductModal(true);
    } else {
      setAlert({
        show: true,
        message: "Selecionar apenas 1 Produto",
        variant: "danger",
      });
    }
  };

  const fetchProduct = async (id, page) => {
    axios({
      method: "get",
      url: url_server + `/api/v1/products/${id}`,
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
              const dias =
                (new Date() - new Date(response.data.createdAt)) / 86400000;
              var sellPrice = response.data.price;
              if (dias > 90) {
                sellPrice = response.data.price * 0.7;
              } else if (dias > 60) {
                sellPrice = response.data.price * 0.8;
              } else if (dias > 30) {
                sellPrice = response.data.price * 0.9;
              }

              setSellFrontProducts([
                ...sellFrontProducts,
                { ...response.data, sellPrice: sellPrice },
              ]);
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
      url: url_server + "/api/v1/sells",
    })
      .then(function (response) {
        response.data.forEach((sell) => {
          let date = new Date(sell.product.createdAt);
          sell.entryDate = date.getMonth() + 1 + "/" + date.getFullYear();
          let sellDate = new Date(sell.createdAt);
          sell.sellDate =
            sellDate.getMonth() + 1 + "/" + sellDate.getFullYear();
        });
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
      url: url_server + "/api/v1/sells",
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
      const url = url_server + "/api/v1/sells/".concat(sellRows[0].original.id);
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
      url: url_server + "/api/v1/sells/borrows",
    })
      .then(function (response) {
        response.data.forEach((borrow) => {
          let date = new Date(borrow.product.createdAt);
          borrow.entryDate = date.getMonth() + 1 + "/" + date.getFullYear();
          let borrowDate = new Date(borrow.createdAt);
          borrow.borrowDate =
            borrowDate.getMonth() + 1 + "/" + borrowDate.getFullYear();
        });
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
      url: url_server + "/api/v1/sells/borrows",
      data,
    })
      .then(() => {
        fetchBorrows();
      })
      .catch((err) => console.log(err));
  };

  const deleteBorrow = async (data) => {
    if (borrowRows.length === 1) {
      const url =
        url_server + "/api/v1/sells/".concat(borrowRows[0].original.id);
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

  // Donations

  const addDonation = async (data) => {
    console.log(data);
    axios({
      method: "post",
      url: url_server + "/api/v1/sells/donations",
      data,
    })
      .then(() => {
        fetchDonations();
      })
      .catch((err) => console.log(err));
  };

  const deleteDonation = async (data) => {
    if (donationsRows.length === 1) {
      const url =
        url_server + "/api/v1/sells/".concat(donationsRows[0].original.id);
      axios({
        method: "delete",
        url: url,
      })
        .then(() => {
          fetchDonations();
        })
        .catch((err) => console.log(err));
    } else {
      setAlert({
        show: true,
        message: "Deletar 1 doação por vez",
        variant: "danger",
      });
    }
  };

  const fetchDonations = async () => {
    axios({
      method: "get",
      url: url_server + "/api/v1/sells/donations",
    })
      .then(function (response) {
        response.data.forEach((donation) => {
          let date = new Date(donation.product.createdAt);
          donation.entryDate = date.getMonth() + 1 + "/" + date.getFullYear();
          let donationDate = new Date(donation.createdAt);
          donation.donationDate =
            donationDate.getMonth() + 1 + "/" + donationDate.getFullYear();
        });
        setDonationsData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Devolutions

  const addDevolution = async (data) => {
    console.log(data);
    axios({
      method: "post",
      url: url_server + "/api/v1/sells/devolutions",
      data,
    })
      .then(() => {
        fetchDevolutions();
      })
      .catch((err) => console.log(err));
  };

  const deleteDevolution = async (data) => {
    if (devolutionsRows.length === 1) {
      const url =
        url_server + "/api/v1/sells/".concat(devolutionsRows[0].original.id);
      axios({
        method: "delete",
        url: url,
      })
        .then(() => {
          fetchDevolutions();
        })
        .catch((err) => console.log(err));
    } else {
      setAlert({
        show: true,
        message: "Deletar 1 devolução por vez",
        variant: "danger",
      });
    }
  };

  const fetchDevolutions = async () => {
    axios({
      method: "get",
      url: url_server + "/api/v1/sells/devolutions",
    })
      .then(function (response) {
        response.data.forEach((devolution) => {
          let date = new Date(devolution.product.createdAt);
          devolution.entryDate = date.getMonth() + 1 + "/" + date.getFullYear();
          let devolutionDate = new Date(devolution.createdAt);
          devolution.devolutionDate =
            devolutionDate.getMonth() + 1 + "/" + devolutionDate.getFullYear();
        });
        setDevolutionsData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
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

  const finishSell = (clientId, isSell) => {
    if (isSell === "sell") {
      sellFrontProducts.forEach((product) => {
        addSell({
          buyerId: clientId,
          productId: product.id,
          sellPrice: product.sellPrice,
        });
      });
      window.location = "/sells";
    } else if (isSell === "borrow") {
      sellFrontProducts.forEach((product) => {
        addBorrow({
          buyerId: clientId,
          productId: product.id,
          sellPrice: 0,
        });
      });
      window.location = "/borrows";
    } else if (isSell === "donation") {
      sellFrontProducts.forEach((product) => {
        addDonation({
          buyerId: clientId,
          productId: product.id,
          sellPrice: 0,
        });
      });
      window.location = "/donations";
    } else if (isSell === "devolution") {
      sellFrontProducts.forEach((product) => {
        addDevolution({
          buyerId: clientId,
          productId: product.id,
          sellPrice: 0,
        });
      });
      window.location = "/devolutions";
    }
  };

  const addJoker = async () => {
    const data = {
      price: 0,
      type: "x",
      providerId: 1,
      brand: "x",
      size: "x",
      color: "x",
      number: 1,
    };
    axios({
      method: "post",
      url: url_server + "/api/v1/products",
      data,
    })
      .then((res) => {
        fetchProduct(res.data.id, "sell_front");
      })
      .catch((err) => console.log(err));
  };

  const editSellFrontProductPrice = (price) => {
    if (sellFrontRows.length === 1) {
      setSellFrontProducts(
        sellFrontProducts.map((product) => {
          if (product.id === sellFrontRows[0].original.id) {
            product.sellPrice = price;
          }
          return product;
        })
      );
    }
  };

  //Impressora Etiqueta

  const printEtiqueta2 = () => {
    qz.websocket
      .connect()
      .then(() => {
        return qz.printers.find("Argox");
      })
      .then(async (found) => {
        var config = qz.configs.create(found, {
          size: { width: 10.5, height: 6 },
          colorType: "blackwhite",
          units: "cm",
        });
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
              productRows[i * 3].original.type +
              productRows[i * 3].original.color +
              productRows[i * 3].original.brand + // data
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
            //Numero
            "3" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0210" + //row bottom to top - max 200
              "0110" + // collumn left to right - max 400
              productRows[i * 3].original.number + // data
              "\n",
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
              productRows[i * 3 + 1].original.type +
              productRows[i * 3 + 1].original.color +
              productRows[i * 3 + 1].original.brand + // data
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
            //Numero
            "3" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0210" + //row bottom to top - max 200
              "0245" + // collumn left to right - max 400
              productRows[i * 3 + 1].original.number + // data
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
              productRows[i * 3 + 2].original.type +
              productRows[i * 3 + 2].original.color +
              productRows[i * 3 + 2].original.brand + // data
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
            //Numero
            "3" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0210" + //row bottom to top - max 200
              "0380" + // collumn left to right - max 400
              productRows[i * 3 + 2].original.number + // data
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
              productRows[productRows.length - 1].original.type +
              productRows[productRows.length - 1].original.color +
              productRows[productRows.length - 1].original.brand + // data
              "\n",
            // Data
            "3" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0090" + //row bottom to top - max 200
              "0110" + // collumn left to right - max 400
              productRows[productRows.length - 1].original.createdAt.split(
                "T"
              )[0] + // data
              "\n",
            //Tam
            "3" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0110" + //row bottom to top - max 200
              "0110" + // collumn left to right - max 400
              productRows[productRows.length - 1].original.size + // data
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
              productRows[productRows.length - 1].original.price + // data
              "\n",
            //Barcode
            "3D5200002000110" +
              padId(productRows[productRows.length - 1].original.id) +
              "\n",
            //Numero
            "3" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0210" + //row bottom to top - max 200
              "0110" + // collumn left to right - max 400
              productRows[productRows.length - 1].original.number + // data
              "\n",
            "E\n",
          ];
          await qz.print(config, data).catch(function (e) {
            console.error(e);
          });
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
              productRows[productRows.length - 2].original.type +
              productRows[productRows.length - 2].original.color +
              productRows[productRows.length - 2].original.brand + // data
              "\n",
            // Data
            "3" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0090" + //row bottom to top - max 200
              "0110" + // collumn left to right - max 400
              productRows[productRows.length - 2].original.createdAt.split(
                "T"
              )[0] + // data
              "\n",
            //Tam
            "3" + // rotation
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
              "0115" + //row bottom to top - max 200
              "0110" + // collumn left to right - max 400
              "R$" +
              productRows[productRows.length - 2].original.price + // data
              "\n",
            //Barcode
            "3D5200002000110" +
              padId(productRows[productRows.length - 2].original.id) +
              "\n",
            //Numero
            "3" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0210" + //row bottom to top - max 200
              "0110" + // collumn left to right - max 400
              productRows[productRows.length - 2].original.number + // data
              "\n",
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
              productRows[productRows.length - 1].original.type +
              productRows[productRows.length - 1].original.color +
              productRows[productRows.length - 1].original.brand + // data
              "\n",
            // Data
            "3" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0090" + //row bottom to top - max 200
              "0245" + // collumn left to right - max 400
              productRows[productRows.length - 1].original.createdAt.split(
                "T"
              )[0] + // data
              "\n",
            //Tam
            "3" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0115" + //row bottom to top - max 200
              "0245" + // collumn left to right - max 400
              productRows[productRows.length - 1].original.size + // data
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
              productRows[productRows.length - 1].original.price + // data
              "\n",
            //Barcode
            "3D5200002000110" +
              padId(productRows[productRows.length - 1].original.id) +
              "\n",
            //Numero
            "3" + // rotation
              "2" + // font size
              "1" + // width mult
              "1" + // height mult
              "000" + // pattern
              "0210" + //row bottom to top - max 200
              "0245" + // collumn left to right - max 400
              productRows[productRows.length - 1].original.number + // data
              "\n",
            "E\n",
          ];
          await qz.print(config, data).catch(function (e) {
            console.error(e);
          });
        }
        await qz.websocket.disconnect();
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

  //Impressora Recibo

  const printRecibo = (sell) => {
    if (qz.websocket.isActive()) {
      qz.websocket.disconnect().then(() => printRecibo2(sell));
    } else {
      printRecibo2(sell);
    }
  };

  const printRecibo2 = (sell) => {
    const date = new Date(Date.now());
    var sellType = "";
    if (sell === "sell") {
      sellType = "Venda";
    } else if (sell === "borrow") {
      sellType = "Emprestimo";
    } else if (sell === "devolution") {
      sellType = "Devolução";
    } else if (sell === "donation") {
      sellType = "Doação";
    }
    qz.websocket
      .connect()
      .then(() => {
        return qz.printers.find("EPSON TM-T20 Receipt");
      })
      .then(async (found) => {
        var config = qz.configs.create(found);
        var productsData = [];
        var total = 0.0;
        for (var i = 0; i < sellFrontProducts.length; i++) {
          total += parseFloat(sellFrontProducts[i].sellPrice);
          var text =
            sellFrontProducts[i].type +
            " " +
            sellFrontProducts[i].color +
            " " +
            sellFrontProducts[i].brand;

          text = text.concat(" ".repeat(40 - text.length));

          text = text.concat(sellFrontProducts[i].sellPrice.toFixed(2));

          productsData = productsData.concat([
            text + //40
              "\x1B" +
              "\x74" +
              "\x13" +
              "\xAA", //print special character symbol after numeric value
            "\x0A",
          ]);
        }

        var data = [
          "\x1B" + "\x40", // init
          "\x1B" + "\x61" + "\x31", // center align
          "RENOVA" + "\x0A",

          "\x0A", // line break
          "@renova_sustentavel_curitiba" + "\x0A", // text and line break
          "\x0A", // line break
          "\x0A", // line break
          ("00" + date.getDate()).slice(-2) +
            "/" +
            ("00" + (date.getMonth() + 1)).slice(-2) +
            "/" +
            date.getFullYear() +
            " " +
            ("00" + date.getHours()).slice(-2) +
            ":" +
            ("00" + date.getMinutes()).slice(-2) +
            ":" +
            ("00" + date.getSeconds()).slice(-2) +
            "\x0A",
          "\x0A", // line break
          "\x0A", // line break
          "Registo de " + sellType + "\x0A",
          "\x0A",
          "\x0A",
          clientData.name + "\x0A",
          "\x0A",
          "\x0A",
          "\x1B" + "\x61" + "\x30", // left align
        ];

        data = data.concat(productsData);
        data = data.concat([
          "\x1B" + "\x21" + "\x0A" + "\x1B" + "\x45" + "\x0A", // em mode off
          "\x0A" + "\x0A",
          "\x1B" + "\x61" + "\x30", // left align
          "----------------------------------------------" + "\x0A",
          "Total                                   " +
            total.toFixed(2) +
            "\x1B" +
            "\x74" +
            "\x13" +
            "\xAA",
          "\x1B" + "\x61" + "\x30", // left align
          "\x0A" + "\x0A" + "\x0A" + "\x0A" + "\x0A" + "\x0A" + "\x0A",
          "\x1B" + "\x69", // cut paper
        ]);

        await qz.print(config, data).catch(function (e) {
          console.error(e);
        });
      });
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
        clientRows,
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
        addJoker,
        editSellFrontProductPrice,
        showEditPriceModal,
        setShowEditPriceModal,
        printRecibo,
        clientsColumns,
        setClientsColumns,
        productsColumns,
        setProductsColumns,
        sellsColumns,
        setSellsColumns,
        borrowsColumns,
        setBorrowsColumns,
        clientColumns,
        setClientColumns,
        donationsData,
        setDonationsData,
        showAddDonationModal,
        setShowAddDonationModal,
        donationsRows,
        setDonationsRows,
        donationsPageOptions,
        setDonationsPageOptions,
        donationsFilter,
        setDonationsFilter,
        donationsColumns,
        setDonationsColumns,
        addDonation,
        deleteDonation,
        fetchDonations,
        devolutionsData,
        setDevolutionsData,
        showAddDevolutionModal,
        setShowAddDevolutionModal,
        devolutionsRows,
        setDevolutionsRows,
        devolutionsPageOptions,
        setDevolutionsPageOptions,
        devolutionsFilter,
        setDevolutionsFilter,
        devolutionsColumns,
        setDevolutionsColumns,
        addDevolution,
        deleteDevolution,
        fetchDevolutions,
        fetchClientIncome,
        clientIncome,
        setClientIncome,
        showSelectColumnsModal,
        setShowSelectColumnsModal,
        updateClient,
        showUpdateClientModal,
        setShowUpdateClientModal,
        openUpdateClientModal,
        showUpdateProductModal,
        setShowUpdateProductModal,
        openUpdateProductModal,
        productRows,
        updateProduct,
        dateInit,
        setDateInit,
        dateFinal,
        setDateFinal,
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
