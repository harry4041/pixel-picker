var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

//We'll get takenSquares from a database of squares already used
takenSquares = ["1,2", "5,6"];

function getSquare(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: 1 + (evt.clientX - rect.left) - (evt.clientX - rect.left) % 1,
		y: 1 + (evt.clientY - rect.top) - (evt.clientY - rect.top) % 1
	};
}


function fillSquare(context, x, y, color) {
	context.fillStyle = color;
	context.fillRect(x, y, 1, 1);
}

function findTakenSquares() {
	for (const element of takenSquares) {
		var x = element.substr(0, element.indexOf(','));
		var y = element.split(",")[1];
		console.log(x);
		console.log(y);
		fillSquare(context, x, y, "grey");
	}
}


function showTaken(e, isTaken, pixel) {
	const dest = document.getElementById("popup-element");

	//Check if the element already exists
	if (dest != null) {
		dest.remove();
	}

	//Check if someone has already taken this pixel
	if (isTaken) {
		var text = "Sorry, " + pixel + " has already been claimed by: USER";
	} else {
		var text = "Would you like to claim pixel " + pixel + "?";
	}

	//Handles where to put the popup so it's not off the scrren...
	if(e.pageX > 870){
		var leftOffset = e.pageX - 300;
	} else if (e.pageX < 190){
		var leftOffset = e.pageX - 15;
	} else {
		var leftOffset = e.pageX - 165;
	}
	//...continued for Y
	if (e.pageY < 45){
		var topOffset = e.pageY + 15;
	} else{
		var topOffset = e.pageY - 32;
	}

	//Create paragraph
	var para = document.createElement('p');
	para.style.margin = "0";
	para.insertAdjacentText("beforeend", text);

	//Create div that houses paragraph
	var div = document.createElement('div');
	div.id = "popup-element";
	div.style.position = "absolute";
	div.style.left = leftOffset + "px";
	div.style.top = topOffset + "px";
	div.appendChild(para);
	document.getElementsByTagName('body')[0].appendChild(div);

	//Add fade effect
}


canvas.addEventListener('click', function (evt) {
	var mousePos = getSquare(canvas, evt);
	var mousePosString = mousePos.x.toString() + "," + mousePos.y.toString();
	console.log(mousePosString);

	if (takenSquares.includes(mousePosString)) {
		showTaken(evt, true, mousePosString);
	} else {
		showTaken(evt, false, mousePosString);
	}
	console.log(evt.pageY);

	//Need a way of removing highlighted square if another is clicked
	fillSquare(context, mousePos.x, mousePos.y, "grey")
}, false);

//Is there a JS equivelent to c# Awake?
findTakenSquares();
