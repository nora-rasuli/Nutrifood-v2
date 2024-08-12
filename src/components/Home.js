import React, { useState } from 'react';
import BMRCalculator from './BMRCalculator';
import MealPlan from './MealPlan';

const Home = () => {
  const [mealPlan, setMealPlan] = useState(null);

  const handleMealPlanGenerated = (generatedMealPlan) => {
    setMealPlan(generatedMealPlan);
  };

  return (
    <div>
      <h1>Welcome to NutriFood</h1>
      <BMRCalculator onMealPlanGenerated={handleMealPlanGenerated} />
      <MealPlan mealPlan={mealPlan} />
    </div>
  );
};

export default Home;