import axios from "axios";
import { toast } from "react-toastify";
import { interceptorLoadingElements } from "./formatters";

//Khoi tao mot doi tuong Axios
let authorizeAxiosInstance = axios.create()

//Thoi gian cho toi da cua 1 request
authorizeAxiosInstance.defaults.timeout = 1000*60*10

//withCredentials: se cho phep Axios tu dong gui cookie trong moi request len BE 
//(phuc vu viec chung ta se luu tru JWT tokens (refresh & access) vao trong httpOnly Cookies cua trinh duyet)
authorizeAxiosInstance.defaults.withCredentials = true

//Cau hinh Interceptors (Bo danh chan vao giua moi Request & Response)
// https://axios.rest/pages/advanced/interceptors

// Interceptors Request: can thiep vao giua nhung cai request API
authorizeAxiosInstance.interceptors.request.use((config) => {
    //Ky thuat chan Spam Click
    interceptorLoadingElements(true)
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Interceptors Reponse: can thiep vao giua nhung cai reponse nhan ve
authorizeAxiosInstance.interceptors.response.use((response) => {
    //Ky thuat chan Spam Click
    interceptorLoadingElements(false)
    return response;
  }, (error) => {
    //Ky thuat chan Spam Click
    interceptorLoadingElements(false)

    let errorMessage = error?.message
    if(error.response?.data?.message) {
        errorMessage = error.response?.data?.message
    } 

    if(error.response?.status !== 410) {
        toast.error(errorMessage)
    }

    return Promise.reject(error);
  }
);


export default authorizeAxiosInstance