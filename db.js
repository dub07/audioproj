//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

//database
mongoose.connect("mongodb://localhost:27017/learnDB", {useNewUrlParser: true, useUnifiedTopology: true });

const registerSchema = {
  f_Name: String,
  l_Name: String,
  e_Mail: String,
  u_Adress1: String,
  u_Address2: String,
  u_City: String,
  u_State: String,
  u_Zip: Number
};

const Register = mongoose.model("Register", registerSchema);

//Connect to Server
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
