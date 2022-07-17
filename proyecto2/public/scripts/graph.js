const priceSection = document.getElementById("priceGraph");
const sections = document.getElementsByTagName("section");


let totalHeigth = function () {
  let sum = 0
  for (let i = 0; i < sections.length; i++)sum += sections[i].clientHeight;
  return sum;
};

const margin = {top: 50, right: 50, bottom: 100, left: 50};
let width = priceSection.clientWidth - margin.left - margin.right;
let height = window.innerHeight - totalHeigth() + priceSection.parentNode.clientHeight - margin.top - margin.bottom;

window.addEventListener("resize", () => {
  width = priceSection.clientWidth - margin.left - margin.right;
  height = window.innerHeight - totalHeigth() + priceSection.parentNode.clientHeight - margin.top - margin.bottom;

  draw(globalPriceData);

}

);



function draw(data) {
  priceSection.innerHTML = "";
  const x = techan.scale.financetime()
    .range([0, width]);

  const y = d3.scaleLinear()
    .range([height, 0]);

  const candlestick = techan.plot.candlestick()
    .xScale(x)
    .yScale(y);

  const xAxis = d3.axisBottom()
    .scale(x);

  const yAxis = d3.axisLeft()
    .scale(y);


  const svg = d3.select("#priceGraph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // const accessor = candlestick.accessor();


  svg.append("g")
    .attr("class", "candlestick");

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")");

  svg.append("g")
    .attr("class", "y axis")
  // .append("text")
  // .attr("transform", "rotate(-90)")
  // .attr("y", 6)
  // .attr("dy", "2rem")
  // .style("text-anchor", "end")
  // .text("Price ($)");

  x.domain(data.map(candlestick.accessor().d));
  y.domain(techan.scale.plot.ohlc(data, candlestick.accessor()).domain());


  svg.selectAll("g.candlestick").datum(data).call(candlestick);
  svg.selectAll("g.x.axis").call(xAxis);
  svg.selectAll("g.y.axis").call(yAxis);


}


