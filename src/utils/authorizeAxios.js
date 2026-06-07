import axios from "axios";
import { toast } from "react-toastify";
import { interceptorLoadingElements } from "./formatters";
import { refreshTokenAPI } from "~/apis";
import { logoutUserAPI } from "~/redux/user/userSlice";

//Do khong the su dung { store } trong Redux theo cach thong thuong
//Giai phap Inject store
let axiosReduxStore 
export const injectStore = mainStore => {
  axiosReduxStore = mainStore
}

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

//Khoi tao mot cai promise cho viec API refresh_token
let refreshTokenPromise = null

// Interceptors Reponse: can thiep vao giua nhung cai reponse nhan ve
authorizeAxiosInstance.interceptors.response.use((response) => {
    //Ky thuat chan Spam Click
    interceptorLoadingElements(false)
    return response;
  }, (error) => {
    //Ky thuat chan Spam Click
    interceptorLoadingElements(false)

    //Xu ly refresh Token tu dong
    //Truong hop: Ma 401 => goi API logout
    if(error.response?.status === 401) {
      //Ky thuat dispatch phai dung den ky thuan Inject store (Vi day la file .js thuan)
      axiosReduxStore.dispatch(logoutUserAPI(false));
    }

    //Truong hop: Ma 410 => goi API refresh Token tu dong
    const originalRequests = error.config
     if(error.response?.status === 410 && !originalRequests._retry) {
      originalRequests._retry = true

      if(!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenAPI()
          .then(data => {
            //accessToken da nam trong httpOnly cookie
            return data?.accessToken
          })
          .catch((_error) => {
            //Neu nhan bat ky loi nao tu api refresh token thi logout
            axiosReduxStore.dispatch(logoutUserAPI(false));
            return Promise.reject(_error)
          })
          .finally(() => {
            //Du API co loi hay thanh cong thi van luon gan lai refreshTokenPromise ve null
            refreshTokenPromise = null
          })
      }

      //Can return truong hop refreshTokenPromise chay thanh cong va xu ly
      return refreshTokenPromise.then(accessToken => {
        //Neu truong hop du an can luu tru accessToken vao localStorage hoac o dau do thi phai xu ly o day(da xu ly ben BE)

        //Return tra lai axios instance ket hop voi originalRequests de goi lai nhung API ban dau bi loi
        return authorizeAxiosInstance(originalRequests)
      })
    }

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