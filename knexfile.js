// Update with your config settings.

module.exports = {

  development: {
    client: "mysql",
    connection: {
      database: "todo_app",
      user: "hamatai",
      password: "Hamatai@7109",
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  staging: {
    client: "mysql",
    connection: {
      database: "todo_app",
      user: "hamatai",
      password: "Hamatai@7109",
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  production: {
    client: "mysql",
    connection: {
      database: "todo_app",
      user: "hamatai",
      password: "Hamatai@7109",
    },
    pool: {
      min: 2,
      max: 10
    },
  }

};