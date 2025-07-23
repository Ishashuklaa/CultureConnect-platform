import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Stories from './pages/Stories';
import Marketplace from './pages/Marketplace';
import Languages from './pages/Languages';
import Dashboard from './pages/Dashboard';
import SellerDashboard from './pages/SellerDashboard';
import CulturalExplorer from './pages/CulturalExplorer';
import Explore from './pages/Explore';
import Itinerary from './pages/Itinerary';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/languages" element={<Languages />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/explore/:category" element={<CulturalExplorer />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/seller-dashboard" element={
              <ProtectedRoute requireSeller>
                <SellerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/itinerary" element={
              <ProtectedRoute>
                <Itinerary />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;