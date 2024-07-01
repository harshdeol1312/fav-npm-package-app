import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import FavPage from './components/FavPage';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <NavBar />
        <Routes>
          <Route path="/favorites" element={<FavPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
