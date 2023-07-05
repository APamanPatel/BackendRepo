var express = require("express");
var router = express.Router();
var conection = require("../connectDB").getConnection();

router.get("/get/:id", (req, res) => {
  try {
    const userId = req.params.id;

    // Query the user table for the specified user ID
    const query = `SELECT * FROM employees WHERE emp_id = ?`;
    const values = [userId];

    conection.query(query, values, (error, data) => {
      if (error) {
        throw error;
      } else {
        if (data.length > 0) {
          return res.json({
            data,
            success: true,
            message: "User fetched succesfully",
          });
        } else {
          return res.json({
            data: null,
            success: false,
            message: "User not found",
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

router.get("/all", (req, res) => {
  try {

    // Query the user table for the specified user ID
    const query = `SELECT * FROM employees`;

    conection.query(query, (error, data) => {
      if (error) {
        throw error;
      } else {
        if (data.length > 0) {
          return res.json({
            data,
            success: true,
            message: "User fetched succesfully",
          });
        } else {
          return res.json({
            data: null,
            success: false,
            message: "User not found",
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

// PUT API to update a user profile
router.put("/update/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, email, position } = req.body;

    // Update the user profile in the user table
    const query = `UPDATE employees SET name = ?, password = ?, email = ?, position = ? WHERE emp_id = ?`;
    const values = [username, password, email, position, id];

    conection.query(query, values, (error, data) => {
      if (error) {
        throw error;
      } else {
        if (data.affectedRows > 0) {
          return res.json({
            data,
            success: true,
            message: "User updated succesfully",
          });
        } else {
          return res.json({
            data: null,
            success: false,
            message: "User not found",
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

// DELETE API to delete a user profile
router.delete("/delete/:id", (req, res) => {
  try {
    const userId = req.params.id;

    // Delete the user profile from the user table
    const query = `DELETE FROM employees WHERE emp_id = ?`;
    const values = [userId];

    conection.query(query, values, (error, data) => {
      if (error) {
        throw error;
      } else {
        if (data.affectedRows > 0) {
          return res.json({
            data,
            success: true,
            message: "User deleted succesfully",
          });
        } else {
          return res.json({
            data: null,
            success: false,
            message: "User not found",
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
