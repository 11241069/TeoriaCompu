$(document).ready(function(){
	var ctrl=this;
	var chars=[];
	var position=0;
	var estadoActual="q0"
	var cadenaManejada="";
	var automata={
		"q0":{
			"0":["X","R","q1"],
			"1":["X","R","q2"],
			"2":["X","R","q3"],
			"#":["#","R","q8"]
		},
		"q1":{
			"0":["0","R","q1"],
			"1":["1","R","q1"],
			"2":["2","R","q1"],
			"#":["#","R","q4"]
		},
		"q2":{
			"0":["0","R","q2"],
			"1":["1","R","q2"],
			"2":["2","R","q2"],
			"#":["#","R","q6"]
		},
		"q3":{
			"0":["0","R","q3"],
			"1":["1","R","q3"],
			"2":["2","R","q3"],
			"#":["#","R","q7"]
		},
		"q4":{
			"Y":["Y","R","q4"],
			"0":["Y","L","q5"]
		},
		"q5":{
			"0":["0","L","q5"],
			"1":["1","L","q5"],
			"2":["2","L","q5"],
			"#":["#","L","q5"],
			"Y":["Y","L","q5"],
			"X":["X","R","q0"]
		},
		"q6":{
			"Y":["Y","R","q6"],
			"1":["Y","L","q5"]
		},
		"q7":{
			"Y":["Y","R","q7"],
			"2":["Y","L","q5"]
		},
		"q8":{
			"Y":["Y","R","q8"],
			" ":[" ","S","q9"],
		},
		"q9":{
		}
	}

	function delta(estado,elementoCinta){
		var retVal={};
		console.log("estado: ",estado);
		console.log("símbolo: ",elementoCinta);
		retVal=automata[estado][elementoCinta];
		//console.log("Escribe",retVal[0]);
		//console.log("Direccion",retVal[1]);
		//console.log("Siguiente Estado",retVal[2]);
		return retVal;
	}
	function buscar(){
		position=0;
		estadoActual="q0";
		cadenaManejada=$("#cadena").val()
		drawBoxes(cadenaManejada,position);
	}
	function siguiente(){
		resDelta=delta(estadoActual,cadenaManejada.split("")[position]==undefined?" ":cadenaManejada.split("")[position]);
		if(resDelta==undefined){
			alert("Cadena no aceptada");
			buscar();
			return;
		}
		var aEscribir=resDelta[0];
		var direccion=resDelta[1];
		var siguienteEstado=resDelta[2];
		if(siguienteEstado=="q9"){
			alert("Cadena aceptada");
			buscar();
			return;
		}
		var temp=cadenaManejada.split("");
		temp[position]=aEscribir;
		cadenaManejada=temp.join("");
		position=direccion=="R"?position+1:position-1;
		estadoActual=siguienteEstado;
		drawBoxes(cadenaManejada,position);
	}
	function direccion(){

	}
	
	function drawBoxes(cadena,positionMark){
		chars=cadena.split("");
		if(chars.indexOf("#")==-1){
			var firstHalf=chars.splice(0,chars.length/2);
			var temp=chars.splice(0,chars.length);
			chars=[];
			chars=chars.concat(firstHalf);
			chars=chars.concat(["#"]);
			chars=chars.concat(temp);
		}
		cadenaManejada=chars.join("");
		var jsonRectangles=[];
		var jsonTexts=[];
		d3.select("#CadenaDiv").html("");
		var svgContainer = d3.select("#CadenaDiv").append("svg").attr("width", "100%").attr("height", 600);

		for(var idx=0;idx<chars.length;idx++){
			var val=chars[idx];
			jsonRectangles.push({
				"x_axis": 50*(idx+1),
				"y_axis": 50,
				"height": 50,
				"width": 50,
				"stroke": "black",
				"stroke-width": 1,
				"color":positionMark==idx?"yellow":"white"
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

	function init(){
		$("#go").bind("click",buscar);
		$("#cadena").keyup(function(event){
			var cadena=$("#cadena").val();
			drawBoxes(cadena);
		});
		$("#nextButton").bind("click",siguiente);
	};
	init();
})