import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Grid, Paper } from "@mui/material";
import Button from '@mui/material/Button';
import OtpTimer from 'otp-timer';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const validateOtp= async (otp, form, nav) => {
  try {
    const response = await axios.post(`http://localhost:7000/validateotp/${otp}`, form);
    console.log(response.data.message);
    nav('/', {replace: true});
  } catch (error) {
    console.error(error);
  }
}

const RegistrationOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state.formData;

  const [showTimer, setShowTimer] = useState(true);
  const handleClick = (status) => {
    setShowTimer(status);
  };

  useEffect(() => {

  }, [formData]);

  const paperStyle= {padding: 20, height:100, width: 300, margin: '20px auto',  display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '7%'}
  
    return (
        <Grid>
            <Paper elevation ={10} style={paperStyle}>
                <div>
                    <h5>We've sent A One-Time-Password to the Contact Number you've given</h5>
                    <input type="text" id="otpInput"  placeholder="Enter the OTP Here..." size= {35}/>
                    <br />
                    {showTimer && <OtpTimer seconds={10} resend= {() => handleClick(true)} text= "Resending OTP in ..." />}
                    <Button style={{textAlign: 'center'}}color="secondary"  onClick={() => validateOtp(document.getElementById('otpInput').value, formData, navigate)}>Submit</Button>

                    <div style={{ color: '#ffffff', padding: '10px 20px', borderRadius: '5px', fontSize: '18px', fontWeight: 'bold', textAlign: 'center'}}>
                    </div>
                </div>
            </Paper>
        </Grid>
    )
}


export default RegistrationOtp;