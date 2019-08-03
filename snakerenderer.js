this.snake = this.snake || {};

snake.Renderer = (function() {
"use strict";


const constructor = function(canvas, width = 640, height = 480, columns = 64, rows = 48) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    
    canvas.width = width;
    canvas.height = height;
    
    this._tileWidth = width / columns;
    this._tileHeight = height / rows;
    
    this.settings = {
        backgroundColor: "rgba(0, 0, 0, 0)",
        snakeColor: "rgba(0, 255, 0, 1)",
        foodColor: "rgba(255, 0, 0, 1)",
    };
};

const proto = constructor.prototype;

proto.draw = function(cells, food) {
    const cw = this.canvas.width;
    const ch = this.canvas.height;
    const ctx = this.ctx;
    
    
    ctx.clearRect(0, 0, cw, ch);
    
    const tw = this._tileWidth;
    const th = this._tileHeight;
    const s = this.settings;
    
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
    
    ctx.fillStyle = s.snakeColor;
    
    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        
        const cellX = cell[0] * tw;
        const cellY = ch - (cell[1] * th) - th;
        ctx.fillRect(cellX, cellY, tw, th);
        ctx.strokeRect(cellX + 1, cellY + 1, tw - 2, th - 2);
    }
    
    const foodX = food.x * tw;
    const foodY = ch - (food.y * th) - th;
    ctx.fillStyle = s.foodColor;
    ctx.fillRect(foodX, foodY, tw, th)
    ctx.strokeRect(foodX + 1, foodY + 1, tw - 2, th - 2);
};


return constructor;
})();