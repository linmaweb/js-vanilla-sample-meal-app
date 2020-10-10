import {
  search,
  mealsEl,
  resultHeading,
  single_mealEl,
  mealAPI,
} from "./variables";

const searchMeal = (e) => {
  e.preventDefault();
  single_mealEl.innerHTML = "";
  const term = search.value;
  if (term.trim()) {
    fetch(`${mealAPI}/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There are no search results. Try again!<p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => 
              `<div class="meal">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                <div class="meal-info" data-mealID="${meal.idMeal}">
                  <h3>${meal.strMeal}</h3>
                </div>
              </div>`
            ).join("");
        }
      })
      .catch(error => console.log(error) );
    search.value = "";
  } else {
    alert("Please enter a search term");
  }
};

const getMealById = (mealID) => {
  fetch(`${mealAPI}/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    })
    .catch(error => console.log(error) );
};

const getRandomMeal = () => {
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";
  fetch(`${mealAPI}/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    })
    .catch(error => console.log(error) );
};

const addMealToDOM = (meal) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  single_mealEl.innerHTML = `
    <div class="single-meal">
      <h2>${meal.strMeal}</h2>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
      </div>
      <div class="main">
        <p>${meal.strInstructions.replace(/(\r\n|\r|\n)/g, "<br>")}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;
};

export { searchMeal, getMealById, getRandomMeal }