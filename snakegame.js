this.snake = this.snake || {};

snake.Game = (function() {
"use strict";

const constructor = function(canvas, width = 640, height = 480, columns = 64, rows = 48) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.width = width;
    this.height = height;
    
    this.engine = new snake.Engine(columns, rows);
    this.renderer = new snake.Renderer(canvas, width, height, columns, rows);
    
    this.settings = {
        menuBackgroundColor: "rgba(255, 255, 255, 0.25)",
        menuFont: "80px consolas",
        scoreFont: "20px consolas",
        scorePadding: 10,
        frameLength: 100
    };
    
    this.menuKeyDown = this.menuKeyDown.bind(this);
    this.gameKeyDown = this.gameKeyDown.bind(this);
};

const proto = constructor.prototype;


proto.drawBoard = function() {
    const cells = this.engine.getSnakePos();
    const food = this.engine.getFoodPos();
    this.renderer.draw(cells, food);
    
    
};

proto.openGame = function() {
    this.drawBoard();
    this.drawScore();
    document.addEventListener("keydown", this.gameKeyDown);
    this._interval = setInterval(this.tick.bind(this), this.settings.frameLength);
};

proto.closeGame = function() {
    clearInterval(this._interval);
    document.removeEventListener("keydown", this.gameKeyDown);
};

proto.gameKeyDown = function(e) {
    const engine = this.engine;
    switch (e.code) {
        case "ArrowUp":
        case "KeyW":
            engine.setDirection("up");
            break;
        case "ArrowRight":
        case "KeyD":
            engine.setDirection("right");
            break;
        case "ArrowDown":
        case "KeyS":
            engine.setDirection("down");
            break;
        case "ArrowLeft":
        case "KeyA":
            engine.setDirection("left");
            break;
        case "Escape":
            this.closeGame();
            this.openMenu("PAUSED");
            break;
    }
};

proto.drawMenu = function(message) {
    const ctx = this.ctx;
    const s = this.settings;

    ctx.fillStyle = s.menuBackgroundColor;
    ctx.fillRect(0, 0, this.width, this.height);
    
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = s.menuFont;
    ctx.fillStyle = "black";
    ctx.fillText(message, this.width / 2, this.height / 2);
};

proto.openMenu = function(message) {
    this.drawMenu(message);
    document.addEventListener("keydown", this.menuKeyDown);
};

proto.menuKeyDown = function(e) {
    if (e.code === "Enter") {
        document.removeEventListener("keydown", this.menuKeyDown);
        if (this.engine.gameOver) {
            this.engine.newGame();
        }
        this.openGame();
    }
};

proto.drawScore = function() {
    const ctx = this.ctx;
    const score = this.engine.score;
    const p = this.settings.scorePadding;
    
    ctx.textAlign = "left";
    ctx.textBaseline = "bottom";
    ctx.font = this.settings.scoreFont;
    ctx.fillStyle = "black";
    ctx.fillText(`Score: ${score}`, p, this.height - p);
};

proto.tick = function() {
    const engine = this.engine;
    engine.move();
    this.drawBoard();
    this.drawScore();
    if (engine.gameOver) {
        this.closeGame();
        this.openMenu("Game Over");
    }
};

return constructor;
})();