var canvas = document.getElementById("canvas");
var canvasContext = canvas.getContext("2d");
var img = new Image();
img.src = "Sprites/JShip.png";
canvasContext.drawImage(img, 10, 10);