
var DurationTime = 50;


// Recode for chordLayout.
function chordLayout2() {
    var chord2 = {}, chords, groups, matrix, n, padding = 0, sortGroups, sortSubgroups, sortChords;
    function relayout() {
      var subgroups = {}, groupSums = [], groupIndex = d3.range(n), subgroupIndex = [], k, x, x0, i, j;
      chords = [];
      groups = [];
      k = 0, i = -1;
	  
	  var adjustedValue = 10000;
	  while (++i < n) {
        adjustedx = 0, j = -1;
        while (++j < n) {
          adjustedx += matrix[i][j];
        }
		j = -1;
		while (++j < n) {
          matrix[i][j] *= (adjustedValue/ adjustedx);
        }
		groupSums.push(adjustedValue);
        subgroupIndex.push(d3.range(n));
		k+= adjustedValue;
      }
	  
      if (sortGroups) {
        groupIndex.sort(function(a, b) {
          return sortGroups(groupSums[a], groupSums[b]);
        });
      }
      if (sortSubgroups) {
        subgroupIndex.forEach(function(d, i) {
          d.sort(function(a, b) {
            return sortSubgroups(matrix[i][a], matrix[i][b]);
          });
        });
      }
      k = (2 * Math.PI - padding * n) / k;
      x = 0, i = -1;
      while (++i < n) {
        x0 = x, j = -1;
        while (++j < n) {
          var di = groupIndex[i], dj = subgroupIndex[di][j], v = matrix[di][dj], a0 = x, a1 = x += v * k;
          subgroups[di + "-" + dj] = {
            index: di,
            subindex: dj,
            startAngle: a0,
            endAngle: a1,
            value: v
          };
        }
        groups[di] = {
          index: di,
          startAngle: x0,
          endAngle: x,
          value: (x - x0) / k
        };
        x += padding;
      }
      i = -1;
      while (++i < n) {
        j = i - 1;
        while (++j < n) {
          var source = subgroups[i + "-" + j], target = subgroups[j + "-" + i];
          if (source.value || target.value) {
            chords.push(source.value < target.value ? {
              source: target,
              target: source
            } : {
              source: source,
              target: target
            });
          }
        }
      }
      if (sortChords) resort();
    }
    function resort() {
      chords.sort(function(a, b) {
        return sortChords((a.source.value + a.target.value) / 2, (b.source.value + b.target.value) / 2);
      });
    }
    chord2.matrix = function(x) {
      if (!arguments.length) return matrix;
      n = (matrix = x) && matrix.length;
      chords = groups = null;
      return chord2;
    };
    chord2.padding = function(x) {
      if (!arguments.length) return padding;
      padding = x;
      chords = groups = null;
      return chord2;
    };
    chord2.sortGroups = function(x) {
      if (!arguments.length) return sortGroups;
      sortGroups = x;
      chords = groups = null;
      return chord2;
    };
    chord2.sortSubgroups = function(x) {
      if (!arguments.length) return sortSubgroups;
      sortSubgroups = x;
      chords = null;
      return chord2;
    };
    chord2.sortChords = function(x) {
      if (!arguments.length) return sortChords;
      sortChords = x;
      if (chords) resort();
      return chord2;
    };
    chord2.chords = function() {
      if (!chords) relayout();
      return chords;
    };
    chord2.groups = function() {
      if (!groups) relayout();
      return groups;
    };
    return chord2;
  };

 function click_hist(d,i){
		click_bar_data.value = d;
		click_bar_data.occup = d.indx;
		
		var aaaa = share.data("detail_table_data");
	
		bbbb = d3.map(click_bar_data.value);
		
		xxx = aaaa.filter(function(d){

			//return 1;
			return (d.Occupation === click_bar_data.occup) && bbbb.has(d.MovieID);
						
					});
		console.log(xxx.length);
		
		share.data("peopleTable").remove();
		peopleTable = window.top.top_right.tabulate(xxx, ["UserID","MovieID","Occupation"],"#topRight");
		// sort by age
		peopleTable.selectAll("tbody tr")
			.sort(function(a, b) {
				return d3.descending(a.MovieID, b.movieID);
		});	
		share.data("peopleTable",peopleTable)	;	
		
    }
 
 //display the detial of each sectors 
