import config from "../../../config";
import { jwt, messageResponse, onError, sendResponse } from "../utils";

const middleware = (app) => {
  app.use(async (request, response, next) => {
    const token = request.headers["authorization"].split(" ")[1];
    if (!token) {
      return sendResponse(onError(403, messageResponse.TOKEN_ERROR), response);
    } else {
      const verified = jwt.jwtVerify(token, config.SECRET);
      if (verified){
        next();
      }
    }
  });
  return app;
};

export default middleware;
