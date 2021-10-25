import axios from "axios";
import { toast } from "react-toastify";
import loggingService from "./logService";

/* handle unexpected errors globally */
axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    loggingService.log(error);
    toast.error("An unexpected error occured");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
