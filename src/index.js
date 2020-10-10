import { submit, random, mealsEl } from "./variables";
import { searchMeal, getMealById, getRandomMeal } from './view'

submit.addEventListener("submit", searchMeal);
random.addEventListener("click", getRandomMeal);

mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid");
    getMealById(mealID);

    setTimeout(() => {
      document.getElementById("single-meal").scrollIntoView();
    }, 1000);
  }
});
