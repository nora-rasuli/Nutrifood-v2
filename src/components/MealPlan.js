import React from 'react';

const MealPlan = ({ mealPlan }) => {
  if (!mealPlan) return null;

  return (
    <section>
      <h3>Your Daily Meal Plan</h3>
      <p>Calories: {mealPlan.calories}</p>
      <p>Protein: {mealPlan.protein}g</p>
      <p>Fat: {mealPlan.fat}g</p>
      <p>Carbohydrates: {mealPlan.carbohydrates}g</p>

      <div>
        <h4>Breakfast</h4>
        <p>{mealPlan.breakfast.title}</p>
        <img src={mealPlan.breakfast.img} alt="Breakfast" width="250" />
        <p>Preparation time: {mealPlan.breakfast.time} mins</p>
        <a href={mealPlan.breakfast.srcUrl}>See the recipe</a>
      </div>

      <div>
        <h4>Lunch</h4>
        <p>{mealPlan.lunch.title}</p>
        <img src={mealPlan.lunch.img} alt="Lunch" width="250" />
        <p>Preparation time: {mealPlan.lunch.time} mins</p>
        <a href={mealPlan.lunch.srcUrl}>See the recipe</a>
      </div>

      <div>
        <h4>Dinner</h4>
        <p>{mealPlan.dinner.title}</p>
        <img src={mealPlan.dinner.img} alt="Dinner" width="250" />
        <p>Preparation time: {mealPlan.dinner.time} mins</p>
        <a href={mealPlan.dinner.srcUrl}>See the recipe</a>
      </div>
    </section>
  );
};

export default MealPlan;