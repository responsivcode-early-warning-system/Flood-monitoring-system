const {
    sequelize,
    Customer_Users,
    Customer_User_Credentials,
    Otp_Storage,
    Temporary_Customer_User_Credentials,
    Temporary_Customer,
    Deleted_Customer_Users,
    Deleted_Customer_User_Credentials,
  } = require("../models");
  const nodemailer = require("nodemailer");
  const jwt = require("jsonwebtoken");
  const bcrypt = require("bcrypt");
  const { generating_otp } = require("../controllers/utils");
  const axios = require("axios");
  
  class customer_auth_controller {
    //auth
    customer_auth_login = async (req, res) => {
      try {
        const { username, password } = req.body;
  
        // Find the customer user by username
        const customer = await Customer_Users.findOne({
          where: { username: username },
        });
  
        if (!customer) {
          return res.status(404).json({ message: "User not found" });
        }
  
        // Check if there is an OTP entry for this customer ID
        const otpEntry = await Otp_Storage.findOne({
          where: { otp_owner: customer.customer_id },
        });
  
        if (otpEntry) {
          return res.status(403).json({ message: "Please validate OTP first" });
        }
  
        // Compare the provided password with the stored hashed password
        const match = await bcrypt.compare(password, customer.password);
        if (!match) {
          return res
            .status(401)
            .json({ message: "Invalid username or password" });
        }
  
        //first value fetch by the flag
        const currentIsFirstLogin = customer.isFirstLogin;
  
        //Update isFirstLogin
        if (customer.isFirstLogin == 1) {
          await customer.update({ isFirstLogin: "0" });
        }
  
        // Generate a JWT token
        const accessToken = jwt.sign(
          {
            username: customer.username,
            customer_id: customer.customer_id,
          },
          "importantsecret",
          {
            algorithm: "HS256",
            expiresIn: "1d", // Token expires in 1 day
          }
        );
  
        return res.status(200).json({
          id: customer.customer_id,
          username: customer.username,
          isFirstLogin: currentIsFirstLogin,
          message: "Logged-in Successfully",
          token: accessToken,
        });
      } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    };
  
    customer_auth_usernamechecker = async (req, res) => {
      try {
        const { username } = req.body;
  
        const duplicate_username = await Customer_Users.findOne({
          where: {
            username: username,
          },
        });
        if (duplicate_username) {
          return res
            .status(400)
            .json({ message: "This username is already taken." });
        }
        return res.status(200).json({ message: "Username is available." });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    };
  
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
  
    
  
    resend_otp = async (req, res) => {
      const { customer_id, contactNumber, type } = req.body;
  
      try {
        const latest_otp = await Otp_Storage.findOne({
          where: { otp_owner: customer_id, type: type }, // Include type
          order: [["createdAt", "DESC"]],
        });
  
        if (latest_otp) {
          await latest_otp.destroy();
        }
  
        const otp_response = await this.generate_otp(
          customer_id,
          contactNumber,
          type
        );
        res.status(200).json({ message: otp_response.message });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    };
  
    validate_otp = async (req, res) => {
      const { customer_id, otp_code, type } = req.body;
      console.log(req.body);
  
      try {
        // Fetch the most recent OTP
        const otp_response = await Otp_Storage.findOne({
          where: { otp_owner: customer_id, type: type },
          order: [["createdAt", "DESC"]],
        });
  
        console.log(otp_response);
  
        if (!otp_response) {
          return res
            .status(400)
            .json({ message: "Please provide the OTP code for verification." });
        }
  
        if (otp_code == otp_response.otp_code) {
          const currentTime = new Date();
          if (currentTime <= otp_response.expiration) {
            await otp_response.destroy();
  
            if (type == "register") {
              // Handle registration
              const temporaryUser = await Temporary_Customer.findByPk(
                customer_id
              );
              const customerData = {
                username: temporaryUser.username,
                password: temporaryUser.password,
                isFirstLogin: temporaryUser.isFirstLogin,
                isVerified: true, // Mark as verified
              };
  
              const createCustomer = await Customer_Users.create(customerData);
  
              const temporaryCredentials =
                await Temporary_Customer_User_Credentials.findOne({
                  where: { customerCredential_id: customer_id },
                });
              const customerCredentials = {
                customerCredential_id: createCustomer.customer_id,
                nickname: temporaryCredentials.nickname,
                contactNumber: temporaryCredentials.contactNumber,
              };
              await Customer_User_Credentials.create(customerCredentials);
  
              await temporaryUser.destroy();
              await temporaryCredentials.destroy();
  
              return res
                .status(200)
                .json({ message: "OTP is valid. Account verified." });
            } else if (type == "forgot_pass") {
              // Handle password reset
              await otp_response.destroy();
  
              return res.status(200).json({ message: "OTP Valid." });
            } else {
              return res.status(400).json({ message: "Invalid OTP type." });
            }
          } else {
            return res
              .status(400)
              .json({ message: "The OTP has already expired." });
          }
        } else {
          return res.status(400).json({ message: "Invalid inputted OTP" });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    };
  
    customer_auth_register = async (req, res) => {
      try {
        const { username, password, nickname, contactNumber } = req.body;
  
        // Check for duplicate contact number
        const duplicateContactnum = await Customer_User_Credentials.findOne({
          where: {
            contactNumber: contactNumber,
          },
        });
  
        if (duplicateContactnum) {
          return res
            .status(400)
            .json({ message: "This contact number is already in use." });
        }
  
        // Check for duplicate username
        const duplicateUsername = await Customer_Users.findOne({
          where: { username: username },
        });
  
        if (duplicateUsername) {
          return res
            .status(400)
            .json({ message: "This username is already in use." });
        }
  
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Create the customer user with hashed password and unverified status
        const customer = {
          username,
          password: hashedPassword,
          isFirstLogin: "1",
          isVerified: false, // User starts as unverified
        };
  
        // Create the temporary user entry
        const createCustomer = await Temporary_Customer.create(customer);
  
        // Create customer user credentials in temporary table
        const customerCredentials = {
          customerCredential_id: createCustomer.customer_id,
          nickname: nickname,
          contactNumber: contactNumber,
        };
        await Temporary_Customer_User_Credentials.create(customerCredentials);
  
        // Generate and send OTP
        const otp_confirm = await this.generate_otp(
          customerCredentials.customerCredential_id,
          customerCredentials.contactNumber,
          "register" // Specify the type as 'register'
        );
  
        res.status(200).json({
          id: createCustomer.customer_id,
          username: createCustomer.username,
          contactNumber: customerCredentials.contactNumber,
          message: otp_confirm.message,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    };
  
    forgot_password = async (req, res) => {
      const { contactNumber } = req.body;
  
      const contactNumber_exists = await Customer_User_Credentials.findOne({
        where: { contactNumber: contactNumber },
        order: [["createdAt", "DESC"]],
      });
  
      if (!contactNumber_exists) {
        return res.status(400).json({ message: "Contact number doesn't exist" });
      }
  
      try {
        const otp_confirm = await this.generate_otp(
          contactNumber_exists.customerCredential_id,
          contactNumber_exists.contactNumber,
          "forgot_pass" // Specify the type as 'reset'
        );
  
        res.status(200).json({
          message: otp_confirm.message,
          customer_id: contactNumber_exists.customerCredential_id,
          contactNumber: contactNumber_exists.contactNumber,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    };
    reset_password = async (req, res) => {
      const { customer_id, new_password } = req.body;
  
      const change_password = await Customer_Users.findOne({
        where: { customer_id: customer_id },
        order: [["createdAt", "DESC"]],
      });
  
      try {
        bcrypt.hash(new_password, 18).then(async (hash) => {
          await change_password.update({
            password: hash,
          });
        });
  
        res
          .status(200)
          .json({ message: "Password has been reset successfully." });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    };
  
    // Email test code
    generate_otp_email = async (customer_id, email) => {
      const otp = generating_otp();
      const message = D2Taxi: ${otp} is your security code.;
  
      const expirationTime = new Date();
      expirationTime.setMinutes(expirationTime.getMinutes() + 5 * 6000);
  
      try {
        await Otp_Storage.create({
          otp_owner: customer_id,
          otp_code: otp,
          expiration: expirationTime,
        });
  
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "zarcokoykoy35@gmail.com",
            pass: "eufe bdiz cuxu zluc", //token here
          },
        });
  
        let mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Your OTP Code",
          text: message,
        };
  
        // Send email
        let info = await transporter.sendMail(mailOptions);
  
        console.log("Email sent: " + info.response);
  
        return { message: "OTP is successfully sent to email" };
      } catch (error) {
        console.log("Error sending OTP via email:", error);
        return { message: "Failed to send OTP to email" };
      }
    };
  
    validate_email_otp = async (req, res) => {
      const { customer_id, otp_code } = req.body;
      console.log(req.body);
      const otp_email_response = await Otp_Storage.findOne({
        where: { otp_owner: customer_id },
        order: [["createdAt", "DESC"]],
      });
  
      try {
        if (!otp_email_response) {
          res
            .status(400)
            .json({ message: "Please provide the OTP code for verification." });
          return;
        }
  
        if (otp_code == otp_email_response.otp_code) {
          const currentTime = new Date();
          if (currentTime <= otp_email_response.expiration) {
            await otp_email_response.destroy();
            res.status(200).json({ message: "OTP is valid" });
          } else {
            res.status(400).json({ message: "The OTP has already expired." });
          }
        } else {
          res.status(400).json({ message: "Invalid inputted OTP" });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Invalid Server Error" });
      }
    };
  
    resend_email_otp = async (req, res) => {
      const { customer_id, email } = req.body;
      try {
        const latest_email_otp = await Otp_Storage.findOne({
          where: { otp_owner: customer_id },
          order: [["createdAt", "DESC"]],
        });
        await latest_email_otp.destroy();
  
        const otp_email_response = await this.generate_otp_email(
          customer_id,
          email
        );
        res.status(200).json({ message: otp_email_response.message });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    };
  
    email_test = async (req, res) => {
      const { customer_id, email } = req.body;
      const result = await this.generate_otp_email(customer_id, email);
      res.status(200).json({ message: result.message });
    };
  
    get_all_customers = async (req, res) => {
      try {
        const customers = await Customer_User_Credentials.findAll();
        return res.status(200).json(customers);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    };
    get_customer_users = async (req, res) => {
      try {
        const customers = await Customer_Users.findAll();
        return res.status(200).json(customers);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    };
    getCustomerById = async (req, res) => {
      const { customer_id } = req.params;
      try {
        const customer = await Customer_Users.findOne({
          where: { customer_id: customer_id },
        });
        if (customer) {
          res.status(200).json(customer);
        } else {
          res.status(404).json({ message: "Customer not found" });
        }
      } catch (error) {
        console.error("Error fetching customer:", error); // Log detailed error message
        res.status(500).json({ message: "Internal Server Error" });
      }
    };
    getCustomerDetailsById = async (req, res) => {
      const { customerCredential_id } = req.params;
      try {
        const customer = await Customer_User_Credentials.findOne({
          where: { customerCredential_id: customerCredential_id },
        });
        if (customer) {
          res.status(200).json(customer);
        } else {
          res.status(404).json({ message: "Customer not found" });
        }
      } catch (error) {
        console.error("Error fetching customer:", error); // Log detailed error message
        res.status(500).json({ message: "Internal Server Error" });
      }
    };
    paginationCustomers = async (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 7;
      const offset = (page - 1) * limit;
  
      try {
        const { count, rows: customers } =
          await Customer_User_Credentials.findAndCountAll({
            offset,
            limit,
          });
  
        res.status(200).json({
          currentPage: page,
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          customers,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    };
  
    getCustomerPercentageIncrease = async (req, res) => {
      try {
        // Step 1: Fetch all customers
        const customers = await Customer_Users.findAll();
  
        // Step 2: Filter customers created today
        const today = new Date();
        const todayCustomers = customers.filter((customer) => {
          const customerDate = new Date(customer.createdAt);
          return customerDate.toDateString() === today.toDateString();
        });
  
        // Step 3: Calculate percentages
        const totalCustomers = customers.length;
        const todayCustomerCount = todayCustomers.length;
        const percentageCustomerIncrease = (
          (todayCustomerCount / totalCustomers) *
          100
        ).toFixed(2);
  
        // Step 4: Return the result
        res.json({ percentageCustomerIncrease });
      } catch (error) {
        console.error("Error fetching customers:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    };
    deleteCustomerUserById = async (req, res) => {
      const { customerCredential_id } = req.params;
      const transaction = await sequelize.transaction();
  
      try {
        // Fetch the customer user data
        const customerUser = await Customer_Users.findOne({
          where: { customer_id: customerCredential_id },
          transaction,
        });
  
        if (!customerUser) {
          await transaction.rollback();
          return res.status(404).json({ message: "Customer user not found" });
        }
  
        // Fetch the customer user credentials data
        const customerUserCredentials = await Customer_User_Credentials.findOne({
          where: { customerCredential_id },
          transaction,
        });
  
        // Move the customer user data to the deleted customer users table
        await Deleted_Customer_Users.create(
          {
            ...customerUser.toJSON(),
            deletedAt: new Date(),
          },
          { transaction }
        );
  
        // Move the customer user credentials data to the deleted customer user credentials table
        await Deleted_Customer_User_Credentials.create(
          {
            ...customerUserCredentials.toJSON(),
            deletedAt: new Date(),
          },
          { transaction }
        );
  
        // Delete the customer user data from the current models
        await customerUser.destroy({ transaction });
        await customerUserCredentials.destroy({ transaction });
  
        // Commit the transaction
        await transaction.commit();
  
        res.status(204).send();
      } catch (error) {
        // Rollback the transaction in case of error
        await transaction.rollback();
        console.error("Error deleting customer user:", error); // Log detailed error message
        res.status(500).json({ message: "Internal Server Error" });
      }
    };
    updateCustomerCredentials = async (req, res) => {
      const { customer_id } = req.params; // Get customer_id from the URL parameters
      const updateData = req.body; // Get the data to update from the request body
  
      try {
        // Find the record by customer_id
        const credentials = await Customer_User_Credentials.findOne({
          where: { customer_id },
        });
  
        if (!credentials) {
          return res
            .status(404)
            .json({ message: "Customer credentials not found" });
        }
  
        // Update the record with the new data
        await credentials.update(updateData);
  
        res.status(200).json(credentials);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
  
    blockCustomer = async (req, res) => {
      const { customer_id } = req.params;
      const { status } = req.body;
  
      try {
        // Find the customer user by customer_id
        const customerUser = await Customer_Users.findOne({
          where: { customer_id },
        });
  
        if (!customerUser) {
          return res.status(404).json({ message: "Customer user not found." });
        }
  
        // Update the status field
        customerUser.status = status;
        await customerUser.save();
  
        res.status(200).json({
          message: "Customer status updated successfully.",
          data: customerUser,
        });
      } catch (error) {
        console.error("Error updating customer status:", error);
        res.status(500).json({
          message: "An error occurred while updating customer status.",
          error,
        });
      }
    };
  }
  
  module.exports = new customer_auth_controller();