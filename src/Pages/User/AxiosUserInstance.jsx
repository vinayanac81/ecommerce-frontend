import axios from "axios";
import { BaseUrl } from "../../Constants";

const AxiosUserInstance = axios.create({
  baseURL: BaseUrl,
});

AxiosUserInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers["Authorization"] = `Bearer ${token}`;
  config.headers["Access-control-Allow-Origin"] = "*";
  return config;
});
export default AxiosUserInstance;
