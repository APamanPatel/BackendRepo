var express = require("express");
var con = require("../connectDB");

var router = express.Router();
var connection = con.getConnection();

router.post("/add", (req, res) => {
  try {
    const { room_code, room_name, capacity } = req.body;

    let query =
      "INSERT INTO rooms (room_code, capacity, room_name) VALUES (?, ?, ?)";
    let values = [room_code, capacity, room_name];

    connection.query(query, values, (error, data) => {
      if (error) {
        throw error;
      } else {
        return res.json({
          data,
          success: true,
          message: "Room added succesfully",
        });
      }
    });
  } catch (error) {
    return res.json({
      data,
      success: false,
      message: error.message,
    });
  }
});

router.get("/all", (req, res) => {
  try {
    let query = "SELECT * FROM rooms";

    connection.query(query, (error, data) => {
      if (error) {
        throw error;
      } else {
        return res.json({
          data,
          success: true,
          message: "Room fetched succesfully",
        });
      }
    });
  } catch (error) {
    return res.json({
      data,
      success: false,
      message: error.message,
    });
  }
});

router.delete("/delete/:id", (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    let query = "DELETE FROM Rooms WHERE room_id = " + id + "";

    connection.query(query, (error, data) => {
      if (error) {
        throw error;
      } else {
        if (data.affectedRows > 0) {
          return res.json({
            data,
            success: true,
            message: "Room deleted succesfully",
          });
        } else {
          return res.json({
            data,
            success: false,
            message: "Room not found",
          });
        }
      }
    });
  } catch (error) {
    return res.json({
      data,
      success: false,
      message: error.message,
    });
  }
});

router.put("/update/:id", (req, res) => {
  try {
    const { room_code, room_name, capacity } = req.body;
    const { id } = req.params;

    let query =
      "UPDATE Rooms SET room_name = ?, room_code = ?, capacity = ? WHERE room_id = ?";
    let values = [room_name, room_code, capacity, id];

    connection.query(query, values, (error, data) => {
      if (error) {
        throw error;
      } else {
        if (data.affectedRows > 0) {
          return res.json({
            data,
            success: true,
            message: "Room updated succesfully",
          });
        } else {
          return res.json({
            data,
            success: false,
            message: "Room not found",
          });
        }
      }
    });
  } catch (error) {
    return res.json({
      data,
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
