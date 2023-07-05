const mysql = require('mysql');

const config = {
    host: "localhost",
    user: "root",
    password: "Aman_074#",
    database: "RoomBookingSystem"
}

const getConnection = () => {
    return mysql.createConnection(config);
}

module.exports = {getConnection}