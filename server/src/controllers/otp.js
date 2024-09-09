const con= require("../models/server")
const axios =require('axios')
function generate_otp() {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
async function SendSemaphore(message, number) {
  const body = {
    apikey: process.env.SP_API_KEY,
    number: number,
    message: message,
  };
      try{
      const response = await axios.post("https://api.semaphore.co/api/v4/otp", body);
      console.log(response.data);
      if (response.status === 200) {
        return { message: "OTP is successfully sent" };
      } else {
        console.error("Failed to send OTP via Semaphore:", response.data);
        return { message: "Failed to send OTP" };
      }
    } catch (error) {
      console.error("Error sending OTP via Semaphore:", error);
      return { message: "Error sending OTP" };
    }
}
/*
const ValidateOtp= (req, res)=> {
  const otp= req.params;
  

}
*/
const SendOtp = (req, res) => {
  const otp = generate_otp();
  // todo: chagne into sessions
  const username = req.body.username; 
  const mobileNumber= req.body.number; 
  const message = `Your One-Time is ${otp}}`;
  
  //SendSemaphore(message, mobileNumber);

  const sqlInsert = 'INSERT IGNORE INTO otp (username, otp) VALUES (?, ?)';
  con.query(sqlInsert, [username, otp], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err });
    }
    if (results.affectedRows === 0) {
      const sqlUpdate = 'UPDATE otp SET otp = ? WHERE username = ?';
      con.query(sqlUpdate, [otp, username], (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: err });
        }
        console.log("otp updated successfully")
      });
    } 
    // Send OTP via Semaphore
    return res.json(results);
  });
};

module.exports= {SendOtp};
