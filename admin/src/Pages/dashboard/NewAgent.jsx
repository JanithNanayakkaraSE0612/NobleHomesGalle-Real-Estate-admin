import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

function NewAgent() {
  const handleSave = () => {
    console.log("Save button clicked");
  };

  const handleDelete = () => {
    console.log("Delete button clicked");
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h5" style={{ marginBottom: '20px' }}>
        New Agent
      </Typography>
      
      <TextField
        label="Name"
        name="agentName"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Contact Number"
        name="contactNumber"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Address"
        name="address"
        fullWidth
        margin="normal"
      />

      <Box display="flex" justifyContent="center" marginTop="20px">
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
        
      </Box>
    </div>
  );
}

export default NewAgent;
