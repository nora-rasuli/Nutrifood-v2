// src/components/MealPlan.js
import React from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

const MealPlan = ({ mealPlan }) => {
  if (!mealPlan) return null;

  const addToFavorites = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userFavoritesRef = collection(db, 'users', user.uid, 'favorites');
        await addDoc(userFavoritesRef, {
          calories: mealPlan.calories,
          protein: mealPlan.protein,
          fat: mealPlan.fat,
          carbohydrates: mealPlan.carbohydrates,
          breakfast: mealPlan.breakfast,
          lunch: mealPlan.lunch,
          dinner: mealPlan.dinner,
        });
        alert('Meal Plan added to favorites!');
      } else {
        alert('You need to be logged in to save favorites.');
      }
    } catch (error) {
      console.error('Error adding to favorites: ', error);
    }
  };

  return (
    <section className="mealplan">
      <h3>Your Daily Meal Plan</h3>
      <p>Calories: {mealPlan.calories}</p>
      <p>Protein: {mealPlan.protein}g</p>
      <p>Fat: {mealPlan.fat}g</p>
      <p>Carbohydrates: {mealPlan.carbohydrates}g</p>

      <div className="meal-row">
        <div className="meal">
          <h4>Breakfast</h4>
          <p>{mealPlan.breakfast.title}</p>
          <img src={mealPlan.breakfast.img} alt="Breakfast" />
          <p>Preparation time: {mealPlan.breakfast.time} mins</p>
          <a href={mealPlan.breakfast.srcUrl}>See the recipe</a>
        </div>

        <div className="meal">
          <h4>Lunch</h4>
          <p>{mealPlan.lunch.title}</p>
          <img src={mealPlan.lunch.img} alt="Lunch" />
          <p>Preparation time: {mealPlan.lunch.time} mins</p>
          <a href={mealPlan.lunch.srcUrl}>See the recipe</a>
        </div>

        <div className="meal">
          <h4>Dinner</h4>
          <p>{mealPlan.dinner.title}</p>
          <img src={mealPlan.dinner.img} alt="Dinner" />
          <p>Preparation time: {mealPlan.dinner.time} mins</p>
          <a href={mealPlan.dinner.srcUrl}>See the recipe</a>
        </div>
      </div>

      <button className="add-to-favorites-btn" onClick={addToFavorites}>Add to Favourites</button>
    </section>
  );
};

export default MealPlan;