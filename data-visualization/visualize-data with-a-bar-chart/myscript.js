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
// Create tooltip
let tooltip = d3
  .select(".chartHolder")
  .append("div")
  .attr("id", "tooltip")
  .style("opacity", 0);

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
      .attr("transform", "translate(50, 510)")
      .attr("id", "x-axis");

    //////////////////////////////////
    ////////////  YSCALES  //////////
    ////////////////////////////////

    //Get datas from rawData
    let datasGDP = rawData.data.map((item) => item[1]);
    // console.log(datesGDP);
    let scaledGDP = [];
    // Calculate max and min GDP for y scale
    let gdpMin = d3.min(datasGDP);
    let gdpMax = d3.max(datasGDP);
    //Create scale for y
    let linearScale = d3
      .scaleLinear()
      .domain([0, gdpMax])
      .range([0, height]);

    scaledGDP = datasGDP.map((item) => linearScale(item));

    let yAxisScale = d3
      .scaleLinear()
      .domain([0, gdpMax])
      .range([height, 0]);
    //Add scales to axis
    let yAxis = d3.axisLeft(yAxisScale);
    //Append group and insert axis
    let yAxisGroup = svgChart
      .append("g")
      .call(yAxis)
      .attr("transform", "translate(50, 10)")
      .attr("id", "y-axis");

    //////////////////////////////////
    ////// CREATE BARS FOR GDP  //////
    /////////////////////////////////
    let years = rawData.data.map((item) => {
      let quarter;
      let temp = item[0].substring(5, 7);

      if (temp === "01") {
        quarter = "Q1";
      } else if (temp === "04") {
        quarter = "Q2";
      } else if (temp === "07") {
        quarter = "Q3";
      } else if (temp === "10") {
        quarter = "Q4";
      }

      return item[0].substring(0, 4) + " " + quarter;
    });
    let allYearsDate = rawData.data.map((item) => new Date(item[0]));
    d3.select("svg")
      .selectAll("rect")
      .data(scaledGDP)
      .enter()
      .append("rect")
      .attr("class", "bar")
      // Add date attribute
      .attr("data-date", (d, i) => {
        return rawData.data[i][0];
      })
      // Add GDP attribute
      .attr("data-gdp", (d, i) => {
        return rawData.data[i][1];
      })
      // Add x attribute rect
      .attr("x", (d, i) => xScale(allYearsDate[i]))
      // Add y attribute for rect
      .attr("y", (d, i) => height - d + 9)
      // Add bar width to all bar
      .attr("width", barWidth - 0.1)
      // Add bar height to all bar
      .attr("height", (d) => d)
      // Fill with color bars %80 and over with red and others black
      // %100% is 500 because of that we select 400 for %80
      .style("fill", (d, i) => {
        if (d < 400) {
          return "black";
        } else {
          return "red";
        }
      })
      // Because of the position of Axis we give transform attr for bars
      .attr("transform", "translate(50, 0)")
      //////////////////////////////////
      ////// CREATE tooltip when mouseover  //////
      /////////////////////////////////

      .on("mouseover", (d, i) => {
        tooltip
          .transition()
          .duration(250)
          .style("opacity", 0.8);
        tooltip
          .html(
            years[i] +
              "<br>" +
              "$" +
              datasGDP[i].toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,") +
              " Billion"
          )
          .attr("data-date", rawData.data[i][0])
          .style("left", i * barWidth + 30 + "px")
          .style("top", height - 100 + "px")
          .style("transform", "translateX(50px)");
      })
      .on("mouseout", (d) => {
        tooltip
          .transition()
          .duration(200)
          .style("opacity", 0);
      });
  }
);
