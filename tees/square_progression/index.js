const width = 800;
const height = 600;
const side = 80;
const colors = ["red", "yellow", "blue", "green"];

var canvas = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("style", "outline: thin solid black;");

function createSquares() {
 r = document.getElementById("ratio").value
 n = document.getElementById("n-squares").value
 const value = document.querySelector('input[name="variation"]:checked').value;

 data = [];
 canvas.selectAll("rect").remove();

 for(let i = 0; i < n; i++) {
  data.push({ x1: (width/2), x2: width/2 +side, y1: height/2, y2: height/2 +side});
 }
 let rot = 90 * r
 const sca=Math.sqrt(1+Math.sqrt(-4*r*r+4*r))
 const rad = rot * Math.PI / 180;
 console.log(sca)
 rects = canvas.selectAll("foo")
  .data(data)
  .enter()
  .append("rect")
  .attr("id", (d, i) => "square_" + i)
  .attr("x", function(d,i){
   if(i == 0) return 0
   switch(value) {
    case "0" || "3":
     return 0;
    case "1" || "2":
     return 80 * i;
   }
  })
  .attr("y", function(d,i){
   if(i == 0) return 0
   switch(value) {
    case "0" || "1":
     return 0;
    case "3" || "2":
     return 80 * i;
   }
  })
  .attr("width", function(d,i){
   return 80 * ((Math.sin(rad) + Math.cos(rad)) ** i)
  })
  .attr("height", function(d,i){
   return 80 * ((Math.sin(rad) + Math.cos(rad)) ** i)
  })
  .attr("fill", (d,i ) => colors[i % colors.length])
  .attr("transform", function(d,i){
   return "translate(" + width/2 + "," +  height/2 + ") scale(" + (1) + ") rotate(" + (rot * i) + ")"
  })
  .attr("opacity", 0.7);
  localStorage.setItem("n", n);
  localStorage.setItem("r", r);
  localStorage.setItem("value", value);

}

function updateValueSlider(val,id) {
 document.getElementById(id).value = val;
}
let n = localStorage.getItem("n");
let r = localStorage.getItem("r");
let variation = localStorage.getItem("value");
if(n){
 document.getElementById("n-squares").value = n;
 document.getElementById("n-squares-text").value = n;
}
if(r){
 document.getElementById("ratio").value = r;
 document.getElementById("ratio-text").value = r;
}
if(variation){
 document.querySelector('input[name="variation"][value="' + variation + '"]').checked = true;
}
createSquares();