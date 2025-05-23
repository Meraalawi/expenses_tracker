const Expense = require('../models/Expense');

// Get all expenses
exports.getExpenses = async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
};

// Add a new expense
exports.addExpense = async (req, res) => {
  const newExpense = new Expense(req.body);
  await newExpense.save();
  res.status(201).json(newExpense);
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  await Expense.findByIdAndDelete(id);
  res.json({ message: 'Expense deleted' });
};
