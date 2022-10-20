require('dotenv').config();
const { Pool } = require('pg');
const { PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT } = process.env;

const pool = new Pool({
  PGUSER,
  PGHOST,
  PGDATABASE,
  PGPASSWORD,
  PGPORT,
});

const getTodos = function(id) {
  return pool
  .connect()
  .then(client => {
    return client
      .query(`SELECT * FROM todos WHERE user_id=${id}`)
      .then(res => {
        client.release();
        return res.rows;
      })
      .catch(err => {
        client.release();
        console.log(err.stack);
      })
  })
}

const createTodo = function(todo) {
  return pool
  .connect()
  .then(client => {
    return client
      .query(`
      INSERT INTO todos (user_id, task, description, category_id, start_time, end_time, completed, appointment)
      VALUES ('${todo.userID}', '${todo.taskName}', '${todo.description}', '${todo.category}', '${todo.start}', '${todo.end}', '${todo.completed}', '${todo.appointment}')
      `)
      .then(res => {
        client.release();
        return res.rows;
      })
      .catch(err => {
        client.release();
        console.log(err.stack);
      })
  })
}

const getCategories = function(id) {
  return pool
  .connect()
  .then(client => {
    return client
      .query(`SELECT * FROM categories WHERE user_id=${id}`)
      .then(res => {
        client.release();
        return res.rows;
      })
      .catch(err => {
        client.release();
        console.log(err.stack);
      })
  })
}

const createCategory = function(category) {
  return pool
  .connect()
  .then(client => {
    return client
      .query(`
      INSERT INTO categories (user_id, category, color)
      VALUES ('${category.userID}', '${category.category}', '${category.color}')
      `)
      .then(res => {
        client.release();
        return res.rows;
      })
      .catch(err => {
        client.release();
        console.log(err.stack);
      })
  })
}

module.exports = {
  pool,
  getTodos,
  createTodo,
  getCategories,
  createCategory
};