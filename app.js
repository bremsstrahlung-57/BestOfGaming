const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contactBOG');
const port = 8000;


//MONGOOSE SCHEMA
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    age: String,
    desc: String,
});
var Contact = mongoose.model('Contact', contactSchema);


//EXPRESS SPECIFIC STUFF
app.use(express.static('static'))
app.use("/static", express.static("static"));
app.use(express.urlencoded());


//PUG SPECIFIC STUFF
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


//ENDPOINTS
app.get("/", (req, res) => {
    const parms = {};
    res.status(200).render("index.pug", parms);
});
app.get("/contact", (req, res) => {
    const parms = {};
    res.status(200).render("contact.pug", parms);
});
app.post("/contact", (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This Item Has Been Saved To The DataBase")
    }).catch(()=>{
        res.status(400).send("Item Can't Be Saved")
    });
    // res.status(200).render("contact.pug");
});
app.get("/signin", (req, res) => {
    const parms = {};
    res.status(200).render("signin.pug", parms);
});
app.get("/register", (req, res) => {
    const parms = {};
    res.status(200).render("register.pug", parms);
});


//START SERVER
app.listen(port, () => {
    console.log(`This application has started succesfully on port ${port}`);
  });
  