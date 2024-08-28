import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Grid, Paper } from "@mui/material";
import Button from '@mui/material/Button';
import { blue } from "@mui/material/colors";
import OtpTimer from 'otp-timer';

const resendOTP = () => {
  console.log("OTP sent");
}

const validateOtp= () => {

}


const Test = () => {
  const [showTimer, setShowTimer] = useState(true);
  const handleClick = (status) => {
    setShowTimer(status);
    SendOTP();
  };
  
  const paperStyle= {padding: 20, height:100, width: 300, margin: '20px auto',  display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '7%'}
  
    return (
        <Grid>
            <Paper elevation ={10} style={paperStyle}>
                <div>
                    <h5>We've sent A One-Time-Password to the Contact Number you've given</h5>
                    <input type="text" placeholder="Enter the OTP Here..." size= {35}/>
                    <br />
                    {showTimer && <OtpTimer seconds={10} resend= {() => handleClick(true)} text= "Resending OTP in ..." />}
                    <Button style={{textAlign: 'center'}}color="secondary"  onClick={validateOtp}>Submit</Button>
                    <div style={{ color: '#ffffff', padding: '10px 20px', borderRadius: '5px', fontSize: '18px', fontWeight: 'bold', textAlign: 'center'}}>

                    </div>
                </div>
            </Paper>
        </Grid>
    )
}


export default Test;