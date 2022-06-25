function getSquare(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: 1 + (evt.clientX - rect.left) - (evt.clientX - rect.left)%1,
        y: 1 + (evt.clientY - rect.top) - (evt.clientY - rect.top)%1
    };
}

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

function fillSquare(context, x, y){
    context.fillStyle = "gray"
    context.fillRect(x,y,1,1);
}

canvas.addEventListener('click', function(evt) {
    var mousePos = getSquare(canvas, evt);
    console.log(mousePos);
    fillSquare(context, mousePos.x, mousePos.y)
}, false);