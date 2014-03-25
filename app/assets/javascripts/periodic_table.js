var playPeriodically= playPeriodically || {};

playPeriodically.periodicTableViz = function() {
  var svg = d3.select("#periodic-table");
  var data;

  var clist = {};
  clist.Hydrogen = "#EDF46E";
  clist.Noble_gas = "#56BCDD";
  clist.Alkali_metals = "#56DDA4";
  clist.Alkaline_earth_metals = "#B6DD56";
  clist.Semiconductors = "#B9C5B9";
  clist.Other_nonmetals = "#FF573D";
  clist.Halogens = "#CB71FD";
  clist.Other_metals = "#09C4E7";
  clist.Transition_metals = "#5D5B6D";
  clist.Transition_metals2 = "#E4FF3C";
  clist.vague = "#00B392";


  d3.csv("assets/elements.csv", function(error, csv){
    data = csv;
    main(data);
  });

  function main(data){

    var group1 = svg.append("g").classed("group1", true);

    var blocks = group1.selectAll("g").data(data)
      .enter()
      .append("g")
      .attr("transform", function(d,i){
        var x = 20 + (48 * parseInt(d.group));
        var y = 20 + (48 * parseInt(d.row));
        return "translate(" + [x, y] + ")";
      });

    var rects = blocks.append("rect")
          .attr({
              "x": 0,
              "y": 0,
              "width": 45,
              "height": 45,
              "rx": 5,
              "ry": 5
          })
      .style("fill", function(d,i){return clist[d.named_type] });

    var text_content = blocks.append("text")
      .attr({x:3, y:14})
        .style({
              "fill": "#232323",
              "stroke-width": 0 + "px",
              "font-size": 1.2 + "em",
              "text-anchor": "right",
              "alignment-baseline": "middle",
              "font-family": "sans-serif"
          })
      .text(function(d,i){return d.Symbol});
  }
};

