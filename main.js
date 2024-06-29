var canvas = document.getElementById("canvas");
var canvasContext = canvas.getContext("2d");
var img = new Image();
img.src = "Sprites/JShip.png";
canvasContext.drawImage(img, 10, 10);
var keyZ = false;
var keyUp = false;
var keyDown = false;
var keyLeft = false;
var keyRight = false;


document.addEventListener ('keydown', function(event) {
    if(event.code == 90) {
        keyZ = true;
    } else if (event.code == 38) {
        keyUp = true;
    } else if (event.code == 40) {
        keyDown = true;
    } else if (event.code == 39) {
        keyRight = true;
    } else if (event.code == 37) {
        keyLeft = true
    }
});

document.addEventListener ('keyup', function(event) {
    if(event.code == 90) {
        keyZ = true;
    } else if (event.code == 38) {
        keyUp = true;
    } else if (event.code == 40) {
        keyDown = true;
    } else if (event.code == 39) {
        keyRight = true;
    } else if (event.code == 37) {
        keyLeft = true
    }
});

class JShip { 
    constructor() {

    }

}



function drawScreen() {

}   

