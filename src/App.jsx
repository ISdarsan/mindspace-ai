import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { Navbar } from './components/Layout/Navbar';
import { Dashboard } from './pages/Dashboard';
import { ResultPage } from './pages/ResultPage';
import { DecisionHelper } from './pages/DecisionHelper';
import { CalmMode } from './pages/CalmMode';
import { Insights } from './pages/Insights';
import { Reflection } from './pages/Reflection';
import { Auth } from './pages/Auth';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  // Do not render Navbar on Auth or Calm Mode pages for a cleaner immersive feel
  const hideNavbar = location.pathname === '/calm' || location.pathname === '/auth';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/decision" element={<DecisionHelper />} />
          <Route path="/calm" element={<CalmMode />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/reflection" element={<Reflection />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen relative font-sans text-slate-100">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
