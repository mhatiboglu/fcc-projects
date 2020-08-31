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

// fetch raw data from url 
let rawData;
fetch(
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json"
).then((response)=> {
    response.text().then((text)=>{
        rawData=text;
        console.log(rawData);
    })
})
