import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export function AgentDetails() {
  const location = useLocation(); 
  console.log(location); 

  const agent = location.state; 
  
  if (!agent) {
    return <div>No agent data available</div>; 
  }

  const [agentData, setAgentData] = useState(agent);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAgentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log('Agent data saved:', agentData);
  };

  const handleDelete = () => {
    console.log('Agent deleted:', agentData.agentId);
  };

  return (
    <div>
      <Typography style={{ marginBottom: "15px", fontWeight: 'bold', fontSize: '25px' }}>
        Agent Details #{agentData.agentId}
      </Typography>

      <TextField
        label="Name"
        name="agentName"
        value={agentData.agentName}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={agentData.email}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Contact Number"
        name="contactNumber"
        value={agentData.contactNumber}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Address"
        name="address"
        value={agentData.address}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />

        <Box display="flex" justifyContent="center" marginTop="20px">
            <Button variant="contained" color="primary" onClick={handleSave}>
            Save
            </Button>
            <Button
            variant="contained" 
            style={{
                backgroundColor: 'red', 
                color: 'white', 
                marginLeft: '10px',
            }}
            onClick={handleDelete}
            >
            Delete
            </Button>
        </Box>
    </div>
  );
}

export default AgentDetails;
