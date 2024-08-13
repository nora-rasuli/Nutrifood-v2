import React, { useState } from 'react';
import axios from 'axios';

const BMRCalculator = ({ onMealPlanGenerated }) => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [activity, setActivity] = useState('');
  const [goal, setGoal] = useState('');
  const [bmr, setBmr] = useState(null);

  const calculateBMR = (e) => {
    e.preventDefault();
    const genderFactor = gender === 'Male' ? 5 : -161;
    const bmrCalc = (10 * weight) + (6.25 * height) - (5 * age) + genderFactor;
    const finalBmr = bmrCalc * activity * goal;
    setBmr(finalBmr);

    fetchMealPlan(finalBmr);
  };

  const fetchMealPlan = async (calories) => {
    try {
      const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY; // Accessing the API key from .env
      const response = await axios.get(
        `https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&timeFrame=day&targetCalories=${calories}`
      );

      const data = response.data;

      const generatedMealPlan = {
        calories: data.nutrients.calories,
        protein: data.nutrients.protein,
        fat: data.nutrients.fat,
        carbohydrates: data.nutrients.carbohydrates,
        breakfast: {
          title: data.meals[0].title,
          img: `https://spoonacular.com/recipeImages/${data.meals[0].id}-312x231.jpg`,
          time: data.meals[0].readyInMinutes,
          srcUrl: data.meals[0].sourceUrl,
        },
        lunch: {
          title: data.meals[1].title,
          img: `https://spoonacular.com/recipeImages/${data.meals[1].id}-312x231.jpg`,
          time: data.meals[1].readyInMinutes,
          srcUrl: data.meals[1].sourceUrl,
        },
        dinner: {
          title: data.meals[2].title,
          img: `https://spoonacular.com/recipeImages/${data.meals[2].id}-312x231.jpg`,
          time: data.meals[2].readyInMinutes,
          srcUrl: data.meals[2].sourceUrl,
        },
      };

      onMealPlanGenerated(generatedMealPlan);
    } catch (error) {
      console.error('Error fetching meal plan:', error);
    }
  };

  const clearForm = () => {
    setHeight('');
    setWeight('');
    setAge('');
    setGender('');
    setActivity('');
    setGoal('');
    setBmr(null);
  };

  return (
    <div className="bmr-calculator-container">
      <form onSubmit={calculateBMR} className="bmr-form"> 
         <legend>Calculate how many calories you need a day.</legend>

        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <select value={gender} onChange={(e) => setGender(e.target.value)} required>
          <option value="" disabled>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select value={activity} onChange={(e) => setActivity(e.target.value)} required>
          <option value="" disabled>Select Activity Level</option>
          <option value="1.2">Sedentary</option>
          <option value="1.375">Lightly active</option>
          <option value="1.55">Moderately active</option>
          <option value="1.725">Very active</option>
          <option value="1.9">Extra active</option>
        </select>
        <select value={goal} onChange={(e) => setGoal(e.target.value)} required>
          <option value="" disabled>Select Weight Goal</option>
          <option value="0.95">Lose Weight</option>
          <option value="1">Maintain Weight</option>
          <option value="1.05">Gain Weight</option>
        </select>
        <div className="bmr-buttons">
          <button type="submit" className="calculate-btn">Calculate</button>
          <button type="button" onClick={clearForm} className="clear-btn">Clear</button>
        </div>
      </form>
      {bmr && <h4>Your BMR is {bmr.toFixed(2)} calories/day.</h4>}
    </div>
  );
};

export default BMRCalculator;