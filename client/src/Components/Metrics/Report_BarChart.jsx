import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
  BarElement,
} from "chart.js";
import { Pie, Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  // Title,
  Tooltip,
  Legend
);

export function ReportBarChart(props) {
  // console.log("pro", props);

  var chartLegend = [];
  var chartColors = [];
  for (var cat of props.data.categoriesANDcolor) {
    if (!chartLegend.includes(cat[0])) {
      chartLegend.push(cat[0]);
      chartColors.push(cat[1]);
    }
  }

  var catgDurations = {};
  for (let key of props.data.categories) {
    if (key !== "All") {
      catgDurations[key] = [];
    }
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
  var barChartData = [];
  for (let catg in catgDurations) {
    let catgTotalSec = 0;

    for (let i = 0; i < catgDurations[catg].length; i++) {
      var start = new Date(catgDurations[catg][i][0]);
      var end = new Date(catgDurations[catg][i][1]);

      var start_sec = start.getTime() / 1000;
      var end_sec = end.getTime() / 1000;
      var difference = Math.abs(start_sec - end_sec);
      barChartData.push(difference / 60);
      catgTotalSec += difference;
    }
    // catgDurations[catg].push(difference);

    catgDurations[catg].totalSec = catgTotalSec;
    chartData.push(catgTotalSec);
    catgDurations[catg].totalDuration = secondsToHms(catgTotalSec);
    totalTimeSpent += catgTotalSec;
  }
  catgDurations.totalTimeSpent = totalTimeSpent;
  // const labels = Utils.months({ count: 7 });

  // console.log("xx", catgDurations, barChartData);

  var labels = [];
  for (let i = 0; i < props.data.allData.length; i++) {
    labels.push(props.data.allData[i].task);
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: `${props.data.category}`,
        data: barChartData,
        // backgroundColor: [
        //   "rgba(255, 99, 132, 0.2)",
        //   "rgba(255, 159, 64, 0.2)",
        //   "rgba(255, 205, 86, 0.2)",
        // ],
        // borderColor: [
        //   "rgb(255, 99, 132)",
        //   "rgb(255, 159, 64)",
        //   "rgb(255, 205, 86)",
        // ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: "Time (Min)",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
}
