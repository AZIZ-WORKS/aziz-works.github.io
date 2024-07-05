import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Homepage';
import FormPage from './components/FormPage';
import ThankYouPage from './components/ThankYouPage';
import AdminDashboard from './Admin/AdminDashboard';
import InfoPage from './components/infoPage';
import Home from './Admin/Home';
import Layout from './Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register/:raceType" element={<FormPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/admin" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
