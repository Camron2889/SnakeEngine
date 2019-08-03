this.snake = this.snake || {};

snake.Engine = (function() {
"use strict";


//enums
const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

const constructor = function(width = 64, height = 64) {
    this.width = width;
    this.height = height;
    
    this.settings = {
        growthFromFood: 3,
        startingLength: 3,
        wrapAround: false
    };
    
    this._foodObj = {};
    this._snakeObj = {};
    
    this.newGame();
};

const proto = constructor.prototype;

proto.collisionTest = function(x, y) {
    let found = false;
    const cells = this._snakeObj.cells;
    
    for (let i = 0; i < cells.length; i++) {
        const c = cells[i];
        if (c[0] === x && c[1] === y) {
            found = true;
            break;
        }
    }

    return found;
};

proto.randomizeFood = function() {
    let x;
    let y;
    
    do {
        x = Math.floor(Math.random() * this.width);
        y = Math.floor(Math.random() * this.height);
    } 
    while (this.collisionTest(x, y))
        
    this._foodObj.x = x;
    this._foodObj.y = y;
};

proto.newGame = function() {
    //reset score
    this.score = 0;
    this.gameOver = false;
    
    //init snake
    this._tickDirection = UP;
    const snake = this._snakeObj;
    snake.cells = [[Math.floor(this.width / 2), Math.floor(this.height / 2)]];
    snake.direction = UP;
    snake.digesting = this.settings.startingLength - 1;
    
    //init food
    this.randomizeFood();
};

proto.move = function() {
    const snake = this._snakeObj;
    const cells = snake.cells;
    
    this._tickDirection = snake.direction;
    
    let headX = cells[0][0];
    let headY = cells[0][1];
    
    switch (snake.direction) {
        case UP:
            ++headY;
            break;
        case RIGHT:
            ++headX;
            break;
        case DOWN:
            --headY;
            break;
        case LEFT:
            --headX;
            break;
    }
    
    if (!this.settings.wrapAround) {
        if (headX < 0 || headX > this.width - 1 || headY < 0 || headY > this.height - 1) {
            this.gameOver = true;
        }
    }
    
    if (this.collisionTest(headX, headY)) {
        this.gameOver = true;
    }
    
    if (snake.digesting === 0) {
        const tail = cells.pop();
        tail[0] = headX;
        tail[1] = headY;
        cells.unshift(tail);
    } else {
        --snake.digesting;
        cells.unshift([headX, headY]);
    }
    
    const food = this._foodObj;
    if (food.x === headX && food.y === headY) {
        snake.digesting += this.settings.growthFromFood;
        ++this.score;
        this.randomizeFood();
    }
};

proto.setDirection = function(d) {
    const snake = this._snakeObj;
    const tdir = this._tickDirection;
    switch (d) {
        case UP:
        case "up":
            if (tdir !== DOWN) {
                snake.direction = UP;
            }
            break;
        case RIGHT:
        case "right":
            if (tdir !== LEFT) {
                snake.direction = RIGHT;
            }
            break;
        case DOWN:
        case "down":
            if (tdir !== UP) {
                snake.direction = DOWN;
            }
            break;
        case LEFT:
        case "left":
            if (tdir !== RIGHT) {
                snake.direction = LEFT;
            }
            break;
    }
};

proto.getSnakePos = function() {
    return this._snakeObj.cells;
};

proto.getFoodPos = function() {
    return this._foodObj;
};


return constructor;
})();