import {
  onError,
  onSuccess,
  sendResponse,
  messageResponse,
  globalCatch,
} from "../../utils";
import { mealModel, userModel } from "../../models";
import config from "../../../../config/config.js";
import axios from "axios";

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
        onError(404, messageResponse.MEAL_NOT_BOOKED),
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

const getCountsOfUser = async (request, response) => {
  try {
    console.log("here ====================");
    const { id } = request.query;
    const user = await userModel.findOne({ _id: id });
    if (!user) {
      return sendResponse(onError(400, messageResponse.INVALID_USER), response);
    }
    const mealFound = await mealModel.findOne({ email: user.email });
    if (!mealFound) {
      return sendResponse(onError(400, messageResponse.INVALID_USER), response);
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

const getAllCountOfDate = async (request, response) => {
  try {
    const { date } = request.body;
    const foundUsers = await mealModel.find({ bookedDates: { $in: [date] } });
    const users = foundUsers.map(async (element) => {
      const options = {
        method: "GET",
        url: `${config.USER_POOL_URL}?email=${element.email}`,
        headers: { "Content-Type": "application/json" },
      };
      const foundUser = await axios.request(options);
      return { fullName: foundUser.data.data.fullName, email: element.email };
    });
    return sendResponse(
      onSuccess(
        200,
        messageResponse.DATE_FETCHED_SUCCESS,
        await Promise.all(await users)
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

const getLastFiveCounts = async (request, response) => {
  try {
    const lastFiveDay = [];
    const currentDate = new Date();
    for (let i = 1; lastFiveDay.length < 5; i++) {
      const day = new Date(currentDate);
      day.setDate(day.getDate() - i);
      if (day.getDay() !== 6 && day.getDay() !== 0) {
        lastFiveDay.push(day.toISOString().split("T")[0]);
      }
    }
    const lastFiveDayCounts = lastFiveDay.map(async (element) => {
      return {
        count: await getCounts(element),
        date: element,
        day: getDayByDate(element),
      };
    });
    return sendResponse(
      onSuccess(
        200,
        messageResponse.COUNTS_FETCHED_SUCCESS,
        await Promise.all(lastFiveDayCounts.reverse())
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

const getDayByDate = (dateToBeUsed) => {
  const date = new Date(dateToBeUsed);
  const options = { weekday: "long" };
  const dayName = date.toLocaleDateString("en-US", options);
  return dayName;
};

const getCounts = async (date) => {
  const foundUsers = await mealModel.find({ bookedDates: { $in: [date] } });
  return foundUsers.length;
};

const cancelAllMealsOfDate = async (date) => {
  try {
    const foundUsers = await mealModel.find({ bookedDates: { $in: [date] } });
    foundUsers.map(async (element) => {
      if (element.bookedDates.includes(date)) {
        const index = element.bookedDates.indexOf(date);
        element.bookedDates.splice(index, 1);
        await element.save();
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export default {
  bookYourMeal,
  bookMultipleMeals,
  cancelMeal,
  getCountsOfUser,
  getAllCountOfDate,
  getLastFiveCounts,
  cancelAllMealsOfDate,
};
