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
      returning todo_id`)
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

const deleteTodo = function(todoID) {
  return pool
  .connect()
  .then(client => {
    return client
      .query(`
      DELETE FROM todos WHERE todo_id = ${todoID}
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

const bookAppointment = function(id) {
  return pool
  .connect()
  .then(client => {
    return client
    .query(`UPDATE todos SET appointment=false WHERE todo_id=${id.selectedEventID}`)
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

const getAppointments = function(id) {
  return pool
  .connect()
  .then(client => {
    return client
      .query(`SELECT * FROM todos WHERE user_id=${id} and appointment=true`)
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

const setStartTime = function(todo_id, startTime) {
  return pool
  .connect()
  .then(client => {
    let time = startTime.includes('T') ? startTime.slice(0, 10).concat(' ', startTime.slice(11, 19)) : startTime;
    let timestamp = time.length === 10 ? `'${time}','yyyy-mm-dd'` : `'${time}','yyyy-mm-dd HH24:MI:SS'`;
    return client
      .query(`
      UPDATE todos SET start_time=TO_TIMESTAMP(${timestamp})
      WHERE todo_id=${todo_id}
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
  deleteTodo,
  getCategories,
  createCategory,
  bookAppointment,
  getAppointments,
  setStartTime
};