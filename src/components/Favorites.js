// src/components/Favorites.js
import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const user = auth.currentUser;
      if (user) {
        const querySnapshot = await getDocs(collection(db, 'users', user.uid, 'favorites'));
        const favData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFavorites(favData);
      }
    };

    fetchFavorites();
  }, []);

  const handleDelete = async (id) => {
    const user = auth.currentUser;
    if (user) {
      await deleteDoc(doc(db, 'users', user.uid, 'favorites', id));
      setFavorites(favorites.filter(fav => fav.id !== id));
    }
  };

  return (
    <div className="favorites">
      <h2>Your Favorite Meal Plans</h2>
      {favorites.length > 0 ? (
        <div className="mealplan-list">
          {favorites.map(fav => (
            <div key={fav.id} className="mealplan">
              <h3>Calories: {fav.calories}</h3>
              <p>Protein: {fav.protein}g</p>
              <p>Fat: {fav.fat}g</p>
              <p>Carbohydrates: {fav.carbohydrates}g</p>

              <div className="meal-row">
                <div className="meal">
                  <h4>Breakfast</h4>
                  <p>{fav.breakfast.title}</p>
                  <img src={fav.breakfast.img} alt={fav.breakfast.title} />
                  <p>Preparation time: {fav.breakfast.time} mins</p>
                  <a href={fav.breakfast.srcUrl}>See the recipe</a>
                </div>

                <div className="meal">
                  <h4>Lunch</h4>
                  <p>{fav.lunch.title}</p>
                  <img src={fav.lunch.img} alt={fav.lunch.title} />
                  <p>Preparation time: {fav.lunch.time} mins</p>
                  <a href={fav.lunch.srcUrl}>See the recipe</a>
                </div>

                <div className="meal">
                  <h4>Dinner</h4>
                  <p>{fav.dinner.title}</p>
                  <img src={fav.dinner.img} alt={fav.dinner.title} />
                  <p>Preparation time: {fav.dinner.time} mins</p>
                  <a href={fav.dinner.srcUrl}>See the recipe</a>
                </div>
              </div>

              <button className="remove-favorites-btn" onClick={() => handleDelete(fav.id)}>Remove from Favourites</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No favorites added yet.</p>
      )}
    </div>
  );
};

export default Favorites;