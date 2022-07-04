import axios from "axios";
import { url_server } from "../config";

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
