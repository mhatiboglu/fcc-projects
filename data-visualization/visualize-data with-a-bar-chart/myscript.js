let yMargin = 50,
  width = 1000,
  height = 500,
  barWidth = width / 275;

//Crete svg chart

let svgChart = d3
  .select(".chartHolder")
  .append("svg")
  .attr("width", width + 100)
  .attr("height", height + 60)
  .style("background", "gray");



let minDate, maxDate;
// get raw data from url
d3.json(
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json",
  function(error, rawData) {
    if (error) return console.warn(error);
    console.log(rawData);
    console.log("test");

  

    // calculate max and min years for x scale
    maxDate = new Date(data.to_date);
    minDate = new Date(data.from_date);
    
    
   
  }
);
