const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// GET all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new expense
router.post('/', async (req, res) => {
  const { title, amount, category, date } = req.body;

  if (!title || !amount || !category) {
    return res.status(400).json({ message: 'Title, amount, and category are required.' });
  }
  if (amount <= 0) {
    return res.status(400).json({ message: 'Amount must be greater than zero.' });
  }
  
  const expenseDate = date ? new Date(date) : new Date();
  if (isNaN(expenseDate.getTime())) {
    return res.status(400).json({ message: 'Invalid date format.' });
  }

  const expense = new Expense({
    title,
    amount,
    category,
    date: expenseDate,
  });

  try {
    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE expense by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Expense not found.' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
