import axios from "axios";
import { toast } from "react-toastify";

class Http {
  constructor() {
    this.instance = axios.create({
      // baseURL: "http://192.168.10.28:8080/api/",
      // baseURL: "https://pbl6-prod-pbl-dspnq9.mo6.mogenius.io/api/booking/",
      baseURL: "https://gateway-prod-gateway-0ix8cn.mo4.mogenius.io/api/",
      // baseURL: "https://shibabooking.herokuapp.com/api/booking/",
      timeout: 40000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.instance.interceptors.response.use(
      (response) => {
        const result = { data: response.data, status: response.status };
        return result;
      },
      ({ response }) => {
        if (response.status === 401) {
          toast.error(response.data.message, {
            position: "top-right",
            autoClose: 3000,
          });
        }
        const result = { data: response.data, status: response.status };
        return Promise.reject(result);
      }
    );
    this.instance.interceptors.request.use(
      (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
          config.headers.authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error.response);
      }
    );
  }
  get(url, config = null) {
    return this.instance.get(url, config);
  }
  post(url, data, config = null) {
    return this.instance.post(url, data, config);
  }
  put(url, data, config = null) {
    return this.instance.put(url, data, config);
  }
  delete(url, data, config = null) {
    return this.instance.delete(url, {
      data,
      ...config,
    });
  }
}

const http = new Http();
export default http;
