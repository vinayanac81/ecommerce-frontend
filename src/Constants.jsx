import axios from "axios";

// export const BaseUrl = "http://localhost:1009";
// export const ReferralBaseUrl="http://localhost:5173/signup"
// const AxiosInstance = axios.create({
//   baseURL: "http://localhost:1009",
// });
export const BaseUrl = "https://ecommerce-backend-1md8.onrender.com";
export const ReferralBaseUrl = "https://ecommerce-frong.onrender.com/signup";
const AxiosInstance = axios.create({
  baseURL: "https://ecommerce-backend-1md8.onrender.com",
});

AxiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("admin-token");
  config.headers["Authorization"] = `Bearer ${token}`;
  config.headers["Access-control-Allow-Origin"] = "*";
  return config;
});
export default AxiosInstance;

// export const AxiosUserInstance = axios.create({
//   baseURL: "http://localhost:1009",
// });

// AxiosUserInstance.interceptors.request.use(function (config) {
//   const token = localStorage.getItem("token");
//   config.headers["Authorization"] = `Bearer ${token}`;
//   config.headers["Access-control-Allow-Origin"] = "*";
//   return config;
// });
