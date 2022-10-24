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

const updateTaskDuration = (newDuration, todoID, cb) => {
  // console.log("dur", newDuration);
  if (newDuration !== 0) {
    let timeSplit = newDuration.split(" ");
    // console.log("timeSplit", timeSplit);

    if (timeSplit.length === 5 || timeSplit.length === 4) {
      if (
        Number(timeSplit[0]) >= 0 &&
        (timeSplit[1] === "hour" || timeSplit[1] === "hours") &&
        Number(timeSplit[2]) >= 0 &&
        Number(timeSplit[2]) <= 60 &&
        (timeSplit[3] === "minute" ||
          timeSplit[3] === "minutes" ||
          timeSplit[3] === "minute " ||
          timeSplit[3] === "minutes ")
      ) {
        let newDurInMin = Number(timeSplit[0]) * 60 + Number(timeSplit[2]);

        let findStartTime = `SELECT * from todos
        where todo_id =  '${todoID}' `;
        pool.query(findStartTime, (err, result) => {
          if (err) {
            cb(err);
          } else {
            function addHours(numOfHours, date = new Date()) {
              date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
              return date;
            }

            let new_endTime = addHours(
              newDurInMin / 60,
              new Date(result.rows[0].start_time)
            );

            // let pg_startTime = new Date(
            //   result.rows[0].start_time
            // ).toISOString();

            // let oldEndTIme = new Date(result.rows[0].end_time).toISOString();

            // let pg_endTime = new Date(new_endTime).toISOString();

            var tzoffset = new Date(new_endTime).getTimezoneOffset() * 60000; //offset in milliseconds

            new_endTime = new Date(new Date(new_endTime) - tzoffset)
              .toISOString()
              .slice(0, -1);

            // console.log("start", result.rows[0].start_time, pg_startTime);

            // console.log("old End", oldEndTIme);

            // console.log("new End", new_endTime, xxx);
            // console.log("w", xxx);

            // let updateTimeQuery = `Update todos Set start_time='${pg_startTime}', end_time='${pg_endTime}' where todo_id = '${todoID}' RETURNING todos`;
            let updateTimeQuery = `Update todos Set end_time='${new_endTime}' where todo_id = '${todoID}' RETURNING todos`;

            pool.query(updateTimeQuery, (err, result) => {
              if (err) {
                console.log("errr", err);
                cb(err);
              } else {
                // console.log("pppp", result.rows);
                cb(null, result.rows);
              }
            });
          }
        });
      }
    } else if (timeSplit.length === 2) {
      console.log("here");
      // can be num+hr
      // can be num+min
    }
  }

  // pool.query(findAllToDosQuery, (err, result) => {
  //   if (err) {
  //     cb(err);
  //   } else {
  //     cb(null, result.rows);
  //   }
  // });
};

module.exports.updateTaskDuration = updateTaskDuration;
module.exports.findAllPerCategory = findAllPerCategory;
module.exports.findAllToDos_TR = findAllToDos_TR;
