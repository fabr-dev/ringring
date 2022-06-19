import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Chat from './pages/chat';

import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}
