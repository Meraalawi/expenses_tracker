import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';

function ExpensePage({ onExpenseAdded }) {
  const [expenses, setExpenses] = useState([]);

  // Fetch all expenses on mount
  const fetchExpenses = () => {
    axios.get('http://localhost:5001/api/expenses')
      .then(res => setExpenses(res.data))
      .catch(err => console.error('Error fetching expenses:', err));
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Add expense
  const handleAdd = async (newExpense) => {
    try {
      const res = await axios.post('http://localhost:5001/api/expenses', newExpense);
      setExpenses(prev => [...prev, res.data]);

      if (onExpenseAdded) onExpenseAdded(); // Notify dashboard
    } catch (err) {
      console.error('Error adding expense:', err);
    }
  };

  // Delete expense
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/expenses/${id}`);
      setExpenses(prev => prev.filter(exp => exp._id !== id));
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>💸 Personal Expense Tracker</Typography>
      <ExpenseForm onAdd={handleAdd} />
      <ExpenseList expenses={expenses} onDelete={handleDelete} />
    </Container>
  );
}

export default ExpensePage;
