var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var User = require("./models/User");
// db here
var db = require("./mysetup/myurl").myurl;

var app = express();
// port here
var port = process.env.PORT || 3000;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// db config
mongoose
  .connect(db)
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log("Error is ", err.message);
  });
// stuts check here
app.get("/", (req, res) => {
  res.status(200).send(`Hi Welcome to the Login and Signup API`);
});

// Signup root

app.post("/signup", async (req, res) => {
    var newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
  
    await User.findOne({ name: newUser.name })
      .then(async profile => {
        if (!profile) {
          await newUser
            .save()
            .then(() => {
              res.status(200).send(newUser);
            })
            .catch(err => {
              console.log("Error is ", err.message);
            });
        } else {
          // if user have account then show this messege
          res.send("User already exists...");
        }
      })
      .catch(err => {
        console.log("Error is", err.message);
      });
  });

  // login root 
app.post("/login", async (req, res) => {
    var newUser = {};
    newUser.name = req.body.name;
    newUser.password = req.body.password;
  // if user put wrong account then show this messege
    await User.findOne({ name: newUser.name })
      .then(profile => {
        if (!profile) {
          res.send("User not exist");
        } else {
          //// if user put right account then show this messege
          if (profile.password == newUser.password) {
            res.send("User authenticated");
          } else {
            res.send("User Unauthorized Access");
          }
        }
      })
      .catch(err => {
        console.log("Error is ", err.message);
      });
  });
// here server
app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});