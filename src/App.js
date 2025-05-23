import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import ExpensePage from './components/ExpensePage';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';

function App() {
  const [user, setUser] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // 🔁 state to trigger refetch

  const handleExpenseAdded = () => {
    setRefreshTrigger(prev => prev + 1); // cause dashboard to refetch
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Expense Tracker
          </Typography>
          <Typography sx={{ ml: 2 }}>
  {user && `👋 Welcome, ${user}`}
</Typography>

          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
          <Button color="inherit" component={Link} to="/profile">Profile</Button>
        </Toolbar>
      </AppBar>
      
      <Routes>
        <Route path="/" element={<ExpensePage onExpenseAdded={handleExpenseAdded} />} />
        <Route path="/dashboard" element={<Dashboard refreshTrigger={refreshTrigger} />} />
        <Route path="/login" element={<LoginPage onLogin={setUser} />} />
<Route path="/profile" element={<ProfilePage user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
