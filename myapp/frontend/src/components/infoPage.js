import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
} from '@mui/material'; // Assuming you are using Material-UI components

const InfoPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  // Extracting query parameters
  const name = queryParams.get('name');
  const gender = queryParams.get('gender');
  const phone = queryParams.get('phone');
  const email = queryParams.get('email');
  const firstTime = queryParams.get('firstTime');
  const photo = `${process.env.REACT_APP_API_URL}/api/registrations/${queryParams.get('id')}/photo`;

  return (
    <Container maxWidth="md" style={{ backgroundColor: '#00843D', minHeight: '100vh', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" component="h1" color="white" style={{ marginTop: '1rem' }}>
          ARAMCO SIM-RACING ARENA
        </Typography>
      </Box>

      <Box style={{ borderRadius: 'none', backgroundColor: 'white', padding: '50px', maxWidth: '600px', width: '100%' }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" component="h1" color="black" style={{ marginTop: '1rem', fontSize: '30px', textAlign: 'left' }}>
            USER INFORMATION
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            <strong>Name:</strong> {name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Gender:</strong> {gender === 'male' ? 'Male' : 'Female'}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Email:</strong> {email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Phone:</strong> {phone}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>First Time:</strong> {firstTime === 'yes' ? 'Yes' : 'No'}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Photo:</strong> <img src={photo} alt="User" style={{ maxWidth: '100%', height: 'auto' }} />
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default InfoPage;
