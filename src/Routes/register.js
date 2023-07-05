var express = require("express");
var con = require("../connectDB");

var router = express.Router();
var connection = con.getConnection();

router.post("/", (req, res) => {
  try {
    const { name, password, email, position } = req.body;
    const created_at = new Date().toISOString().slice(0, 19).replace("T", " ");

    let query =
      "INSERT INTO employees (name, password, email, created_at, position) VALUES (?, ?, ?, ?, ?)";
    let values = [name, password, email, created_at, position];

    connection.query(query, values, (error, data) => {
      if (error) {
        throw error;
      } else {
        return res.json({
          data,
          success: true,
          message: "User register succesfully",
        });
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
