var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

//We'll get takenSquares from a database of squares already taken
takenSquares = ["1,2","5,6"];

function getSquare(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: 1 + (evt.clientX - rect.left) - (evt.clientX - rect.left)%1,
		y: 1 + (evt.clientY - rect.top) - (evt.clientY - rect.top)%1
    	};
}


function fillSquare(context, x, y, color){
	context.fillStyle = color;
	context.fillRect(x,y,1,1);
}

function findTakenSquares(){
	for (const element of takenSquares){
		var x = element.substr(0, element.indexOf(',')); 
		var y = element.split(",")[1];
		console.log(x);
        	console.log(y);
        	fillSquare(context, x, y, "grey");
    	}
}


function showTaken(e, isTaken, pixel){
	const dest = document.getElementById("my-element");
       
        if(dest != null) {
        	dest.remove();
        }

        if(isTaken){
		var text = "Sorry, " + pixel + " has already been claimed by: USER";
        } else {
          	var text = "Would you like to claim pixel " + pixel + "?";
        }
       
        //5 is half the width of the div so act accordingly
        var leftOffset = e.pageX - 5;

        //10 is the height of the div so act accordingly
        var topOffset = e.pageY - 10;

        var div = document.createElement('div');
        div.id = "my-element";
        div.style.backgroundColor = "white";
        div.style.position = "absolute";
        div.style.left =  leftOffset + "px";
        div.style.top =  topOffset + "px";
        div.style.height = "10px";
        div.style.width = "10px";
        div.insertAdjacentText("beforeend", text);
        document.getElementsByTagName('body')[0].appendChild(div);

	//Add fade effect
}


canvas.addEventListener('click', function(evt) {
	var mousePos = getSquare(canvas, evt);
	var mousePosString = mousePos.x.toString() + "," + mousePos.y.toString();   
	console.log(mousePosString);

	if(takenSquares.includes(mousePosString)) {
		showTaken(evt, true, mousePosString);
	} else {
		showTaken(evt, false, mousePosString);
	}

	fillSquare(context, mousePos.x, mousePos.y, "grey")
}, false);

//Is there a JS equivelent to c# Awake?
findTakenSquares();
