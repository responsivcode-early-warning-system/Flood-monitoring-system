import {react, useState} from 'react';
import axios from 'axios';

function RegistrationOTP() {
    const [Contact, setContact] =useState('');


    function setContact(contact) {
        this.httpService.post("https://api.semaphore.co/api/v4/otp", {

        apikey: "",
        message: 'Your One-TIme Password is: {otp}. Please use it within 5 minutes',
        number: mobile,
        code:code
        }).subscrive((x) => {
            console.log(x);
        })

        
    }
    return(

        <div>
            <h1>Enter OTP</h1>
            <h2>Enter your contact information to link with your account</h2>
            <input type="text" placeholder="Enter contact number"/>
            <button>Submit</button>
        </div>
    )
}


export default RegistrationOTP;