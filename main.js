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
var enemyWaveInterval;
const enemyList = [];
var game = true;

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
        this.boundingBox.x += this.xSpeed;
        this.boundingBox.y += this.ySpeed;
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

class Enemy {
    img = new Image();
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.img.src = "Sprites/Enemy.png";
        this.boundingBox = new Rectangle(this.x, this.y, 32, 32);
    }
    moveShip() {
        this.y += 5;
        this.boundingBox.y += 5;
    }

    drawShip(ctx) {
        ctx.drawImage(this.img, this.x, this.y);
    }
}

class JShip {
    img = new Image();
    interval;
    constructor(x, y) {
        this.x = x;
        this.y = y;    
        this.img.src = "Sprites/JShip.png";
        this.boundingBox = new Rectangle(this.x, this.y, 32, 32);
    }
    
    moveShip() {
        if(keyRight && this.x  + 32 <= 480) {
            this.x += 5;
            this.boundingBox.x += 5;
        }  
        if (keyLeft && this.x >= 160) {
            this.x -= 5;
            this.boundingBox.x -= 5;
        }  
        if (keyDown && this.y + 32 <= 480) {
            this.y += 5;
            this.boundingBox.y += 5;
        }  
        if (keyUp && this.y >= 0) {
            this.y -= 5;
            this.boundingBox.y -= 5;
        }
    }

    shoot() {
        var p1 = new Projectile(this.x - 16, this.y - 32, 0, -8, "Sprites/laser.png", new Rectangle(this.x + 13, 0, 6, 32)); 
        var p2 = new Projectile(this.x + 16, this.y - 32, 0, -8, "Sprites/laser.png", new Rectangle(this.x + 13, 0, 6, 32)); 
        projectileList.push(p1);
        projectileList.push(p2);
    }

    drawShip (ctx) {
        ctx.drawImage(this.img, this.x, this.y);
    }

}

function spawnEnemy() {
    // width of background is 320
    var enemyXPos = 160 + ((Math.floor(Math.random() * 18) + 1) * 16);
    enemyList.push(new Enemy(enemyXPos, 0)); 
}

const ship = new JShip(304, 320);

function shipShoot() {
    ship.shoot();
}

function shootDelay() {
    if(keyZ) {
        if(!ship.interval) {
            ship.interval = setInterval(shipShoot, 200);
        }
    } else {
        clearInterval(ship.interval);
        ship.interval = null;
    }
}


function spawnEnemies() {
    if(game) {
        if(!enemyWaveInterval) {
            enemyWaveInterval = setInterval(spawnEnemy, 1000);
        }
    }
}

function moveEnemies() {
    enemyList.forEach((element) => element.moveShip());
}

function drawEnemies() {
    enemyList.forEach((element) => element.drawShip(canvasContext));
}

function killEnemies() {
    for(let i = 0; i < enemyList.length; i++) {
        for(let j = 0; j < projectileList.length; j++) {
            if(enemyList[i].boundingBox.intersects(projectileList[j].boundingBox)) {
                enemyList.splice(i, 1);
            }
        }
    }
}

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
    drawEnemies();
    drawProjectiles();
}   

function update() {
    moveProjectiles();
    spawnEnemies();
    ship.moveShip();
    moveEnemies();
    shootDelay();
    killEnemies();
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