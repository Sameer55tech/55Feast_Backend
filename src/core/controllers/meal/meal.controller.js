import {
  onError,
  onSuccess,
  sendResponse,
  messageResponse,
  globalCatch,
  jwt,
} from "../../utils";
import { mealModel, userModel } from "../../models";

const bookYourMeal = async (request, response) => {
  try {
    const { email, date } = request.body;
    const bookedMeal = await mealModel.findOne({ email });
    if (bookedMeal) {
      if (bookedMeal.bookedDates.includes(date)) {
        return sendResponse(
          onError(409, messageResponse.MEAL_ALREADY_BOOKED),
          response
        );
      }
      bookedMeal.bookedDates.push(date);
      await bookedMeal.save();
      return sendResponse(
        onSuccess(201, messageResponse.MEAL_BOOKED, bookedMeal),
        response
      );
    }
    const newMeal = new mealModel({
      email,
      bookedDates: [date],
    });
    await newMeal.save();
    return sendResponse(
      onSuccess(201, messageResponse.MEAL_BOOKED, newMeal),
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

const bookMultipleMeals = async (request, response) => {
  try {
    const { email, bookedDates } = request.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return sendResponse(onError(404, messageResponse.NOT_EXIST), response);
    }
    if (!bookedDates.length) {
      return sendResponse(
        onError(400, messageResponse.BOOK_ATLEAST_ONE),
        response
      );
    }
    const userFromMeals = await mealModel.findOne({ email });
    if (!userFromMeals) {
      const newUser = new mealModel({ email, bookedDates });
      await newUser.save();
      return sendResponse(
        onSuccess(201, messageResponse.MEAL_BOOKED, newUser),
        response
      );
    }
    bookedDates.map(async (element) => {
      if (!userFromMeals.bookedDates.includes(element)) {
        userFromMeals.bookedDates.push(element);
      }
    });
    await userFromMeals.save();
    return sendResponse(
      onSuccess(201, messageResponse.MEAL_BOOKED, userFromMeals),
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

const cancelMeal = async (request, response) => {
  try {
    const { userId, date } = request.body;
    const user = await userModel.findOne({ _id: userId });
    if (!user) {
      return sendResponse(onError(400, messageResponse.INVALID_USER), response);
    }
    const mealFound = await mealModel.findOne({ email: user.email });
    if (!mealFound) {
      return sendResponse(
        onError(400, messageResponse.MEAL_NOT_BOOKED),
        response
      );
    }
    if (mealFound.bookedDates.includes(date)) {
      const index = mealFound.bookedDates.indexOf(date);
      mealFound.bookedDates.splice(index, 1);
      await mealFound.save();
      return sendResponse(
        onSuccess(200, messageResponse.COUNT_CANCELLED, mealFound),
        response
      );
    }
    return sendResponse(
      onError(404, messageResponse.MEAL_NOT_BOOKED, mealFound),
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

const getCounts = async (request, response) => {
  try {
    const { id } = request.params;
    const user = await userModel.findOne({ _id: id });
    if (!user) {
      return sendResponse(onError(400, messageResponse.INVALID_USER), response);
    }
    const mealFound = await mealModel.findOne({ email: user.email });
    if (!mealFound) {
      return sendResponse(
        onError(400, messageResponse.INVALID_USER),
        response
      );
    }
    return sendResponse(
      onSuccess(
        200,
        messageResponse.DATE_FETCHED_SUCCESS,
        mealFound.bookedDates
      ),
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

export default { bookYourMeal, bookMultipleMeals, cancelMeal, getCounts };
