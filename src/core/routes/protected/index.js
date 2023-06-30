import bookMeal from "./meal.js";
import user from "./user.js";

export default function (app) {
  app.use("/bookmeal", bookMeal);
  app.use("/user", user);
  return app;
}
