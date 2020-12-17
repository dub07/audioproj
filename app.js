//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');



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
  u_Address1: String,
  u_Address2: String,
  u_City: String,
  u_State: String,
  u_Zip: Number
};

const Register = mongoose.model("Register", registerSchema);

app.get("/", function(req, res) {
  res.render("home");
});



//3lo Authentication
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: 'vd93451@gmail.com',
        clientId: '730317368718-45sttrs4uepl9vqhbqamqjjflb3vh7sd.apps.googleusercontent.com',
        clientSecret: 'IxVKfhHGtMiezD-pKaDMPhgd',
        refreshToken: '1//04RV3dlbG9coYCgYIARAAGAQSNwF-L9IrJPujU_9VQ8IgLYS8hSC8m0qWRofBo18BMrmZoUbFLzueFiePl3U1K8dEE3OtuZ7T5iY',
        accessToken: 'ya29.a0AfH6SMD0tvV9qvmZaAOJs5irp712bCya2fTXV6ZYY9qxjFosDWCHNAAbZtasqPY7CZMRXTJy5QFHbZCJz9zNR-VcHhqOfJfOTBlfvqD8J9sCa2ETEo-MDHS3mRnlXejEbzTRu4zHlUX9IvxQ6kpeKB74JHsmg3InU1k',
    }
});


//var transporter = nodemailer.createTransport({
//  service: 'gmail',
//  auth: {
//    user: '',
//    pass: ''
//  }
//});

app.post("/register", function(req, res){
  const register = new Register({
    f_Name: req.body.firstName,
    l_Name: req.body.lastName,
    e_Mail: req.body.email_id,
    u_Address1: req.body.address_1,
    u_Address2: req.body.address_2,
    u_City: req.body.address_city,
    u_State: req.body.address_state,
    u_Zip: req.body.address_zip
    });


    register.save(function(err){
      if (!err){
          res.redirect("/");
      }
    });

    const mailOptions = {
      from: 'vd93451@gmail.com',
      to: req.body.email_id,
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});


  });

  app.get("/about", function(req, res) {
    res.render("About");
  });


//Connect to Server
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
