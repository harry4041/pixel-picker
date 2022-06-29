var cssRoot = document.querySelector(':root');
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var myVar;
//Use JS to change CSS variables
function changeCSSVal(name, change) {
	cssRoot.style.setProperty(name, change);
}

//This function is used in index.html to get the json data from python
var takenSquares = []
var takenSquaresJson = []
var takenSquaresStrings = []
function getSquareList(data) {
	for (var i = 0; i < data.length; i++) {
		xValue = data[i]["x"];
		yValue = data[i]["y"];
		takenSquares.push([xValue, yValue])
	}

	//Creates the same list but with strings for the "click" function
	for (const element of takenSquares) {
		takenSquaresStrings.push(element.toString());
	}
}

//Json values so you can use the userId later on
function getSquareListJson(data) {
	for (var i = 0; i < data.length; i++) {
		takenSquaresJson.push(data[i])
	}
}

//Then fill in the taken squares
function findTakenSquares() {
	for (const element of takenSquares) {
		var x = element[0];
		var y = element[1];
		context.fillStyle = "grey";
		context.fillRect(x, y, 1, 1);
	}
}

//Get the nearest square to the mouse pointer
function getSquare(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: (evt.clientX - rect.left) - (evt.clientX - rect.left) % 1,
		y: (evt.clientY - rect.top) - (evt.clientY - rect.top) % 1
	};
}

//Fill the clicked square and remove the last square made
var lastClickedPosX = 0;
var lastClickedPosY = 0;
var lastClickData;
function fillSquare(context, x, y, color) {
	//Refill last clicked square
	if (lastClickData != null) {
		context.putImageData(lastClickData, lastClickedPosX, lastClickedPosY);
	}

	//Get data to refill this square if we click again
	lastClickData = context.getImageData(x, y, 1, 1);

	//Fill new square
	context.fillStyle = color;
	context.fillRect(x, y, 1, 1);

	//Change to new values
	lastClickedPosX = x;
	lastClickedPosY = y;
}

//Match the clicked co-ords with the user that owns those co-ords
function getUserId(data, xAxis, yAxis) {
	for (var i = 0; i < data.length; i++) {
	    if(data[i]["x"] == xAxis && data[i]["y"] == yAxis){
	        console.log(data[i]["name"]);
		    return data[i]["name"];
	    }
	}
}

//Create the popup after clicking on a square
function showTaken(e, isTaken, pixel, xAxis, yAxis) {
	const dest = document.getElementById("popup-element");

	//Check if the element already exists
	if (dest != null) {
		dest.remove();
	}


	//Check if someone has already taken this pixel
	if (isTaken) {
		var text = "Sorry, " + pixel + " has already been claimed by: " + getUserId(takenSquaresJson, xAxis, yAxis);
		//Change to taken users profile image
		changeCSSVal("--popupImg", "linear-gradient(to right, blue, blue)");
	} else {
		var text = "Would you like to claim pixel " + pixel + "?";
		//Change to taken logged in users profile picture or something like a ? maybe
		changeCSSVal("--popupImg", "linear-gradient(to right, white, white)");

		var but = document.createElement("button");
		but.id = "popup-element-b";
		but.insertAdjacentText("beforeend", "Claim");
	}

    if (xAxis < 250){
        var leftOffset = e.pageX - 100;
    } else{
        var leftOffset = e.pageX - 400;
    }

	var topOffset = e.pageY - 57;

	//Create paragraph
	var para = document.createElement('p');
	para.id = "popup-element-p";
	para.insertAdjacentText("beforeend", text);

	//Create div that houses paragraph
	var textDiv = document.createElement('div');
	textDiv.id = "popup-element";
	textDiv.style.position = "absolute";
	textDiv.style.left = leftOffset + "px";
	textDiv.style.top = topOffset + "px";
	textDiv.appendChild(para);
	if(!isTaken) textDiv.appendChild(but);
	document.getElementsByTagName('body')[0].appendChild(textDiv);

	//TODO:
	//Add fade effect
}

//Click
canvas.addEventListener('click', function (evt) {
	var mousePos = getSquare(canvas, evt);
	var mousePosString = mousePos.x.toString() + "," + mousePos.y.toString();
    console.log(mousePos);
	if (takenSquaresStrings.includes(mousePosString)) {
		showTaken(evt, true, mousePosString, mousePos.x, mousePos.y);
	} else {
		showTaken(evt, false, mousePosString, mousePos.x, mousePos.y);
	}

	//Need a way of removing highlighted square if another is clicked
	fillSquare(context, mousePos.x, mousePos.y, "grey");
}, false);
