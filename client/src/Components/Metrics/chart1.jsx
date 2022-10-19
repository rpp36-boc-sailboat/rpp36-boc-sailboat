import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, Doughnut } from "react-chartjs-2";

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
  // console.log("pro", props.data.allData);

  var chartLegend = [];
  var chartColors = [];
  for (var cat of props.data.categoriesANDcolor) {
    if (!chartLegend.includes(cat[0])) {
      chartLegend.push(cat[0]);
      chartColors.push(cat[1]);
    }
  }

  // if (props.data.category !== "") {
  //   // filter chart by cat
  // }

  // calculate pie chart data
  // sum duration for each category (say 2 meetings = 1 + 30 =1 hr and 30min)
  var catgDurations = {};
  for (let key of props.data.categories) {
    catgDurations[key] = [];
  }

  for (let key in catgDurations) {
    for (let i = 0; i < props.data.allData.length; i++) {
      if (key === props.data.allData[i].category) {
        catgDurations[key].push([
          props.data.allData[i].start_time,
          props.data.allData[i].end_time,
        ]);
      }
    }
  }

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

  var totalTimeSpent = 0;
  var chartData = [];
  for (let catg in catgDurations) {
    let catgTotalSec = 0;

    for (let i = 0; i < catgDurations[catg].length; i++) {
      var start = new Date(catgDurations[catg][i][0]);
      var end = new Date(catgDurations[catg][i][1]);

      var start_sec = start.getTime() / 1000;
      var end_sec = end.getTime() / 1000;
      var difference = Math.abs(start_sec - end_sec);
      catgTotalSec += difference;
    }

    catgDurations[catg].totalSec = catgTotalSec;
    chartData.push(catgTotalSec);
    catgDurations[catg].totalDuration = secondsToHms(catgTotalSec);
    totalTimeSpent += catgTotalSec;
  }
  catgDurations.totalTimeSpent = totalTimeSpent;

  console.log("OO", catgDurations, chartData);

  // get total hours spent ( sum of all durations taken)
  // feed into dataset.data, the fraction of each cat (total/cat duration)

  const data = {
    labels: chartLegend,
    datasets: [
      {
        data: chartData,
        backgroundColor: chartColors,
        borderWidth: 1,
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.label;
              let value = context.raw;
              if (!label) label = "Unknown";
              let sum = 0;
              let dataArr = context.chart.data.datasets[0].data;
              dataArr.map((data) => {
                sum += Number(data);
              });
              let percentage = ((value * 100) / sum).toFixed(0) + "%";
              return label + ": " + percentage;
            },
          },
        },
      },
    ],
  };

  return <Pie data={data} />;
}
