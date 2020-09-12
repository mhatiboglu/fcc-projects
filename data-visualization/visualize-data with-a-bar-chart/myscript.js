let yMargin = 50,
  width = 1000,
  height = 500,
  barWidth = width / 275;

//Crete svg chart

let svgChart = d3
  .select(".chartHolder")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .style("background", "gray");

// get raw data from url
d3.json(
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json",
  function(error, rawData) {
    console.log(rawData);
    if (error) return console.warn(error);
  }
);
