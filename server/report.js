const pool = require("../db/postgres.js");

// const findAllCategories = (cb) => {
//   let findAllCategoriesQuery = `SELECT * from categories`;

//   pool.query(findAllCategoriesQuery, (err, result) => {
//     if (err) {
//       cb(err);
//     } else {
//       cb(null, result.rows);
//     }
//   });
// };

// const findAllToDos = (cb) => {
//   let findAllToDosQuery = `SELECT * from todos`;

//   pool.query(findAllToDosQuery, (err, result) => {
//     if (err) {
//       cb(err);
//     } else {
//       cb(null, result.rows);
//     }
//   });
// };

const findAllToDos_TR = (timeRange, cb) => {
  let findAllToDosQuery;
  let currDate = new Date().toLocaleString().split(",")[0];
  let nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
    .toLocaleString()
    .split(",")[0];

  if (timeRange === "Today") {
    findAllToDosQuery = `SELECT * from todos
    LEFT JOIN public.categories
    ON todos.category_id=public.categories.category_id
    where start_time > '${currDate}' and start_time < '${nextDay}' AND todos.completed = 'true';`;
  } else if (timeRange === "This Week") {
    findAllToDosQuery = `SELECT *
    FROM todos
    LEFT JOIN public.categories
    ON todos.category_id=public.categories.category_id
    WHERE date_trunc('week',start_time) = date_trunc('week',CURRENT_TIMESTAMP) AND todos.completed = 'true';`;
  } else if (timeRange === "This Month") {
    findAllToDosQuery = `SELECT *
    FROM todos
    LEFT JOIN public.categories
    ON todos.category_id=public.categories.category_id
    WHERE date_trunc('month',start_time) = date_trunc('month',CURRENT_TIMESTAMP) AND todos.completed = 'true';`;
  }

  pool.query(findAllToDosQuery, (err, result) => {
    if (err) {
      cb(err);
    } else {
      cb(null, result.rows);
    }
  });
};

// module.exports.findAllCategories = findAllCategories;
// module.exports.findAllToDos = findAllToDos;
module.exports.findAllToDos_TR = findAllToDos_TR;
