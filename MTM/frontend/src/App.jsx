import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';

const RouteLogger = () => {
  const location = useLocation();
  useEffect(() => {
    console.log(`[Frontend Navigation] Page changed to: ${location.pathname}${location.search}`);
  }, [location]);
  return null;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <RouteLogger />
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
          <Navbar />
          <main className="container mx-auto py-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Dashboard />} />
              </Route>
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
