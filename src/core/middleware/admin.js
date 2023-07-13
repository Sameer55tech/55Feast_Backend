import config from "../../../config/config.js";
import { globalCatch, jwt, onError, sendResponse } from "../utils";

const checkAdmin = async (request, response, next) => {
  try {
    const token = request.headers["authorization"].split(" ")[1];
    const data = await jwt.jwtVerify(token, config.SECRET);
    console.log("hereeee ======================== ",token);
    console.log("hereeee ======================== ",config.SECRET);
    console.log("hereeee ======================== ",data);
    next();
  } catch (error) {
    globalCatch(request, error);
    return sendResponse(
      onError(500, messageResponse.ERROR_FETCHING_DATA),
      response
    );
  }
};

export default checkAdmin;
