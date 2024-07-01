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
    constructor(x, y, xSpeed, ySpeed, imgSrc, boundingBox) {
        this.x = x;
        this.y = y;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.img.src = imgSrc;
        this.boundingBox = boundingBox;
    }   

    moveProjectile() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    drawProjectile() {
        canvasContext.drawImage(this.img, this.x, this.y);
    }
}

function moveProjectiles() {
    projectileList.forEach((element) => element.moveProjectile());
}

function drawProjectiles() {
    projectileList.forEach((element) => element.drawProjectile());
}


class JShip { 

    img = new Image();
    boundingBox = new Rectangle(0, 0, 32, 32);
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

    shoot() {
        if(keyZ) {
            var p = new Projectile(this.x, this.y - 32, 0, -8, "Sprites/laser.png", new Rectangle(0, 0, 0, 0)); 
            projectileList.push(p);
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
    drawProjectiles();
}   

function update() {
    moveProjectiles();
    ship.moveShip();
    ship.shoot();
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