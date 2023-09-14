const express = require('express');
const router = express.Router();
const knex = require("../db/knex");


router.get('/', function(req, res, next) {
  res.render('signup', {
    title: 'Sign Up'
  });
});

router.post('/' , function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const repassword = req.body.repassword;

  knex("users")
    .where({name: username})
    .select("*")
    .then(function(result) {
      if(result.length !==0) {
        res.render("signup", {
          title: "Sign Up",
          errorMessage: ["This user name has been already registered."]
        })
      } else if(password === repassword) {
        knex("users")
          .insert({name: username, password: password})
          .then(function (){
            res.redirect("/");
          })
          .catch(function(err) {
            res.render("signupb", {
              title: "Sign Up",
              errorMessage: [err.sqlMessage]
            });
          });
      } else {
        res.render("signup", {
          title: "Sign Up",
          errorMessage: ["Passwords do not match"]
        });
      }
    })
    .catch(function(err) {
      console.error(err);
      res.render("signup", {
        title: "Sign Up",
        errorMessage: [err.sqlMessage]
      })
    })
});

module.exports = router;