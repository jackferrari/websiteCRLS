var grid = [
		["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
		["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
		["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
		["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
		["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
		["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
		["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
		["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
		["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
		["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"]
	];
var oldGrid = [
		["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
		["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
		["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
		["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
		["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
		["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
		["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
		["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
		["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
		["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"]
	];
var cols = 10,
	rows = 10;
	
function reDraw(){
 	for(var e=0; e < rows; e++){
 		for(var r=0; r < cols; r++){
 			if(grid[e][r] == "alive"){
 				document.getElementById('child_' + e + r).style.backgroundColor = "green";
 			}
 			if(grid[e][r] == "born"){
 				document.getElementById('child_' + e + r).style.backgroundColor = "yellow";
 			}
 			if(grid[e][r] == "died"){
 				document.getElementById('child_' + e + r).style.backgroundColor = "lightgrey";
 			}
 			if(grid[e][r] == "empty") {
 				document.getElementById('child_' + e + r).style.backgroundColor = "grey";
 			}
 		}
 	}
}

function copyGrid(){
 	for(var c=0; c < rows; c++){
 		for(var k=0; k < cols; k++){
 			oldGrid[c][k] = grid[c][k];
 		}
 	}
}

function CGOLStep(){
	 copyGrid();
 	for(var c=0; c < rows; c++){
 		for(var k=0; k < cols; k++){
 			var lives = 0;
 			var incY = c+1
    		var incX = k+1
        	var decY = c-1
        	var decX = k-1 
        	if (incY === rows){
     	       incY = 0
 		   	}
  	     	if (incX === cols) {
 	           incX = 0
			}
       		if (decY < 0) {
	   			decY = rows - 1
       		}
       		if (decX < 0) {
		        decX = cols - 1
       		}
        		
        	var neighbors = [
        		oldGrid[incY][decX], oldGrid[incY][k], oldGrid[incY][incX],
        		oldGrid[c][decX], 	  				    oldGrid[c][incX],
        		oldGrid[decY][decX], oldGrid[decY][k], oldGrid[decY][incX]
        	];
        	for(var f=0; f < neighbors.length; f++){
        		if(neighbors[f] == "alive" || neighbors[f] == "born"){
        			lives++;
        		}
        	}
    		grid[c][k] = status(lives, c, k);
 		}
 	}
 	reDraw();
}

function status(lives, c, k){
	if((  (lives === 2)||(lives === 3)  ) && (  (grid[c][k] === "alive")||(grid[c][k] === "born")  )){
       	return "alive";
    }
	if(  (lives === 3)   && (  (grid[c][k] === "empty")||(grid[c][k] == "died")  )){
      	return "born";
    }
    if((  (lives <= 1)||(lives >= 4)  ) && (  (grid[c][k] == "alive")||(grid[c][k] == "born")  )){
    	return "died";
    }
    else{
    	return "empty";
    }
}

$(document).ready(function(){
	var $life = $('#life');
	var $next = $('#next');
	var $reset = $('#reset');
	var $play = $('#play');
	var $pause = $('#pause');
	var time = null;
	var timescale = 500;
	var $plus = $('#plusButton');
	var $minus = $('#minusButton');
	
	for (var j=0; j < rows; j++) {
		for (var a=0; a < cols; a++) {
			var name = 'child_' + j + "" + a;
			$life.append('<div Id="'+ name + '" class="left bDim grey"></div>');
		}
 	}
 	$life.click(function(e) {
	    var x = e.pageX - $life.offset().left;     
		var y = e.pageY - $life.offset().top;
		var col = Math.floor((x / $life.width()) * 10);
		var row = Math.floor((y / $life.height()) * 10);
		document.getElementById('child_' + row + col).style.backgroundColor = "yellow";
		grid[row][col] = "born";
		reDraw();
 	}); 
 	$life.dblclick(function(e) {
	    var x = e.pageX - $life.offset().left;     
		var y = e.pageY - $life.offset().top;
		var col = Math.floor((x / $life.width()) * 10);
		var row = Math.floor((y / $life.height()) * 10);
		document.getElementById('child_' + row + col).style.backgroundColor = "lightgrey";
		grid[row][col] = "empty";
		reDraw();
 	}); 
 	
 	
 	$next.click(function(){
		CGOLStep()
 	});
	$reset.click(function(){
		for(var c=0; c < rows; c++){
 			for(var k=0; k < cols; k++){
 				grid[c][k] = "empty";
			}
		}
		reDraw();
	});
	
	$play.click(function(){
		console.log('Life goes on');
		time = setInterval(CGOLStep, timescale);
	});
	$pause.click(function(){
		console.log('Life comes to a halt');
		clearInterval(time);
	});
	$plus.click(function(){
		if(timescale >= 50){
			timescale = timescale - 50;
			if(time){
				clearInterval(time);
			}
			time = setInterval(CGOLStep, timescale);
			console.log(timescale);
		}
	});
	$minus.click(function(){
		if(timescale < 10000){
			timescale = timescale + 50;
			if(time){
				clearInterval(time);
			}
			time = setInterval(CGOLStep, timescale);
			console.log(timescale);
		}
	});
	
});
 /* 
 ----------------------potential + and - rows and cols function---------------------------
 $plusRows.click(function(){
		rows = rows++;
		var newRow = [];
		for(var i=0; i < cols; i++){
			newRow = newRow.push("empty");
		}
		grid = grid.push(newRow);
		for (var j=0; j < rows-1; j++) {
			for (var a=0; a < cols; a++) {
				var name = 'child_' + j + "" + a;
				$(name).remove();
			}
 		}
 		for (var j=0; j < rows; j++) {
			for (var a=0; a < cols; a++) {
				var name = 'child_' + j + "" + a;
				$life.append('<div Id="'+ name + '" class="left bDim grey"></div>');
			}
 		}
	});
	
	var $plusRows = $('#plusButtonRows');
	var $plusCols = $('#plusButtonCols');
	var $minusRows = $('#minusButtonRows');
	var $minusRows = $('#minusButtonCols');
	
						<div class="rowChnBox">
							<div Id="minusButtonRows" class="jackBlue"><p class="pnoMar">-</p></div>
							<div class="middleButton jackBlue"><p class="pnoMar">rows</p></div>
							<div Id="plusButtonRows" class="jackBlue"><p class="pnoMar">+</p></div>
						</div>
						<br>
						<div class="rowChnBox">
							<div Id="minusButtonCols" class="jackBlue"><p class="pnoMar">-</p></div>
							<div class="middleButton jackBlue"><p class="pnoMar">cols</p></div>
							<div Id="plusButtonCols" class="jackBlue"><p class="pnoMar">+</p></div>
						</div>

 -----------------------------prints the grid--------------------------------------------- 
				
	document.getElementById("demo").innerHTML = grid[0];
 	document.getElementById("emod").innerHTML = grid[1];
 	document.getElementById("mode").innerHTML = grid[2];
 	document.getElementById("odem").innerHTML = grid[3];
 	document.getElementById("omed").innerHTML = grid[4];
 	document.getElementById("medo").innerHTML = grid[5];
 	document.getElementById("edom").innerHTML = grid[6];
 	document.getElementById("dome").innerHTML = grid[7];
 	document.getElementById("jack").innerHTML = grid[8];
 	document.getElementById("kcaj").innerHTML = grid[9];		
	
				<p id="demo"></p>
				<p id="emod"></p>
				<p id="mode"></p>
				<p id="odem"></p>
				<p id="omed"></p>
				<p id="medo"></p>
				<p id="edom"></p>
				<p id="dome"></p>
				<p id="jack"></p>
				<p id="kcaj"></p>
 */