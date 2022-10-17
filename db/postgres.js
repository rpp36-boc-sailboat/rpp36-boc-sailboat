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

const getTodos = function() {
  return pool
  .connect()
  .then(client => {
    return client
      .query('SELECT * FROM todos limit 5')
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
  console.log('THIS IS THE DATABASE: ', todo);
  return pool
  .connect()
  .then(client => {
    return client
      .query(`
      INSERT INTO todos (task, description, category_id, start_time, end_time, completed, appointment)
      VALUES ('${todo.taskName}', '${todo.description}', '${todo.category}', '${todo.start}', '${todo.end}', '${todo.completed}', '${todo.appointment}')
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
  createTodo
};