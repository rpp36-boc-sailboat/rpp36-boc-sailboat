import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function ReportPieChart(props) {
  // console.log("pro", props.data);
  // console.log("here");

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

  // console.log("xx", catgDurations);

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

  return (
    <Pie
      data={data}
      // options={{ responsive: true, maintainAspectRatio: true }}
    />
  );
}
