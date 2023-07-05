var con = require("../connectDB");
var conection = con.getConnection();

conection.connect();

var express = require("express");
var router = express.Router();

// Handle POST request to /login
router.post("/", (req, res) => {
  try {
    const { email, password } = req.body;

    // Query the user table for the provided email and password
    const query = `SELECT emp_id FROM employees WHERE email = ? AND password = ?`;
    const values = [email, password];

    conection.query(query, values, (error, data) => {
      if (error) {
        throw error;
      } else {
        if (data.length > 0) {
          return res.json({
            data,
            success: true,
            message: "Logged in succesfully",
          });
        } else {
          return res.json({
            data: null,
            success: false,
            message: "User not found, Please register",
          });
        }
      }
    });
  } catch (error) {
    return res.json({
      data: null,
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
