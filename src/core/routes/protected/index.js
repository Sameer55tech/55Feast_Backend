import bookMeal from './meal.js';

export default function (app) {
  app.use("/bookmeal", bookMeal);
  return app;
}
