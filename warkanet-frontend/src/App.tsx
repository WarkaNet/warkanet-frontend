import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import IssueReward from './pages/IssueReward';
import AcceptRedemption from './pages/AcceptRedemption';
import Analytics from './pages/Analytics';
import Equity from './pages/Equity';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/merchant/dashboard" replace />} />
        <Route path="/merchant" element={<Layout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="issue" element={<IssueReward />} />
          <Route path="accept-redemption" element={<AcceptRedemption />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="equity" element={<Equity />} />
        </Route>
        <Route path="*" element={<Navigate to="/merchant/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
