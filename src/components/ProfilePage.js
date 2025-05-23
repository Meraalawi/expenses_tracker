import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Button,
} from '@mui/material';

function ProfilePage({ user }) {
  const [profile, setProfile] = useState({
    username: user || '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      setProfile((prev) => ({ ...prev, username: user }));
    }
  }, [user]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log('Profile updated:', profile);
    alert('Profile updated!');
  };

  // Redirect to login if not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={4} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" align="center" gutterBottom>
          👤 Profile Page
        </Typography>
        <TextField
          label="Username"
          name="username"
          fullWidth
          margin="normal"
          value={profile.username}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          value={profile.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={profile.password}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </Paper>
    </Box>
  );
}

export default ProfilePage;
