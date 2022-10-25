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
          <thead>
            <tr>
              <th style={{ fontWeight: "bold" }}>
                <div>Task</div>
              </th>
              <th style={{ fontWeight: "bold" }}>
                <div>Category</div>
              </th>
              <th style={{ fontWeight: "bold" }}>
                <div>Duration</div>
              </th>
            </tr>
            {this.props.data.map((task, index) => (
              <Tasks
                task={task}
                key={index}
                timeUpdated={this.props.timeUpdated}
                totalTimeCompletingTasks={this.props.totalTimeCompletingTasks}
              />
            ))}
          </thead>
        </table>
      </div>
    );
  }
}

export default ReportTable;
