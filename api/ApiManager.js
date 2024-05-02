import axios from "axios";

const ApiManager = axios.create({
  baseURL: "http://192.168.1.78:3000",
  responseType: "json",
});

export default ApiManager;
