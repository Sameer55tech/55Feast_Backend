import config from "../../../../config";
import { RequestMethod } from "../../utils/axios";
import {
  onError,
  onSuccess,
  sendResponse,
  messageResponse,
  globalCatch,
  axiosRequest,
} from "../../utils/index.js";
import SibApiV3Sdk from "sib-api-v3-sdk";

//Done
const getAllUsers = async (request, response) => {
  try {
    const { location } = request.query;
    const users = await axiosRequest(
      RequestMethod.GET,
      `/all?location=${location}`
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

//Done
const getUser = async (request, response) => {
  try {
    const { email } = request.body;
    const foundUser = await axiosRequest(RequestMethod.GET, `?email=${email}`);
    if (foundUser.status === 404) {
      return sendResponse(onError(404, messageResponse.NOT_EXIST), response);
    }
    return sendResponse(
      onSuccess(200, messageResponse.USER_FOUND, foundUser.data.data),
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

//Done
const getJoinedUsers = async (request, response) => {
  try {
    const { location } = request.query;
    // exclude this email in user list
    const { email } = request.body;
    const users = await axiosRequest(
      RequestMethod.GET,
      `/all/joined?location=${location}&email=${email}`
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

//Done
const insertUser = async (request, response) => {
  try {
    const { email, fullName, location } = request.body;
    const user = await axiosRequest(RequestMethod.POST, "/insert", {
      fullName,
      email,
      location,
    });
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

//Done
const updateUserPool = async (request, response) => {
  try {
    const { email, fullName, location } = request.body;
    const user = await axiosRequest(RequestMethod.PATCH, "/update", {
      email,
      location,
      fullName,
    });
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

//Done
const deleteUser = async (request, response) => {
  try {
    const { email } = request.query;
    const user = await axiosRequest(
      RequestMethod.DELETE,
      `/delete?email=${email}`
    );
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

//Done
const getNotJoinedUsers = async (request, response) => {
  try {
    const { location } = request.query;
    const { email } = request.body;
    const users = await axiosRequest(
      RequestMethod.GET,
      `/all/invite?location=${location}&email=${email}`
    );
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

//Done
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
    const foundUser = await axiosRequest(RequestMethod.GET, `?email=${email}`);
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
  getUser,
  getJoinedUsers,
  insertUser,
  updateUserPool,
  deleteUser,
  getNotJoinedUsers,
  inviteUser,
};
