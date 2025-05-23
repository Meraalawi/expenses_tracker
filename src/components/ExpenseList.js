import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  Paper,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return <Typography variant="body1">No expenses yet.</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
      <Typography variant="h6" gutterBottom>Expense List</Typography>
      <List>
        {expenses.map((exp) => (
          <ListItem key={exp._id} divider>
            <ListItemText
              primary={`${exp.title} - $${exp.amount.toFixed(2)}`}
              secondary={`Category: ${exp.category} • ${new Date(exp.date).toLocaleDateString()}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => onDelete(exp._id)}>
                <DeleteIcon color="error" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default ExpenseList;
