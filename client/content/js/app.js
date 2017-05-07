"use strict";

var g_Game = new Game();

function init() {
    var game_canvas;

    game_canvas = $(".game-canvas")[0];
    console.info(game_canvas);
    if(!game_canvas) {
        console.error("Error: no canvas obj");
    }

    var canvasObj = new Canvas();
    console.info(canvasObj);

    var mouse = new Mouse(canvasObj.m_FrontBufferCanvas);
}

$(document).ready(init);
