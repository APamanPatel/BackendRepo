var con = require("../connectDB");
var connection = con.getConnection();
connection.connect();
var express = require("express");
var router = express.Router();
router.post("/add", (req, res) => {
  try {
    var meeting_name = req.body.meeting_name;
    var start_time = req.body.start_time;
    var end_time = req.body.end_time;
    var meeting_date = req.body.meeting_date;
    var meeting_status = req.body.meeting_status;
    var created_at = req.body.created_at;
    var updated_at = req.body.updated_at;
    var updated_by = req.body.fk_updated_by;
    var is_active = req.body.is_active;
    var fk_room_id = req.body.fk_room_id;
    var fk_emp_id = req.body.fk_emp_id;
    meeting_date = meeting_date.slice(0,11)
    created_at = meeting_date.slice(0,10)
    const query =
      "INSERT INTO meetings(meeting_name, start_time, end_time, meeting_date,meeting_status,fk_emp_id, fk_room_id,updated_at,updated_by, created_at ,is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)";
    const values = [
      meeting_name,
      start_time,
      end_time,
      meeting_date,
      meeting_status,
      fk_emp_id,
      fk_room_id,
      updated_at,
      updated_by,
      created_at,
      is_active,
    ];
    connection.query(query, values, (error, data) => {
      if (error) {
        throw error;
      } else {
        return res.json({
          data,
          success: true,
          message: "Meeting added succesfully",
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
router.get("/all", (req, res) => {
  try {
    const query = "SELECT * FROM Meetings";
    connection.query(query, (error, data) => {
      if (error) {
        throw error;
      } else {
        return res.json({
          data,
          success: true,
          message: "Meetings fetched succesfully",
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

router.get("/get/:fk_emp_id", (req, res) => {
    try {
      const empId = req.params.fk_emp_id;
      const query = "SELECT * FROM Meetings WHERE fk_emp_id = ?";
      connection.query(query, [empId], (error, data) => {
        if (error) {
          throw error;
        } else {
          return res.json({
            data,
            success: true,
            message: "Team members retrieved successfully",
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

  router.get("/unique/:id", (req, res) => {
    try {
      let id = req.params.id;
      const query = "SELECT * FROM Meetings WHERE meeting_id = ?";
      connection.query(query,[id], (error, data) => {
        if (error) {
          throw error;
        } else {
          return res.json({
            data,
            success: true,
            message: "Team members retrieved successfully",
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


router.put("/update/:id", (req, res) => {
  try {
    const {
      meeting_name,
      start_time,
      end_time,
      meeting_date,
      meeting_status,
      fk_emp_id,
      fk_room_id,
      
      updated_by,
    } = req.body;
    const updated_at = new Date().toISOString().slice(0, 19).replace("T", " ");
    const { id } = req.params;
    const query =
      "UPDATE Meetings SET meeting_name = ?, start_time = ?, end_time = ?, meeting_date = ?, meeting_status = ?, fk_emp_id = ?, fk_room_id = ?, updated_at = ?, updated_by = ? WHERE meeting_id = ?";
    const values = [
      meeting_name,
      start_time,
      end_time,
      meeting_date,
      meeting_status,
      fk_emp_id,
      fk_room_id,
      updated_at,
      updated_by,
      id,
    ];
    connection.query(query, values, (error, data) => {
      if (error) {
        throw error;
      } else {
        if (data.affectedRows > 0) {
          return res.json({
            data,
            success: true,
            message: "Meeting updated succesfully",
          });
        } else {
          return res.json({
            data,
            success: false,
            message: "Meeting not found",
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
router.delete("/delete/:id", (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM Meetings WHERE meeting_id = " + id + "";
    connection.query(query, (error, data) => {
      if (error) {
        throw error;
      } else {
        if (data.affectedRows > 0) {
          return res.json({
            data,
            success: true,
            message: "Meeting deleted succesfully",
          });
        } else {
          return res.json({
            data,
            success: false,
            message: "Meeting not found",
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