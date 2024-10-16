import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VoiceNavigation from './Components/VoiceNavigation';
import Home from './Components/Home';
import About from './Components/About';

const App = () => {
  return (
    <Router>
      <div>
        <VoiceNavigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
