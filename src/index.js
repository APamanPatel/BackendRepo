var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var con = require('./connectDB');
const register = require('./Routes/register');
const rooms = require('./Routes/rooms')
var app = express();

var connection = con.getConnection();
connection.connect(()=>{
    console.log("Connected to DB");
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

var port = process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log("Server lishening on port no 8080");
});

// import the modules

var profile = require("./Routes/Profiles");
app.use("/profile", profile);

app.use('/rooms', rooms);
app.use('/register', register);
var login = require("./Routes/login");
app.use("/login", login);
var create = require('./Routes/meeting');
app.use('/meeting',create);
