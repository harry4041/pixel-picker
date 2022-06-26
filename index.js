var cssRoot = document.querySelector(':root');
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

//We'll get takenSquares from a database of squares already used
takenSquares = ["1,2","1,1","2,1","2,2","3,1","5,6"];


function changeCSSVal(name, change){
	cssRoot.style.setProperty(name, change);
}


function getSquare(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: (evt.clientX - rect.left) - (evt.clientX - rect.left) % 1,
		y: (evt.clientY - rect.top) - (evt.clientY - rect.top) % 1
	};
}


var lastClickedPosX = 0;
var lastClickedPosY = 0;
var lastClickData;


function fillSquare(context, x, y, color) {
	//Refill last clicked square
	if(lastClickData != null) {
	context.putImageData(lastClickData, lastClickedPosX, lastClickedPosY);
	console.log(lastClickData.data[0], lastClickData.data[1], lastClickData.data[2]);
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


function findTakenSquares() {
	for (const element of takenSquares) {
		var x = element.substr(0, element.indexOf(','));
		var y = element.split(",")[1];
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
		//Change to taken users profile image
		changeCSSVal("--popupImg", "linear-gradient(to right, blue, blue)"); 
	} else {
		var text = "Would you like to claim pixel " + pixel + "?";
		//Change to taken logged in users profile picture or something like a ? maybe
		changeCSSVal("--popupImg", "linear-gradient(to right, white, white)");
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
	var textDiv = document.createElement('div');
	textDiv.id = "popup-element";
	textDiv.style.position = "absolute";
	textDiv.style.left = leftOffset + "px";
	textDiv.style.top = topOffset + "px";
	textDiv.appendChild(para);
	document.getElementsByTagName('body')[0].appendChild(textDiv);

	//Add fade effect
}


canvas.addEventListener('click', function (evt) {
	var mousePos = getSquare(canvas, evt);
	var mousePosString = mousePos.x.toString() + "," + mousePos.y.toString();

	if (takenSquares.includes(mousePosString)) {
		showTaken(evt, true, mousePosString);
	} else {
		showTaken(evt, false, mousePosString);
	}

	//Need a way of removing highlighted square if another is clicked
	fillSquare(context, mousePos.x, mousePos.y, "grey");
}, false);

//Is there a JS equivelent to c# Awake?
findTakenSquares();
