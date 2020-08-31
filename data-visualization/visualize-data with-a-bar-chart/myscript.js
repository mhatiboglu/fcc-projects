let yMargin = 50,
  width = 1000,
  height = 500,
  barWidth = width / 275;

//Crete svg chart

let svgChart = d3.select(".chartHolder")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .style("background", "gray");
