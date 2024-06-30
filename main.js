var canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");

const keyMap = new Map();

addEventListener ('keydown', function(event) {
    if(event.code == "KeyZ") {
        keyMap.set("z", true)
    }  
    if (event.code == "ArrowUp") {
        keyMap.set("up", true);
    }  
    if (event.code == "ArrowDown") {
        keyMap.set("down", true);
    }  
    if (event.code == "ArrowRight") {
        keyMap.set("right", true);
    }  
    if (event.code == "ArrowLeft") {
        keyMap.set("left", true);
    }
});

addEventListener ('keyup', function(event) {
    if(event.code == "KeyZ") {
        keyMap.set("z", false)
    }  
    if (event.code == "ArrowUp") {
        keyMap.set("up", false);
    }  
    if (event.code == "ArrowDown") {
        keyMap.set("down", false);
    }  
    if (event.code == "ArrowRight") {
        keyMap.set("right", false);
    }  
    if (event.code == "ArrowLeft") {
        keyMap.set("left", false);
    }
});

class JShip { 

    img = new Image();
    constructor(x, y) {
        this.x = x;
        this.y = y;    
        this.img.src = "Sprites/JShip.png";
    }
    
    moveShip() {
        if(keyMap.get("right")) {
            this.x += 10;
        }  
        if (keyMap.get("left")) {
            this.x -= 10;
        }  
        if (keyMap.get("down")) {
            this.y += 10;
        }  
        if (keyMap.get("up")) {
            this.y -= 10;
        }
    }

    drawShip (ctx) {
        ctx.drawImage(this.img, this.x, this.y);
    }

}

const ship = new JShip(10, 10);



function drawScreen() {

    canvasContext.clearRect(0, 0, 640, 480);

    canvasContext.save();
    ship.drawShip(canvasContext);
    ship.moveShip();
    canvasContext.restore();
    requestAnimationFrame(drawScreen);
}


drawScreen();