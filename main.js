var canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
var keyZ = false;
var keyUp = false;
var keyDown = false;
var keyLeft = false;
var keyRight = false;
var bg = new Image();
var bgY2 = -480;
var bgY = 0;
var bgSpeed = 10;
bg.src = "Sprites/Background.png"
const projectileList = [];

addEventListener ('keydown', function(event) {
    if(event.code == "KeyZ") {
        keyZ = true;
    }  
    if (event.code == "ArrowUp") {
        keyUp = true;
    }  
    if (event.code == "ArrowDown") {
        keyDown = true;
    }  
    if (event.code == "ArrowRight") {
        keyRight = true;          
    }  
    if (event.code == "ArrowLeft") {
        keyLeft = true;
    }
});

addEventListener ('keyup', function(event) {
    if(event.code == "KeyZ") {
        keyZ = false;
    } 
    if (event.code == "ArrowUp") {
        keyUp = false;
    } 
    if (event.code == "ArrowDown") {
        keyDown = false;
    } 
    if (event.code == "ArrowRight") {
        keyRight = false;          
    } 
    if (event.code == "ArrowLeft") {
        keyLeft = false;
    }
});


class Rectangle {
    x = 0;
    y = 0;
    width = 0;
    height = 0;

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    intersects(r2) {
        var r1 = this;
        return !(r2.x > r1.x + r1.width ||
            r2.x + r2.width < r1.x ||
            r2.y > r1.y + r1.height ||
            r2.y + r2.height < r1.y);
    }

}

class Projectile {
    xSpeed = 0;
    ySpeed = 0;
    x = 0;
    y = 0;
    img = new Image();
    boundingBox = new Rectangle()
    constructor(x, y, xSpeed, ySpeed, imgSrc) {
        this.x = x;
        this.y = y;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.img.src = imgSrc;
    }   

    moveProjectile() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    drawProjectile() {
        canvasContext.drawImage(this.img, this.x, this.y);
    }
}


class JShip { 

    img = new Image();
    constructor(x, y) {
        this.x = x;
        this.y = y;    
        this.img.src = "Sprites/JShip.png";
    }
    
    moveShip() {
        if(keyRight) {
            this.x += 5;
        }  
        if (keyLeft) {
            this.x -= 5;
        }  
        if (keyDown) {
            this.y += 5;
        }  
        if (keyUp) {
            this.y -= 5;
        }
    }

    drawShip (ctx) {
        ctx.drawImage(this.img, this.x, this.y);
    }

}

const ship = new JShip(10, 10);

function moveBG() {
    bgY += bgSpeed; // background scroll speed  
    bgY2 += bgSpeed; 
    if(bgY >= 480) {
        bgY = -480;
    }  
    if(bgY2 >= 480) {
        bgY2 = -480;
    }
}


function repaint() {
    canvasContext.drawImage(bg, 160, bgY2);
    canvasContext.drawImage(bg, 160, bgY);
    ship.drawShip(canvasContext);
}

function update() {
    ship.moveShip();
    moveBG();
}

function drawScreen() {

    canvasContext.clearRect(0, 0, 640, 480);
    canvasContext.save();
    repaint();
    update();
    canvasContext.restore();
    requestAnimationFrame(drawScreen);
}


drawScreen();