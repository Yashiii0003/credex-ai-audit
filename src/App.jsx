import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ReportPage from './pages/ReportPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* The ReportPage route is kept for completeness, but we are focused on HomePage */}
        <Route path="/report/:id" element={<ReportPage />} />
      </Routes>
    </Router>
  );
}

export default App;
