import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Webcam from 'react-webcam';
import axios from 'axios';
import { Container, Box, Typography, Grid, Button, FormControl,TextField,Select,InputLabel, MenuItem, FormControlLabel, Checkbox, IconButton } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import SvgIcon from '@mui/material/SvgIcon';
import ReplayIcon from '@mui/icons-material/Replay'; 
import { styled } from '@mui/material/styles';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import './F.css'

import '../font.css'

// moved the custom fields out of the component because that causes the styles to be redefined on each render
const CustomTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    borderRadius: '0',
    backgroundColor: '#323232',
    color: '#C0C0C0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: '#424242', // Optional: Darken background on hover
    },
    '&.Mui-focused': {
      backgroundColor: '#424242', // Optional: Darken background on focus
    },
  },
  '& .MuiInputBase-input': {
    width: '100%', // Ensures input takes full width within TextField
    height: '100%', // Ensures input takes full height within TextField
    padding: '0 10px',
    fontSize: '90px', // Adjust as needed for font size
    textAlign: 'center', // Centers text horizontally
    color: '#C0C0C0', // Adjust text color as needed
    backgroundColor: 'transparent', // Ensure input background is transparent
    border: 'none', // Ensure no border on the input itself
    '&:focus': {
      outline: 'none', // Remove outline on focus if needed
    },
  },
  '& .MuiFilledInput-underline:after': {
    borderBottomColor: '#84BD00', // Change the focus color to green
  },
  '& .MuiInputLabel-root': {
    color: '#C0C0C0', // Set label color
    fontSize: '100px', // Adjust the font size here
    left: '30px', // Adjust as needed
    transition: 'transform 0.3s ease, opacity 0.3s ease',
    transform: 'translateY(0)', // Initial transform
  },
  '& .MuiInputLabel-root.Mui-focused': {
    transform: 'translateY(-20px)', // Move up when focused
    opacity: 0,
  },
  '& .MuiFormLabel-asterisk': {
    display: 'none', // Remove the required asterisk
  },
});






const CustomFormControl = styled(FormControl)({
  '& .MuiInputLabel-root': {
    color: '#C0C0C0', // Change the label color
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#C0C0C0', // Change the label color when focused
  },  '& .MuiFormLabel-asterisk': {
    display: 'none', // Remove the required asterisk
  },
});

const CustomMenuItem = styled(MenuItem)({
  color: '#FFFFFF', // Change the item text color
  '&:hover': {
    backgroundColor: '#84BD00', // Change the hover background color
  },
});





