const express = require('express');
const router = express.Router();
const knex = require("../db/knex");
const bcrypt = require("bcrypt");


router.get('/', function(req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  res.render('signup', {
    title: 'Sign Up',
    isAuth: isAuth,
  });
});

router.post('/' , function(req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  const username = req.body.username;
  const password = req.body.password;
  const repassword = req.body.repassword;

  knex("users")
    .where({name: username})
    .select("*")
    .then(async function(result) {
      if(result.length !==0) {
        res.render("signup", {
          title: "Sign Up",
          isAuth: isAuth,
          errorMessage: ["This user name has been already registered."]
        })
      } else if(password === repassword) {
        const hashedPassword = await bcrypt.hash(password, 10);
        knex("users")
          .insert({name: username, password: hashedPassword})
          .then(function (){
            res.redirect("/");
          })
          .catch(function(err) {
            res.render("signup", {
              title: "Sign Up",
              isAuth: isAuth,
              errorMessage: [err.sqlMessage]
            });
          });
      } else {
        res.render("signup", {
          title: "Sign Up",
          errorMessage: ["Passwords do not match"],
          isAuth: isAuth,
        });
      }
    })
    .catch(function(err) {
      console.error(err);
      res.render("signup", {
        title: "Sign Up",
        isAuth: isAuth,
        errorMessage: [err.sqlMessage]
      })
    })
});

module.exports = router;