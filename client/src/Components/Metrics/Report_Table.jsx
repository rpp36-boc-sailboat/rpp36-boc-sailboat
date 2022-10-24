import React from "react";
import Tasks from "./Tasks.jsx";

// Just for development mode, temporarily hide warnings/errs to clearly see
// console.logs. REMOVE AFTER logs have been observed.
console.warn = console.error = () => {};

class ReportTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // show: false,
    };
  }

  render() {
    return (
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
            {this.props.data.map((task, index) => (
              <Tasks
                task={task}
                key={index}
                timeUpdated={this.props.timeUpdated}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

// const Tasks = (props) => {
//   var timeSpent;
//   var firstDate = new Date(props.task.start_time);
//   var secondDate = new Date(props.task.end_time);
//   var firstDateInSeconds = firstDate.getTime() / 1000;
//   var secondDateInSeconds = secondDate.getTime() / 1000;
//   var difference = Math.abs(firstDateInSeconds - secondDateInSeconds);

//   function secondsToHms(d) {
//     d = Number(d);
//     var h = Math.floor(d / 3600);
//     var m = Math.floor((d % 3600) / 60);
//     var s = Math.floor((d % 3600) % 60);

//     var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
//     var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
//     var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
//     return hDisplay + mDisplay + sDisplay;
//   }
//   timeSpent = secondsToHms(difference);

//   function timeUpdater() {
//     console.log("final time", x);
//   }
//   var x;
//   var show = false;
//   function updateDuration(e) {
//     // console.log("new incoming time", e);
//     x = e;
//   }
//   return (
//     <tr>
//       <td>{props.task.task}</td>
//       <td>{props.task.category}</td>
//       <td
//         onClick={() => {
//           show = true;
//           console.log("sss", show);
//         }}
//         contentEditable
//         onInput={(e) => {
//           // console.log("xx xx", e.target.innerText);
//           updateDuration(e.target.innerText);
//           // alert("xxx");
//           // <ChangeDuration />;
//         }}
//       >
//         {timeSpent}
//       </td>
//       {show ? (
//         <button
//           onClick={() => {
//             timeUpdater();
//           }}
//         >
//           Update
//         </button>
//       ) : (
//         ""
//       )}
//       {/* <button
//         onClick={() => {
//           timeUpdater();
//         }}
//       >
//         Update
//       </button> */}
//     </tr>
//   );
// };

// const ChangeDuration = (props) => {
//   return <div>testt</div>;
// };

export default ReportTable;
