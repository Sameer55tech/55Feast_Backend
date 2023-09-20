import axios from "axios";
import config from "../../../config";

export const RequestMethod = {
  PUT: "PUT",
  POST: "POST",
  GET: "GET",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

const axiosRequest = async (method, url, data) => {
  try {
    switch (method) {
      case RequestMethod.GET:
      case RequestMethod.DELETE:
        const options1 = {
          method: method,
          url: `${config.USER_POOL_URL}${url}`,
          headers: {
            "Content-Type": "application/json",
          },
          validateStatus: function (status) {
            return status >= 200 && status <= 500;
          },
        };
        const result1 = await axios.request(options1);
        return result1;
        break;
      case RequestMethod.PATCH:
      case RequestMethod.POST:
        const options2 = {
          method: method,
          url: `${config.USER_POOL_URL}${url}`,
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
          validateStatus: function (status) {
            return status >= 200 && status <= 500;
          },
        };
        const result2 = await axios.request(options2);
        return result2;
        break;
      default:
        break;
    }
  } catch (error) {
    console.log("error: ", error.message);
  }
};

export default axiosRequest;