function unfold(d,i) {
	index = i;
	data_from_click = histogramArray[i];

	//mi_long(data_from_click);
	
	//隐藏其他组件
	mychords.transition().duration(DurationTime).attr("visibility","hidden");
	group.transition().duration(DurationTime).style("opacity","0");
	hist_group.transition().duration(DurationTime).attr("visibility","hidden");
	
	//表层弧的出现
fore_arc = d3.svg.arc()
				.innerRadius(Radius)
				.outerRadius(Radius_2)
				.startAngle(Math.PI/2+0.02)
				.endAngle(Math.PI*5/2-0.02);
	//表层刻度
fgTicks = d3.range(Math.PI/2+0.02,Math.PI*5/2-0.02,0.04);
	
foreground = svg.append("g").attr("id","foreground")

foreground_arc = foreground.append("path")
		.attr("id","foreground_arc")
		.style("fill","#D8BFD8")
		.style("stroke","white")
		.attr("d",fore_arc)
		.on("click",clear);

foreground_ticks = foreground.append("g").attr("id","foreground_ticks")
					.selectAll("line")
					.data(fgTicks)
					.enter().append("line")
					.attr("transform",function(d){
							return "rotate(" + (d * 180 / Math.PI - 90) + ")"
							+ "translate(" + outerRadius+ ",0)";})
					.attr("x1", 1)
					.attr("y1", 0)
					.attr("x2", 5)
					.attr("y2", 0)
					.style("stroke", "#000");
		
foreground_label = foreground.append("text")
				.attr("x",0-(outerRadius+7))
				.attr("y",0)
				.attr("text-anchor","end")
				.text(occupation_list[index]);				

foreground_hist = foreground.append("g").attr("id","foreground_hist")
		.selectAll("path")
		.data(data_from_click)
		.enter().append("path")
		.style("fill", "steelblue")
		.style("stroke","white")
		.attr("d",mi_long)
		.on("click",click_hist);			
}

	
	
//display the whole information....similar to clear
function fold(d) {
	startangle = d.startAngle;
	endangle = d.endAngle;
	
//删除前景
	/*foreground_hist.transition()
		.duration(DurationTime)
		.attr("opacity",0);*/
		
	foreground_hist.select("hist_long").remove();	
	
	
	//显示其他组件
	mychords.transition().duration(DurationTime).attr("visibility","visible");
	group.transition().duration(DurationTime).style("opacity",1);
		
    foreground_arc.transition()
	  .duration(DurationTime)
	  .attrTween("d",function(d,a){
			///interpolate3 = d3.interpolate(a.startAngle,0);
			interpolate1 = d3.interpolate(endangle,startangle);
			///interpolate2 = d3.interpolate(d.innerRadius,radius-210);
			return function(t) {
				//d.startAngle = interpolate3(t);
				d.endAngle = interpolate1(t);
			//	d.innerRadius = interpolate2(t);
				return arc(d);
			};
		});
}


function clear()
{
	/*this.remove();
	foreground_hist.remove();*/
	foreground.remove();
	
	mychords.transition().duration(DurationTime).attr("visibility","visible");
	hist_group.transition().duration(DurationTime).attr("visibility","visible");
	group.transition().duration(DurationTime).style("opacity",1);
	
}
	
	
// The two checkbox functions
function set_bin() {
    var chkbox = document.getElementById("set_bin");
	if (chkbox.checked) {
        /////////
		set_bin = 1;
    }else{
	/////////
		set_bin = 0;
	}
	redraw();
}
   
function postv_or_not() {
    var chkbox = document.getElementById("all_positive");
	if (chkbox.checked) {
        /////////
		all_or_positive = 1 ;
    }else{
	/////////
		all_or_positive = 0 ;
	}
	redraw();
}
  
 function fade(svg) {  	
		
return function(g, i) {
	svg.selectAll("g.chord path")
		.classed("fade",function(p){
		return p.source.index != i && p.target.index != i;
			});
		};
		
  }
  
  
  
  /////////////////////function table////////////////////

function tabulate(data, columns, tempDiv) {
    var table = d3.select(tempDiv).append("table")
				.style("border-collapse", "collapse")
				.style("border", "2px black solid"),
        thead = table.append("thead"),
        tbody = table.append("tbody")
					.style("border", "1px black solid")
					.style("padding", "5px");

    // append the header row
    thead.append("tr")
        .selectAll("th")
        .data(columns)
        .enter()
        .append("th")
			//.on("click",click_sort)
			.on("mouseover", function(){d3.select(this).style("background-color", "#d3d3d3")})
			.on("mouseout", function(){d3.select(this).style("background-color", "white")})
            .text(function(column) { return column; });

    // create a row for each object in the data
    var rows = tbody.selectAll("tr")
        .data(data)
        .enter()
        .append("tr");

    // create a cell in each row for each column
    var cells = rows.selectAll("td")
        .data(function(row) {
            return columns.map(function(column) {
                return {column: column, value: row[column]};
            });
        })
        .enter()
        .append("td")
		    .on("mouseover", function(){d3.select(this).style("background-color", "steelblue")})
			.on("mouseout", function(){d3.select(this).style("background-color", "white")})
            .text(function(d) { return d.value; });
    
    return table;
}

function tabulateBigt(data, columns) {
    var table = d3.select("body").append("table"),
        thead = table.append("thead"),
        tbody = table.append("tbody");
				
    // create a row for each object in the data
    var rows = tbody.selectAll("tr")
        .data(data)
        .enter()
        .append("tr");

    // create a cell in each row for each column
    var cells = rows.selectAll("td")
        .data(function(d){return d;})
        .enter()
        .append("td")
            .text(function(d) { return d; });
    
    return table;
}




		
	