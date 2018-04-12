
var r = 1000,		// bubble's r
    format = d3.format(",d"),
    fill = d3.scale.category20c();

var bubble = d3.layout.pack()
    .sort(null)
    .size([r, r]);

var vis = d3.select("#chart").append("svg:svg")
.attr("width", r)
.attr("height", r)
.attr("class", "bubble");

d3.json("../../data/ida.json", function(json) {
//d3.json("../data/flare.json", function(json) {
var node = vis.selectAll("g.node")
      .data(bubble.nodes(classes(json))
      .filter(function(d) { return !d.children; }))
      .enter().append("svg:g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("svg:title")
      .text(function(d) { return d.className + ": " + format(d.value*2); });

  node.append("svg:circle")
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d) { return fill(d.packageName); });

  // 定義泡泡裡文字的屬性
  node.append("svg:text")
      .attr("text-anchor", "middle")
      .attr("dy", ".3em")		// 泡泡裡對文字的Y軸定位
      .style("font-size","35px")
      .style("font-family","simhei")
      .text(function(d) { return d.className.substring(0, d.r / 13); });		// 顯示文字的長度, 相對於泡泡的半徑長要顯示幾個字? d.r/13 個長度的字
//      .text("aa");		// 顯示文字的長度, 相對於泡泡的半徑長要顯示幾個字? d.r/13 這麼長
});

// Returns a flattened hierarchy containing all leaf nodes under the root.
function classes(root) {
  var classes = [];

  function recurse(name, node) {
    if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
    else classes.push({packageName: name, className: node.name, value: node.size});
  }

  recurse(null, root);
  return {children: classes};
}
