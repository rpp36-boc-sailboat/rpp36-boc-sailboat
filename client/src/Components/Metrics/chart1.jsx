import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// export const data = {
//   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//   datasets: [
//     {
//       label: "# of Votes",
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         "rgba(255, 99, 132, 0.2)",
//         "rgba(54, 162, 235, 0.2)",
//         "rgba(255, 206, 86, 0.2)",
//         "rgba(75, 192, 192, 0.2)",
//         "rgba(153, 102, 255, 0.2)",
//         "rgba(255, 159, 64, 0.2)",
//       ],
//       borderColor: [
//         "rgba(255, 99, 132, 1)",
//         "rgba(54, 162, 235, 1)",
//         "rgba(255, 206, 86, 1)",
//         "rgba(75, 192, 192, 1)",
//         "rgba(153, 102, 255, 1)",
//         "rgba(255, 159, 64, 1)",
//       ],
//       borderWidth: 1,
//     },
//   ],
// };

export function TestChart(props) {
  console.log("pro", props.data);

  var chartLegend = [];
  var chartColors = [];
  for (var cat of props.data.categoriesANDcolor) {
    if (!chartLegend.includes(cat[0])) {
      chartLegend.push(cat[0]);
      chartColors.push(cat[1]);
    }
  }

  if (props.data.category !== "") {
    // filter chart by cat
  }

  const data = {
    labels: chartLegend,
    datasets: [
      {
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: chartColors,
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
}
