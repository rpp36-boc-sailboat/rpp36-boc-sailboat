const pool = require("../db/postgres.js");

const findAllToDos_TR = (timeRange, catg, cb) => {
  let findAllToDosQuery;
  let currDate = new Date().toLocaleString().split(",")[0];
  let nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
    .toLocaleString()
    .split(",")[0];

  if (catg === "All") {
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
  } else {
    if (timeRange === "Today") {
      findAllToDosQuery = `SELECT * from todos
    LEFT JOIN public.categories
    ON todos.category_id=public.categories.category_id
    where start_time > '${currDate}' and start_time < '${nextDay}'
    AND todos.completed = 'true'
    AND categories.category = '${catg}';`;
    } else if (timeRange === "This Week") {
      findAllToDosQuery = `SELECT *
    FROM todos
    LEFT JOIN public.categories
    ON todos.category_id=public.categories.category_id
    WHERE date_trunc('week',start_time) = date_trunc('week',CURRENT_TIMESTAMP)
    AND todos.completed = 'true'
    AND categories.category = '${catg}';`;
    } else if (timeRange === "This Month") {
      findAllToDosQuery = `SELECT *
    FROM todos
    LEFT JOIN public.categories
    ON todos.category_id=public.categories.category_id
    WHERE date_trunc('month',start_time) = date_trunc('month',CURRENT_TIMESTAMP)
    AND todos.completed = 'true'
    AND categories.category = '${catg}';`;
    }
  }

  pool.query(findAllToDosQuery, (err, result) => {
    if (err) {
      cb(err);
    } else {
      cb(null, result.rows);
    }
  });
};

const findAllPerCategory = (category, timeRange, cb) => {
  let findAllToDosQuery;
  let currDate = new Date().toLocaleString().split(",")[0];
  let nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
    .toLocaleString()
    .split(",")[0];

  if (category === "All") {
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

    // let findAllPerCategoryQuery = `SELECT * from todos
    // LEFT JOIN public.categories
    // ON todos.category_id=public.categories.category_id
    // where todos.completed = 'true'`;

    pool.query(findAllToDosQuery, (err, result) => {
      if (err) {
        cb(err);
      } else {
        cb(null, result.rows);
      }
    });
  } else {
    if (timeRange === "Today") {
      findAllToDosQuery = `SELECT * from todos
    LEFT JOIN public.categories
    ON todos.category_id=public.categories.category_id
    where start_time > '${currDate}' and start_time < '${nextDay}'
    AND todos.completed = 'true'
    AND categories.category = '${category}';`;
    } else if (timeRange === "This Week") {
      findAllToDosQuery = `SELECT *
    FROM todos
    LEFT JOIN public.categories
    ON todos.category_id=public.categories.category_id
    WHERE date_trunc('week',start_time) = date_trunc('week',CURRENT_TIMESTAMP) AND todos.completed = 'true'
    AND categories.category = '${category}';`;
    } else if (timeRange === "This Month") {
      findAllToDosQuery = `SELECT *
    FROM todos
    LEFT JOIN public.categories
    ON todos.category_id=public.categories.category_id
    WHERE date_trunc('month',start_time) = date_trunc('month',CURRENT_TIMESTAMP) AND todos.completed = 'true'
    AND categories.category = '${category}';`;
    }

    // let findAllPerCategoryQuery = `SELECT * from todos
    //   LEFT JOIN public.categories
    //   ON todos.category_id=public.categories.category_id
    //   where categories.category = '${category}' AND todos.completed = 'true'`;

    pool.query(findAllToDosQuery, (err, result) => {
      if (err) {
        cb(err);
      } else {
        cb(null, result.rows);
      }
    });
  }
};

// module.exports.findAllCategories = findAllCategories;
module.exports.findAllPerCategory = findAllPerCategory;
module.exports.findAllToDos_TR = findAllToDos_TR;
