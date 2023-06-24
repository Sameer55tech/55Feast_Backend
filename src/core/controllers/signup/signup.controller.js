import userModel from "../../models/user";
import bcrypt from "bcryptjs";
import {
  onError,
  onSuccess,
  sendResponse,
  messageResponse,
  globalCatch,
} from "../../utils";

const signupController = async (request, response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      gender,
      phone,
      location,
      photo,
    } = request.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return sendResponse(onError(409, messageResponse.EMAIL_EXIST), response);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      firstName,
      lastName,
      gender,
      email,
      password: hashedPassword,
      location,
      phone,
      photo,
    });
    await newUser.save();
    return sendResponse(
      onSuccess(201, messageResponse.CREATED_SUCCESS, newUser),
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

export default signupController;
