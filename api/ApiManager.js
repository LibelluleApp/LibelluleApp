import axios from "axios";

const ApiManager = axios.create({
  baseURL: "https://dev.libellule.app",
  responseType: "json",
});

export default ApiManager;