const CustomCheckbox = styled(Checkbox)(({ theme, checked }) => ({
  width: '80px',
  height: '80px',
  backgroundColor: '#323232',
  color: '#84BD00',
  borderRadius: '0',
  '& .MuiSvgIcon-root': {
    fontSize: 70, // Adjust the size of the checkbox icon
  },
  '& .MuiInputLabel-root': {
    fontSize: '16px', // Adjust the font size of the label
    // You can also adjust other label-related styles here if needed
  },
  '&:not(.Mui-checked)': {
    borderColor: 'transparent', // Hide the border when not checked
  },
  '&.Mui-checked': {
    color: '#84BD00', // Green color when checked
  },
  '&.MuiTypography-root .MuiTypography-body1 .MuiFormControlLabel-label .css-ahj2mt-MuiTypography-root':{
    
  }
}));
const FormPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    phone: '',
    email: '',
    firstTime: '',
    photo: '',
  });
  const [imageSrc, setImageSrc] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const navigate = useNavigate();
  const { raceType } = useParams();
  const webcamRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  /**
   * function to convert the image from data URL to a File object
   * similar to the one we get from file input field
   * required for multer to pick it up properly
   */
  function dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  const handleCapture = () => {
    if (showWebcam) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImageSrc(imageSrc);
      
      const file = dataURLtoFile(imageSrc, 'photo.jpg');
      
      setFormData(prevData => ({ ...prevData, photo: file }));
      setShowWebcam(false);
    } else {
      setShowWebcam(true);
      setImageSrc(null); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      formDataToSend.append('raceType', raceType);

      const response = await axios.post('http://localhost:5000/api/registrations', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      navigate('/thank-you', { state: { ...response.data.registration } });
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };
  const CustomClearIcon = () => (
    <SvgIcon style={{ width: 70, height: 70 }}>
      <ClearIcon />
    </SvgIcon>
  );
  const handleRetry = () => {
    setShowWebcam(true);
    setImageSrc(null); // Clear captured image
  };
  
  return (
  
     
<>
        
      
        <form onSubmit={handleSubmit}>
          <Grid container direction="column" spacing={0.5} justifyContent={'center'}alignContent={'center'}>
            <Grid item>
              <CustomTextField
                label="Full Name:"
                variant="filled"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                InputProps={{
                  style: {
              marginBottom:'32px',
                    height:'160px',
                    width:'1260px',
                    borderRadius: '0',
                    backgroundColor: '#323232',
                    color: '#C0C0C0',
                    textAlign:'right',
                    alignContent:'center',
                    justifyContent:'center'
                  },
                  autoComplete: 'off',
                }}
                InputLabelProps={{
                  hidden: formData.name.length > 0,
                  style: {
                    color: '#C0C0C0',
                  },

                }}
              />
            </Grid> 
            <Grid item >
              <CustomTextField
                label="Phone Number:"
                variant="filled"
                fullWidth
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                InputProps={{

                  style: {
                    width:'1260px',
                    height:'160px',
                    marginBottom:'32px',
                    borderRadius: '0',
                    backgroundColor: '#323232',
                    color: '#C0C0C0',
                  },
                  autoComplete: 'off',
                }}
                InputLabelProps={{
                  hidden: formData.phone.length > 0,

                  style: {
                    color: '#C0C0C0',
                  },
                }}
              />
            </Grid>
             <Grid item>
              <CustomTextField
                label="Email Address:"
                variant="filled"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                InputProps={{

                  style: {
                    height:'160px',
                    borderRadius: '0',
                    width:'1260px',
                    marginBottom:'32px',
                    backgroundColor: '#323232',
                    color: '#C0C0C0',
                  
                  },
                  autoComplete: 'off',
                }}
                InputLabelProps={{
                  hidden: formData.email.length > 0,

                  style: {
                    color: '#C0C0C0',
                  },
                }}
              />
            </Grid>
            <Grid item>
            <Typography variant="h1" gutterBottom textAlign='center' style={{ marginBottom: '30px', marginTop: '30px' }}>
  Select Gender:
</Typography>
<Box display="flex" justifyContent="start" style={{ marginBottom: '30px', fontSize: '125px' , gap:'260px'}}>
  <FormControlLabel
    style={{
      display: 'flex',
      flexDirection: 'column-reverse',
      alignItems: 'center',
      fontSize: '90px',
      marginLeft:'350px'

    }}
    control={
      <CustomCheckbox
      icon={<div style={{ width: 70, height: 70, backgroundColor: '#323232' }} />}
                    checkedIcon={<CustomClearIcon />}
        checked={formData.gender === 'male'}
        onChange={() => setFormData(prevData => ({ ...prevData, gender: 'male' }))}
        name="genderMale"
        size='large'
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '0',
          backgroundColor: '#323232',
          color: "#84BD00",
        }} 
      />
    }
    label={ <Typography style={{fontSize:'70px'}}>
    MALE
  </Typography>}
    labelPlacement="end"
  />
  <FormControlLabel
    style={{
      display: 'flex',
      flexDirection: 'column-reverse',
      alignItems: 'center',
    }}
    control={
      <CustomCheckbox
      icon={<div style={{ width: 70, height: 70, backgroundColor: '#323232' }} />}
                    checkedIcon={<CustomClearIcon />}
        checked={formData.gender === 'female'}
        onChange={() => setFormData(prevData => ({ ...prevData, gender: 'female' }))}
        size='large'
        name="genderFemale"
        style={{
          borderRadius: '0',
          backgroundColor: '#323232',
          color: "#84BD00",
          width: '80px',
          height: '80px',
        }}
      />
    }
    label={ <Typography style={{ fontSize: '70px',   }}>
    FEMALE
  </Typography>}
    labelPlacement="end"
  />
