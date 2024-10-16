import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

export function Agent() {
  const navigate = useNavigate();

  function createData(agentId, agentName, email, contactNumber, address) {
    return { agentId, agentName, email, contactNumber, address };
  }

  const rows = [
    createData('A001', 'John Doe', 'john@example.com', '123-456-7890', '123 Main St, City, Country'),
    createData('A002', 'Jane Smith', 'jane@example.com', '987-654-3210', '456 Oak Ave, City, Country'),
    createData('A003', 'Michael Johnson', 'michael@example.com', '555-555-5555', '789 Pine Rd, City, Country'),
    createData('A004', 'Emily Brown', 'emily@example.com', '111-222-3333', '101 Maple St, City, Country'),
    createData('A005', 'David White', 'david@example.com', '666-777-8888', '202 Birch Ln, City, Country'),
  ];

  const handleDetailsClick = (row) => {
    console.log('Navigating to agent details:', row); 
    navigate('/dashboard/agentDetails', { state: row });
  };

  const handleNewAgentClick = () => {
    navigate('/dashboard/newAgent'); 
  };
  

  return (
    <div className="mt-6">
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="15px">
        <Typography style={{ fontWeight: 'bold', fontSize: '25px' }}>Agent Details</Typography>
        <Button variant="contained" color="primary" onClick={handleNewAgentClick}>
          New Agent
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Agent ID</TableCell>
              <TableCell align="right">Agent Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Contact Number</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.agentId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.agentId}
                </TableCell>
                <TableCell align="right">{row.agentName}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.contactNumber}</TableCell>
                <TableCell align="right">{row.address}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="primary" onClick={() => handleDetailsClick(row)}>
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Agent;
