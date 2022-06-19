import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import './App.css';

const Hello = () => {
  return (
    <div>
      <div className="Video">
        <Box
          sx={{
            width: 900,
            height: 500,
            backgroundColor: 'black'
          }}
        />
      </div>
      <div className="Hello">
        <button type="button" style={{backgroundColor: "green"}}>
          <span role="img" aria-label="books">
            📞
          </span>
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
