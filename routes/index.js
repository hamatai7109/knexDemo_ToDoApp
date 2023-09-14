const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hamatai',
  password: 'Hamatai@7109',
  database: 'todo_app'
})

router.get('/', function (req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);

  knex("tasks")
    .select("*")
    .then(function(results) {
      console.log(results);
      res.render('index', {
        title: 'ToDo App',
        todoList: results,
        isAuth: isAuth
      });
    })
    .catch(function(err) {
      console.log(err);
      res.render('index', {
        title: 'ToDo App',
        isAuth: isAuth
      })
    })
});

router.post('/', function (req, res, next) {
  const userId = req.session.userId;
  const isAuth = Boolean(userId);
  const todo = req.body.add;
  knex("tasks")
    .insert({user_id: 1, content: todo})
    .then(function() {
      res.redirect('/')
    })
    .catch(function(err) {
      console.log(err);
      res.render('index', {
        title: 'ToDo App',
        isAuth: isAuth
      })
    })
});

router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/logout', require('./logout'));

module.exports = router;