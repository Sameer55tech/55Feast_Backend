import {
  onError,
  onSuccess,
  sendResponse,
  messageResponse,
  globalCatch,
  jwt,
} from "../../utils";
import mealModel from "../../models/meal";

const bookYourMeal = async (request, response) => {
  try {
    const { email, date } = request.body;
    const bookedMeal = await mealModel.findOne({ email });
    if (bookedMeal) {
      if (bookedMeal.bookedDates.includes(new Date(date).toISOString())) {
        return sendResponse(
          onError(409, messageResponse.MEAL_ALREADY_BOOKED),
          response
        );
      }
      bookedMeal.bookedDates.push(new Date(date).toISOString());
    }
    const newMeal = new mealModel({
      email,
      bookedDates: [new Date(date).toISOString()],
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

export default bookYourMeal;
