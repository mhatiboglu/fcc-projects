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
// Get raw data from url
d3.json(
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json",
  function(error, rawData) {
    if (error) return console.warn(error);
    console.log(rawData);
    console.log("test");

    //////////////////////////////////
    ////////////  XAXIS  ////////////
    ////////////////////////////////

    // Calculate max and min years for x scale
    maxDate = new Date(rawData.to_date);
    minDate = new Date(rawData.from_date);
    console.log(minDate.getFullYear(), maxDate.getFullYear());
      //maxDate : 2015 minDate :1947

    //Create scale for x
    let xScale = d3
      .scaleTime()
      .domain([minDate, maxDate])
      .range([0, width]);
    //Add scales to axis
    let xAxis = d3.axisBottom().scale(xScale);

    // Append group and insert axis
    let xAxisGroup = svgChart
      .append("g")
      .call(xAxis)
      .attr("transform", "translate(50, 500)");

  }
);
