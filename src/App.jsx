// src/App.jsx
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import QuoteList from './components/QuoteList';
import CreateQuote from './components/CreateQuote';
import { getToken } from './utils/auth';

const PrivateRoute = ({ children }) => (getToken() ? children : <Navigate to="/" />);

// Define PropTypes for PrivateRoute
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/quotes" element={<PrivateRoute><QuoteList /></PrivateRoute>} />
        <Route path="/create-quote" element={<PrivateRoute><CreateQuote /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
