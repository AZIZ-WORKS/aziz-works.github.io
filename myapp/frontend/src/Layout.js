import React from 'react';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './App.css'; // Ensure the path is correct

const Layout = ({ children }) => {
  const location = useLocation();
  let backgroundClass = '';

  if (location.pathname === '/') {
    backgroundClass = 'homepage-background';
  } else if (location.pathname.startsWith('/register')) {
    backgroundClass = 'formpage-background';
  } else if (location.pathname === '/thank-you') {
    backgroundClass = 'thankyoupage-background';
  }

  return (
    <div className={backgroundClass} style={{  backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat:' no-repeat',
      width: '100%',
      height: '2960px', /* Ensures it covers the viewport height */
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'}}>
      <Container fluid  style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box mb={4} style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', alignContent: 'left', marginLeft: '-1100px' }}>
          <img src={'../Aramco.png'} alt="Aramco" style={{height:'92px', width: '578px', marginTop: '170px' }} />
          <Typography variant="h4" component="h4" color="white" style={{fontSize:'70px', width:'578px' }}>
            ARAMCO SIM ARENA
          </Typography>
        </Box>
        <Box style={{ borderRadius: 'none', backgroundColor: 'white', padding: '50px', width:'1678px', height: '2308px' }}>
          {children}
        </Box>
      </Container>
    </div>
  );
};

export default Layout;