import config from "../../../../config/config.js";
import {
  onError,
  onSuccess,
  sendResponse,
  messageResponse,
  globalCatch,
} from "../../utils";
import axios from "axios";

const getAllUsers = async (request, response) => {
  try {
    const users = await axios.get(config.USER_POOL_URL + "/all");
    return sendResponse(
      onSuccess(200, messageResponse.USERS_FOUND_SUCCESS, users.data),
      response
    );
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(
      onError(500, messageResponse.ERROR_FETCHING_DATA),
      response
    );
  }
};

const getUserByLocation = async (request, response) => {
  try {
    const { location } = request.query;
    const users = await axios.get(
      config.USER_POOL_URL + `/location/all?location=${location}`
    );
    return sendResponse(
      onSuccess(200, messageResponse.USERS_FOUND_SUCCESS, users.data),
      response
    );
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(
      onError(500, messageResponse.ERROR_FETCHING_DATA),
      response
    );
  }
};

export default { getAllUsers, getUserByLocation };
