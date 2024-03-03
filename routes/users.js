var express = require("express");
const userModel = require("../models/user");
var router = express.Router();
const bcrypt = require("bcrypt");

/* GET users listing. */

// async function checkEmail(req, res, next) {
//   const exists = this.findOne({ email });

//   var email = req.body.Email;
//   var checkexitemail = userModel
//     .findOne({ email: email })
//     .exec()
//     .then((data) => {
//       if (data) {
//         // throw Error("Email already in use");

//         res.status(200).json({
//           msg: "User already registered.",
//           status: "danger",
//         });
//       }
//       next();
//     })
//     .catch((err) => {
//       res.status(400).json({
//         error:err,
//         msg: "User already registered.",
//         status: "danger",
//       });
//     });
// }

// router.get('/', function(req, res, next) {
//   const userDetails = new userModel({
//     name:"Sagar",
//     email:"sagar@123",
//     password:"sagar123"
//   })

//   userDetails.save().then((result)=>{
//     res.status(200).json({
//         new_User : result
//     })
// }).catch((err)=>{
//     res.status(500).json({
//         error:err
//     })
// })

// });

router.post("/register", (req, res, next) => {
  console.log("backend data", req.body);
  bcrypt.hash(req.body.Password, 10, (err, hash) => {
    if (err) {
      return res.status(400).json({
        msg: "Something Wrong, Try Later!",
        results: err,
      });
    } else {
      const userDetails = new userModel({
        // _id: new mongoose.Types.ObjectId(),
        // userType: req.body.userType,
        name: req.body.Name,
        email: req.body.Email,
        password: hash,
        role: "Author",
      });
      userDetails
        .save()
        .then((result) => {
          return res.status(200).json({
            msg: "User Created Successfully",
            status: "success",
            new_User: result,
          });
        })
        .catch((err) => {
          return res.status(404).json({
            error: err,
          });
        });
    }
  });
});

router.post("/login", function (req, res, next) {
  var email = req.body.Email;
  userModel
    .find({ email: email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        res.status(200).json({
          msg: "user Auth Failed",
          UserData: "",
          status: "error",
        });
      } else {
        bcrypt.compare(
          req.body.Password,
          user[0].password,
          function (err, result) {
            if (err) {
              res.json({
                msg: "Auth Failed",
                UserData: "",
                status: "error",
              });
            }
            if (result) {
              res.status(200).json({
                msg: "User Login Successfully",
                UserData: user,
                status: "success",
              });
            } else {
              res.json({
                msg: "Password Auth Failed",
                UserData: "",
                status: "error",
              });
            }
          }
        );
      }
    })
    .catch((err) => {
      res.json({
        error: err,
      });
    });
});

module.exports = router;
