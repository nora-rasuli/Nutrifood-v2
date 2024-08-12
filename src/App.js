import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home'; // Placeholder, create later
//import Favorites from './components/Favorites'; // Placeholder, create later
//import Login from './components/Auth/Login'; // Placeholder, create later
//import Signup from './components/Auth/Signup'; // Placeholder, create later

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/favorites" element={<Favorites />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}
      </Routes>
    </Router>
  );
};

export default App;