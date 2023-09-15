import config from "../../../../config";
import {
  onError,
  onSuccess,
  sendResponse,
  messageResponse,
  globalCatch,
} from "../../utils/index.js";
import axios from "axios";
import SibApiV3Sdk from "sib-api-v3-sdk";

const getAllUsers = async (request, response) => {
  try {
    const { location } = request.query;
    const users = await axios.get(
      `${config.USER_POOL_URL}/all?location=${location}`
    );
    return sendResponse(
      onSuccess(200, messageResponse.USERS_FOUND_SUCCESS, users.data.data),
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

const getUser = async (request, response) => {
  try {
    const { email } = request.body;
    const options = {
      method: "GET",
      url: `${config.USER_POOL_URL}?email=${email}`,
      headers: { "Content-Type": "application/json" },
      validateStatus: function (status) {
        return (status >= 200 && status < 300) || status === 404;
      },
    };
    const foundUser = await axios.request(options);
    if (foundUser.status === 404) {
      return sendResponse(onError(404, messageResponse.NOT_EXIST), response);
    }
    return sendResponse(
      onSuccess(200, messageResponse.USER_FOUND, foundUser.data),
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

const getJoinedUsers = async (request, response) => {
  try {
    const { location } = request.query;
    // exclude this email in user list
    const { email } = request.body;
    const options = {
      method: "GET",
      url: `${config.USER_POOL_URL}/all/joined?location=${location}&email=${email}`,
      headers: { "Content-Type": "application/json" },
    };
    const users = await axios.request(options);
    return sendResponse(
      onSuccess(200, messageResponse.USERS_FOUND_SUCCESS, users.data.data),
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

const insertUser = async (request, response) => {
  try {
    const { email, fullName, location } = request.body;
    const options = {
      method: "POST",
      url: `${config.USER_POOL_URL}/insert`,
      headers: { "Content-Type": "application/json" },
      data: {
        fullName,
        email,
        location,
      },
      validateStatus: function (status) {
        return (status >= 200 && status < 300) || status === 409;
      },
    };
    const user = await axios.request(options);
    if (user.status === 409) {
      return sendResponse(onError(409, messageResponse.EMAIL_EXIST), response);
    }
    return sendResponse(
      onSuccess(201, messageResponse.CREATED_SUCCESS, user.data.data),
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

const updateUserPool = async (request, response) => {
  try {
    const { email, fullName, location } = request.body;
    const options = {
      method: "PATCH",
      url: `${config.USER_POOL_URL}/update`,
      headers: { "Content-Type": "application/json" },
      data: { email, location, fullName },
      validateStatus: function (status) {
        return (status >= 200 && status < 300) || status === 404;
      },
    };
    const user = await axios.request(options);
    if (user.status === 404) {
      return sendResponse(onError(404, messageResponse.NOT_EXIST), response);
    }
    return sendResponse(
      onSuccess(200, messageResponse.USER_UPDATED_SUCCESS, user.data.data),
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

const deleteUser = async (request, response) => {
  try {
    const { email } = request.query;
    const options = {
      method: "DELETE",
      url: `${config.USER_POOL_URL}/delete?email=${email}`,
      headers: { "Content-Type": "application/json" },
      validateStatus: function (status) {
        return (status >= 200 && status < 300) || status === 404;
      },
    };
    const user = await axios.request(options);
    if (user.status === 404) {
      return sendResponse(onError(404, messageResponse.NOT_EXIST), response);
    }
    return sendResponse(
      onSuccess(200, messageResponse.USER_DELETED_SUCCESS),
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

const getNotJoinedUsers = async (request, response) => {
  try {
    const { location } = request.query;
    const { email } = request.body;
    const options = {
      method: "GET",
      url: `${config.USER_POOL_URL}/all/invite?location=${location}&email=${email}`,
      headers: { "Content-Type": "application/json" },
    };
    const users = await axios.request(options);
    return sendResponse(
      onSuccess(200, messageResponse.USER_FOUND, users.data.data),
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

const inviteUser = async (request, response) => {
  try {
    const { email } = request.body;
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = config.EMAIL_API_KEY;
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.sender = {
      email: config.SENDER_EMAIL,
      name: "55Feast",
    };
    sendSmtpEmail.subject = "Invitation to onboard 55Feast";
    sendSmtpEmail.replyTo = {
      email: config.SENDER_EMAIL,
      name: "55Feast",
    };
    const options = {
      method: "GET",
      url: `${config.USER_POOL_URL}?email=${email}`,
      headers: { "Content-Type": "application/json" },
      validateStatus: function (status) {
        return (status >= 200 && status < 300) || status === 404;
      },
    };
    const foundUser = await axios.request(options);
    if (foundUser.status === 404) {
      return sendResponse(onError(404, messageResponse.NOT_EXIST), response);
    }
    sendSmtpEmail.to = [{ name: foundUser.data.data.fullName, email: email }];
    sendSmtpEmail.templateId = 3;
    const res = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return sendResponse(
      onSuccess(200, messageResponse.INVITED_SUCCESS),
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

export default {
  getAllUsers,
  getUserByLocation,
  getUser,
  getJoinedUsers,
  insertUser,
  updateUserPool,
  deleteUser,
  getNotJoinedUsers,
  inviteUser,
};
