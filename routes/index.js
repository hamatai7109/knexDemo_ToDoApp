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
  knex("tasks")
    .select("*")
    .then(function(results) {
      console.log(results);
      res.render('index', {
        title: 'ToDo App',
        todoList: results
      });
    })
    .catch(function(err) {
      console.log(err);
      res.render('index', {
        title: 'ToDo App'
      })
    })
});

router.post('/', function (req, res, next) {
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
      })
    })
});

module.exports = router;