import config from "../../../../config/config.js";
import {
  onError,
  onSuccess,
  sendResponse,
  messageResponse,
  globalCatch,
  sendMail,
  successSignUpText,
  htmlBody,
} from "../../utils";
import axios from "axios";

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
    console.log("here in inviteUser", email);
    const options = {
      method: "GET",
      url: `${config.USER_POOL_URL}?email=${email}`,
      headers: { "Content-Type": "application/json" },
      validateStatus: function (status) {
        return (status >= 200 && status < 300) || status === 404;
      },
    };
    const foundUser = await axios.request(options);
    console.log("here in inviteUser2");
    if (foundUser.status === 404) {
      return sendResponse(onError(404, messageResponse.NOT_EXIST), response);
    }
    sendMail(
      messageResponse.MAIL_SUBJECT,
      successSignUpText(foundUser.data.fullName),
      htmlBody("signUpSuccess"),
      email
    );
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
