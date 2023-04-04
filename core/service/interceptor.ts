import axios from "axios";

const Interceptor = () => {
  axios.interceptors.request.use(
    (req) => {
      if (localStorage.getItem("authData")) {
        const token = JSON.parse(localStorage.getItem("authData") as string);
        req.headers.Authorization = `Bearer ${token?.access_token}`;
      }
      return req;
    },
    (err) => Promise.reject(err)
  );
  return null;
};
export default Interceptor;
