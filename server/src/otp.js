generate_otp = async (customer_id, contactNumber, type) => {
    const otp = generating_otp();
    const message = D2Taxi:${otp} is your security code.;
    const mobileNumber = contactNumber;

    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 5); // Correct expiration time

    const body = {
      apikey: process.env.SP_API_KEY,
      number: mobileNumber,
      message: message,
    };

    try {
      await Otp_Storage.create({
        otp_owner: customer_id,
        otp_code: otp,
        expiration: expirationTime,
        type: type, // Include the type
      });

      const response = await axios.post(
        "https://api.semaphore.co/api/v4/priority
",
        body
      );

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
  };

  test = async (req, res) => {
    const { customer_id, contactNumber, type } = req.body;
    const result = await this.generate_otp(customer_id, contactNumber, type);
    res.status(200).json({ message: result.message });
  };



  function generating_otp() {
    return Math.floor(100000 + Math.random() * 900000);
  }
  module.exports = { generating_otp };



  SP_API_KEY=4d06c95cff331a0c1a230e89f0e6158d