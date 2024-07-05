import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from 'qrcode.react'; // Import QRCode component from qrcode.react
import axios from 'axios';
import {
  Container,
  Box,
  Typography,
} from '@mui/material'; 
import './T.css'

const ThankYouPage = () => {
  const location = useLocation();
  const { _id, name, gender, phone, email, firstTime, photo } = location.state;
  const [queue, setQueue] = useState([]);

  // Function to generate the dynamic URL with query parameters
  const generateDynamicURL = () => {
    const queryParams = new URLSearchParams({
      id: _id,
      name,
      gender,
      phone,
      email,
      firstTime,
      photo,
    });
    return `${window.location.origin}/info?${queryParams.toString()}`;
  };

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/queue');
        setQueue(response.data);
      } catch (error) {
        console.error('Error fetching queue', error);
      }
    };

    fetchQueue();
  }, []);

  return (
    <Box textAlign="center" justifyContent="center" alignItems='center' style={{marginTop:'800px'}}>

      <Box textAlign="center" justifyContent="center" alignItems='center'  >
        <Typography variant="h1" component="h1" color="black" style={{ marginTop: '1rem', fontSize: '120px', textAlign: 'center' }}>
          THANK YOU 
        </Typography>
        <Typography variant="h6" component="h6" color="black" style={{ marginTop: '1rem', fontSize: '50px', textAlign: 'center' }}>
          SCAN THE QR CODE FOR CONFIRMATION OF YOUR REGISTRATION
        </Typography>
        <Typography variant="h6" component="h5" color="black" style={{ marginTop: '1rem', fontSize: '50px', textAlign: 'center' }}>
          PLEASE KEEP THESE DETAILS SAFE!
        </Typography>
      </Box>
      <Box textAlign="center" mb={4} style={{
        marginTop:'30px'
      }}>
        <QRCode value={generateDynamicURL()} size={411} />
      </Box>
       
    </Box>
  );
};

export default ThankYouPage;
