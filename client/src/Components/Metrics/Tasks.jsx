import React from "react";
import axios from "axios";

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newDuration: 0,
      show: false,
      test: false,
      updatedTime: false,
    };
  }

  // componentDidMount() {
  //   this.setState({ test: true });
  // }

  componentDidUpdate(prevProps) {
    // console.log("pp", prevProps.task.start_time);
    // Typical usage (don't forget to compare props):
    // if (this.props.updatedTime !== prevProps.task.start_time) {
    //   this.setState({ test: true });
    //   // this.fetchData(this.props.userID);
    // }
  }

  secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
  }

  timeCalc() {
    // var timeSpent;
    var firstDate = new Date(this.props.task.start_time);
    var secondDate = new Date(this.props.task.end_time);
    var firstDateInSeconds = firstDate.getTime() / 1000;
    var secondDateInSeconds = secondDate.getTime() / 1000;
    var difference = Math.abs(firstDateInSeconds - secondDateInSeconds);

    return this.secondsToHms(difference);
  }

  logNewTime(e) {
    // console.log("logNewTime: ", e, e.substring(0, e.length - 1));
    this.setState({ newDuration: e.substring(0, e.length - 1) });
  }

  updateDuration(todoID) {
    axios
      .get("/updateTaskDuration", {
        params: {
          newDuration: this.state.newDuration,
          todoID,
        },
      })
      .then((updatedData) => {
        this.props.timeUpdated(this.props.task.category);
        // this.setState({ updatedTime: true });
        // once data is updated, do component did mount/update to rerender table
      });
  }

  render() {
    // console.log("proppp", this.props);
    return (
      <tr>
        <td> {this.props.task.task}</td>
        <td>{this.props.task.category}</td>
        <td
          onClick={(e) => {
            e.stopPropagation();
            this.setState({ show: true });
          }}
          contentEditable
          onInput={(e) => {
            // console.log("tarr", e);
            this.logNewTime(e.target.firstChild.data);
          }}
        >
          {this.timeCalc()}
          {this.state.show ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                this.updateDuration(this.props.task.todo_id);
                this.setState({ show: false });
              }}
            >
              Update
            </button>
          ) : (
            // shoudl there be a remove task btn
            ""
          )}
        </td>
      </tr>
    );
  }
}

// const Tasks = (props) => {
//   // var timeSpent;
//   // var firstDate = new Date(props.task.start_time);
//   // var secondDate = new Date(props.task.end_time);
//   // var firstDateInSeconds = firstDate.getTime() / 1000;
//   // var secondDateInSeconds = secondDate.getTime() / 1000;
//   // var difference = Math.abs(firstDateInSeconds - secondDateInSeconds);

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

export default Tasks;
