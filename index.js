$(document).ready(function(){
	var ctrl=this;
	var chars=[];
	var position=0;
	function delta(estado,elementoCinta){
		var retVal={};

	}
	function buscar(){
		paintBox(position);

	}
	
	function drawBoxes(cadena){
		chars=cadena.split("");
		var firstHalf=chars.splice(0,chars.length/2);
		var temp=chars.splice(0,chars.length);
		chars=[];
		chars=chars.concat(firstHalf);
		chars=chars.concat(["#"]);
		chars=chars.concat(temp);
		var jsonRectangles=[];
		var jsonTexts=[];
		d3.select("#CadenaDiv").html("");
		var svgContainer = d3.select("#CadenaDiv").append("svg").attr("width", 600).attr("height", 600);

		for(var idx=0;idx<chars.length;idx++){
			var val=chars[idx];
			jsonRectangles.push({
				"x_axis": 50*(idx+1),
				"y_axis": 50,
				"height": 50,
				"width": 50,
				"stroke": "black",
				"stroke-width": 1,
				"color":"white"
			})
			jsonTexts.push({
				"x_axis": 50*(idx+1)+15,
				"y_axis": 85,
				"height": 50,
				"width": 50,
				"font-size":35,
				"text":val
			})
		};

		var rectangles= svgContainer.selectAll("rect")
			.data(jsonRectangles)
			.enter()
			.append("rect")

		var rectangleAttributes=rectangles
			.attr("x", function (d) { return d.x_axis; })
			.attr("y", function (d) { return d.y_axis; })
			.attr("height", function (d) { return d.height; })
			.attr("width", function (d) { return d.width; })
			.attr("stroke", function (d) { return d.stroke; })
			.attr("stroke-width", function (d) { return 1; })
			.style("fill", function(d) { return d.color; })

		var texts= svgContainer.selectAll("text")
			.data(jsonTexts)
			.enter()
			.append("text")

		var textAttributes=texts
			.attr("x", function (d) { return d.x_axis; })
			.attr("y", function (d) { return d.y_axis; })
			.attr("height", function (d) { return d.height; })
			.attr("width", function (d) { return d.width; })
			.attr("font-size", function (d) { return d["font-size"]; })
			.text(function(d){return d.text})
			.style("fill", function(d) { return d.color; })
	}

	function paintBox(position){
		
	}
	function init(){
		$("#go").bind("click",buscar);
		$("#cadena").keyup(function(event){
			var cadena=$("#cadena").val();
			drawBoxes(cadena);
		});
		var svgContainer = d3.select("#rightDiv").append("svg").attr("width", 200).attr("height", 200);
	};
	init();
})