</Box>
            </Grid>    
           
           
       
            <Grid item>
              <Typography variant="h1" gutterBottom textAlign='center' style={{marginBottom:'30px', marginTop:'30px',}}>
                IS THIS YOUR FIRST RACE?
              </Typography>
              <Box display="flex" justifyContent="start" style={{marginBottom:'30px',fontSize:'125px', gap:'350px'}}>
                <FormControlLabel
                style={{
                  display:'flex',
                  flexDirection:'column-reverse',
                  alignItems:'center',
                  fontSize:'40px',
      marginLeft:'370px'

                }}
                  control={
                    <CustomCheckbox
                    icon={<div style={{ width: 70, height: 70, backgroundColor: '#323232' }} />}
                    checkedIcon={<CustomClearIcon />}
                    checked={formData.firstTime === 'yes'}
                    onChange={() => setFormData(prevData => ({ ...prevData, firstTime: 'yes' }))}
                    name="firstTimeYes"
                    size='large'
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '0',
                      backgroundColor: '#323232',
                      color: "#84BD00",
                    }}
                    inputProps={{
                      style: {
                        fontSize: '40px', // Adjust the font size of the label text
                      }
                    }}
                  />
                  }
                  label={   <Typography style={{ fontSize: '70px' }}>
                  YES
                </Typography>}
                  labelPlacement="end"
                />
                <FormControlLabel
                 style={{
                  display:'flex',
                  flexDirection:'column-reverse',
                  alignItems:'center',
                  
                }}
                  control={
                    <CustomCheckbox
                    icon={<div style={{ width: 70, height: 70, backgroundColor: '#323232',fontSize:'18px' }} />}
                   
                    checkedIcon={<CustomClearIcon />}
                      checked={formData.firstTime === 'no'}
                      onChange={() => setFormData(prevData => ({ ...prevData, firstTime: 'no' }))}
                      size='large'
                      name="firstTimeNo"
                      style={{
                        //  display:"none",
                        borderRadius: '0',
                        backgroundColor:'#323232',color:"#84BD00",
                        width:'80px',
                        height:'80px',fontSize:'400px'
                        
                      }}
                    />
                  }
                  label={ <Typography style={{ fontSize: '70px' }}>
                  NO
                </Typography>}
                  labelPlacement="end"
                />
              </Box>
            </Grid>
            <Grid item>
              <Typography variant="h1" gutterBottom style={{textAlign:'center'}}>
TAKE YOUR PHOTO              </Typography>
              <Box className="webcam-container" style={{ width: '450px', height: '450px', margin: '0 auto 50px'}}>
              {showWebcam ? (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width="100%"
          videoConstraints={{ width: 411, height: 411 }}
          style={{ width: '100%', height: '100%' }}
          onClick={handleCapture}
        />
      ) : (
        imageSrc ? (
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <img src={imageSrc} alt="Captured" style={{ width: '100%', height: '100%' }} />
            <IconButton
              style={{ position: 'absolute', top: 10, right: 10, color: '#fff' }}
              onClick={handleRetry}
            >
              <ReplayIcon style={{width:'50px',height:'50px',backgroundColor:'#323232',opacity:'0.8',color:'#84BD00',}
              } />
            </IconButton>
          </div>
        ) : (
          <Box style={{ width: '100%', height: '100%', backgroundColor: '#323232', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton style={{ color: '#84BD00' }} onClick={handleCapture}>
              <img src='../icon1.png' alt="Capture" />
            </IconButton>
          </Box>
        )
      )}
              </Box>
            </Grid>
            <Grid item>
              <Button variant="contained" style={{backgroundColor:"#84BD00",color:'#323232',fontSize:'90px', borderRadius: '0',fontWeight:'bold'}} type="submit" fullWidth >Submit</Button>
            </Grid>
          </Grid>
        </form>
  </>
  );
};

export default FormPage;
