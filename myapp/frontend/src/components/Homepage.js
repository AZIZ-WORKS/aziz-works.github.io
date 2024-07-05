import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Typography, Grid, Button, Slide } from '@mui/material';
import '../font.css';
import './Hp.css'

const HomePage = () => {
  const events = [
    "Event 1",
    "Event 2",
    "Event 3",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % events.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [events.length]);

  return (
  
<>
       
          <Box mb={4} style={{ marginBottom: '70px ' ,marginTop:'700px', justifyContent:'center'}}>
          <Grid container direction="column" alignItems="center" justifyContent="center">
          <Grid item>
                <Link to="/register/practice" style={{ textDecoration: 'none', width: '100%' }}>
                  <Button
                    variant="outlined"
                    
                    sx={{
                      padding:0,
                      marginBottom:'139px',
                      marginLeft:'30px',
                      height:'156px',
                      width:'1264px',
                      borderColor: '#00843D',
                      borderWidth: '7px',
                      fontSize: '130px',
                      borderRadius: '0',
                      color:'black',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        borderWidth: '7px',
                        borderColor: '#00843D',
                      },
                    }}
                  >PRACTICE
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register/daily-race" style={{ textDecoration: 'none', width: '100%' }}>
                <Button
                    variant="outlined"
                    
                    sx={{
                      marginBottom:'628px',
                      marginLeft:'30px',
                      height:'156px',
                      width:'1264px',
                      borderColor: '#00843D',
                      borderWidth: '7px',
                      fontSize: '130px',
                      borderRadius: '0',
                      color:'black',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        borderWidth: '7px',
                        borderColor: '#00843D',
                      },
                    }}
                  >  
                    DAILY RACE
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box textAlign="center" style={{ height: '150px', overflow: 'hidden', position: 'relative' }}>
                {events.map((event, index) => (
                  <Slide
                    key={index}
                    direction={index === currentIndex ? 'right' : 'left'}
                    in={index === currentIndex}
                    mountOnEnter
                    unmountOnExit
                    timeout={{ enter: 2000, exit: 2000 }} // Adjust the timeout to control slide speed
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      style={{
                        position: index === currentIndex ? 'relative' : 'absolute',
                        height: '150px',
                        width: '100%',
                        top: 0,
                        left: 0,
                      }}
                    >
                      <Typography variant="h1">{event}</Typography>
                    </Box>
                  </Slide>
                ))}
              </Box>
            </Grid>
            <Grid item>
              <Box textAlign="center">
                <Typography variant="h6"  component="h2" style={{fontSize:'40px',backgroundColor:'black',color:'white', width:'533px',height:'58px', textAlign:'center',marginLeft:'200px'}}>
                  SCAN FOR MORE DETAILS
                </Typography>
                <img src={'./bg.png'} alt="QR Code" style={{ maxWidth: '200px', margin: '0 auto'}} />
              </Box>
            </Grid>
          </Grid>
       </> 
  );
};

export default HomePage;
