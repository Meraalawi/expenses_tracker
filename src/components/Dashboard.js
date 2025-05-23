// Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Paper, List, ListItem, ListItemText, Box } from '@mui/material';

function Dashboard({ refreshTrigger }) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/expenses')
      .then(res => setExpenses(res.data))
      .catch(err => console.error(err));
  }, [refreshTrigger]); // 🔁 refetch when refreshTrigger changes

  const total = expenses.reduce((acc, e) => acc + e.amount, 0);
  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6">Total Expenses: ${total.toFixed(2)}</Typography>
      </Paper>

      <Typography variant="h6">Expenses by Category</Typography>
      <Paper sx={{ p: 2 }}>
        <List>
          {Object.entries(categoryTotals).map(([cat, amt]) => (
            <ListItem key={cat}>
              <ListItemText primary={`${cat}: $${amt.toFixed(2)}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default Dashboard;
