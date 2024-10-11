import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./user/member/LoginPage.tsx";
import HomePage from "./home/HomePage";
import SignupPage from "./user/member/SignupPage";

const App = () => {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-up" element={<LoginPage />} />
        </Routes>
      </Router>
  );
};

export default App;
