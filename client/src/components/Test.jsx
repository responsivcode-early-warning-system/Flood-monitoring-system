import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Grid, Paper } from "@mui/material";
import Button from '@mui/material/Button';
import { blue } from "@mui/material/colors";
import OtpTimer from 'otp-timer';

const Test = () => {
  const [showTimer, setShowTimer] = useState(false);
  const handleClick = () => {
    setShowTimer(true);
    SendOTP();
  };

  const SendOTP = () => {
    console.log("OTP sent");
  }

  const paperStyle= {padding: 20, height:100, width: 200, margin: '20px auto',  display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '7%'}
  
    return (
        <Grid>
            <Paper elevation ={10} style={paperStyle}>
                <div>
                    <h5>Enter your Contact number</h5>
                    <input type="text" placeholder="Enter the your Contact Number to send One-Time-Password" />
                    <Button style={{textAlign: 'center'}}color="secondary"  onClick={handleClick}>Submit</Button>
                    <div style={{ color: '#ffffff', padding: '10px 20px', borderRadius: '5px', fontSize: '18px', fontWeight: 'bold', textAlign: 'center'}}>
                    {showTimer && <OtpTimer seconds={10} />}

                    </div>
                </div>
            </Paper>
        </Grid>
    )
}


export default Test;