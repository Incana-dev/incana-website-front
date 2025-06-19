import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CreateArticlePage from './pages/CreateArticlePage';
import DisplayArticlePage from './pages/DisplayArticlePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin/create" element={<CreateArticlePage />} />
        <Route path="/articles/:id" element={<DisplayArticlePage />} />
      </Routes>
    </Router>
  );
}

export default App;
