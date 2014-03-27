
var playPeriodically= playPeriodically || {};

playPeriodically.periodicTableViz = function() {
  var svg = d3.select("#periodic-table");
  var data;

  var clist = {};
  clist.Hydrogen = "#69E22B";
  clist.Noble_gas = "#56BCDD";
  clist.Alkali_metals = "#56DDA4";
  clist.Alkaline_earth_metals = "#5F64F5";
  clist.Semiconductors = "#B9C5B9";
  clist.Other_nonmetals = "#FF573D";
  clist.Halogens = "#CB71FD";
  clist.Other_metals = "#09C4E7";
  clist.Transition_metals = "#B6B6BD";
  clist.Transition_metals2 = "#BE80FF";
  clist.vague = "#00B392";


  d3.csv("/elements.csv", function(error, csv){
    data = csv;
    tableViz(data);
  });

  function tableViz(data){
    var group1 = svg.append("g").classed("group1", true);

    var blocks = group1.selectAll("g").data(data)
      .enter()
      .append("g")
      .attr("class",function(d){ return "element_block_" + d.Symbol;})
      .attr("transform", function(d,i){
        var x = 30 + (58 * parseInt(d.group));
        var y = 30 + (58 * parseInt(d.row));
        return "translate(" + [x, y] + ")";
      })
      .on("mouseover", function() {
        d3.select(this).select(".text-atomic-number").style("display", "block");
        d3.select(this).select(".text-name").style("display", "block");
     })
     .on("mouseout", function() {
        d3.select(this).select(".text-atomic-number").style("display", "none");
        d3.select(this).select(".text-name").style("display", "none");
     });

    var rects = blocks.append("rect")
          .attr({
              "x": 0,
              "y": 0,
              "width": 55,
              "height": 55,
              "rx": 5,
              "ry": 5
          })
      .style("fill", function(d,i){return clist[d.named_type]; });

    var textSymbol = blocks.append("text")
        .attr({x:3, y:14})
          .style({
                "fill": "#232323",
                "font-size": 1 + "em",
                "text-anchor": "right",
                "alignment-baseline": "middle",
                "font-family": "sans-serif"
            })
        .text(function(d,i){return d.Symbol; });

     var textAtomicNumber = blocks.append("text")
        .attr({x:3, y:31})
          .style({
                "fill": "#232323",
                "font-size": 0.85 + "em",
                "text-anchor": "right",
                "alignment-baseline": "middle",
                "font-family": "sans-serif",
                "display": "none"
            })
        .text(function(d,i){return "At#:"+ d.At_num; })
        .attr('class', 'text-atomic-number');

     var textName = blocks.append("text")
        .attr({x:3, y:46})
          .style({
                "fill": "#232323",
                "font-size": 0.85 + "em",
                "text-anchor": "right",
                "alignment-baseline": "middle",
                "font-family": "sans-serif",
                "display": "none"
            })
        .text(function(d,i){return d.Name; })
        .attr('class', 'text-name');
    }
};
