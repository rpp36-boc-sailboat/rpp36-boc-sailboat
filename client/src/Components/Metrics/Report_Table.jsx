import React from "react";

const ReportTable = (props) => {
  // console.log("zz", props.data);
  return (
    <div>
      <div>
        <table>
          <tbody>
            <tr>
              <td style={{ fontWeight: "bold" }}>
                <div>Task</div>
              </td>
              <td style={{ fontWeight: "bold" }}>
                <div>Category</div>
              </td>
              <td style={{ fontWeight: "bold" }}>
                <div>Duration</div>
              </td>
            </tr>
            {props.data.map((task, index) => (
              <Tasks task={task} key={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Tasks = (props) => {
  var timeSpent;

  var firstDate = new Date(props.task.start_time);
  var secondDate = new Date(props.task.end_time);
  var firstDateInSeconds = firstDate.getTime() / 1000;
  var secondDateInSeconds = secondDate.getTime() / 1000;
  var difference = Math.abs(firstDateInSeconds - secondDateInSeconds);

  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
  }
  timeSpent = secondsToHms(difference);

  return (
    <tr>
      <td>{props.task.task}</td>
      <td>{props.task.category}</td>
      <td>{timeSpent}</td>
    </tr>
  );
};

export default ReportTable;
