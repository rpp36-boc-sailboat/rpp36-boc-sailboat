const pool = require("../db/postgres.js");

const findAllCategories = (cb) => {
  let findAllCategoriesQuery = `SELECT * from categories`;

  pool.query(findAllCategoriesQuery, (err, result) => {
    if (err) {
      cb(err);
    } else {
      cb(null, result.rows);
    }
  });
};

const findAllToDos = (cb) => {
  let findAllToDosQuery = `SELECT * from todos`;

  pool.query(findAllToDosQuery, (err, result) => {
    if (err) {
      cb(err);
    } else {
      cb(null, result.rows);
    }
  });
};

const findAllToDos_TR = (timeRange, cb) => {
  let findAllToDosQuery = `SELECT * from todos`;

  pool.query(findAllToDosQuery, (err, result) => {
    if (err) {
      cb(err);
    } else {
      cb(null, result.rows);
    }
  });
};

module.exports.findAllCategories = findAllCategories;
module.exports.findAllToDos = findAllToDos;
module.exports.findAllToDos_TR = findAllToDos_TR;
