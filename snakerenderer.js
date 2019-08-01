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
    
    ctx.fillStyle = s.backgroundColor;
    ctx.fillRect(0, 0, cw, ch);
    
    const ctx = this.ctx;
    const s = this.settings;
    const tw = this._tileWidth;
    const th = this._tileHeight;
    
    ctx.fillStyle = s.snakeColor;
    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        
        const cellX = cw - cell[0] - tw;
        const cellY = ch - cell[1] - th;
        ctx.strokeRect(cellX, cellY, tw, th);
    }
    
    const foodX = cw - food.x - tw;
    const foodY = ch - food.y - th;
    ctx.fillStyle = s.foodColor;
    ctx.strokeRect(foodX, foodY, tw, th)
};


return constructor;
})();