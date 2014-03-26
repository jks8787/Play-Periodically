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
  clist.Transition_metals = "#B6B6BD";
  clist.Transition_metals2 = "#E4FF3C";
  clist.vague = "#00B392";


  d3.csv("/elements.csv", function(error, csv){
    data = csv;
    main(data);
  });

  function main(data){
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
      .on("mouseover", function(town) {
        d3.select(this).select(".text-atomic-number").style("display", "block");
        d3.select(this).select(".text-name").style("display", "block");
     })
     .on("mouseout", function(town) {
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

    var text_symbol = blocks.append("text")
        .attr({x:3, y:14})
          .style({
                "fill": "#232323",
                "font-size": 1 + "em",
                "text-anchor": "right",
                "alignment-baseline": "middle",
                "font-family": "sans-serif"
            })
        .text(function(d,i){return d.Symbol; });

     var text_atomic_number = blocks.append("text")
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

     var text_name = blocks.append("text")
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

// data[2].Mass
// "6.9410000000"
// data[2].Name
// "Lithium"
// data[2].type
// "metals"
