import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem } from '@mui/material';

const categories = ['Food', 'Clothes', 'Electric', 'Transport', 'Other'];

function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: '',
    date: new Date().toISOString().substring(0, 10),
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.amount || !form.category) return;

    const newExpense = {
      title: form.title,
      amount: parseFloat(form.amount),
      category: form.category,
      date: form.date,
    };

    onAdd(newExpense);

    setForm({
      title: '',
      amount: '',
      category: '',
      date: new Date().toISOString().substring(0, 10),
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Amount"
        name="amount"
        type="number"
        value={form.amount}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        inputProps={{ min: "0.01", step: "0.01" }}
      />
      <TextField
        label="Category"
        name="category"
        select
        value={form.category}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      >
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>{cat}</MenuItem>
        ))}
      </TextField>
      <TextField
        label="Date"
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        InputLabelProps={{ shrink: true }}
      />
      <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
        Add Expense
      </Button>
    </Box>
  );
}

export default ExpenseForm;
