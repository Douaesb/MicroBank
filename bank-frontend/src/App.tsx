import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ClientManagement from './pages/ClientManagement';
import AccountManagement from './pages/AccountManagement';
import AccountDetails from './pages/AccountDetails';
import ClientDetails from './pages/ClientDetails';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clients" element={<ClientManagement />} />
          <Route path="/client-details" element={<ClientDetails />} /> 
          <Route path="/accounts" element={<AccountManagement />} />
          <Route path="/account-details" element={<AccountDetails />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;