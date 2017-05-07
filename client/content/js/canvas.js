class Canvas {
    constructor() {
        this.m_FrontBufferCanvas = $(".game-canvas")[0];
        this.m_BackBufferCanvas = ($(this.m_FrontBufferCanvas).clone())[0];

        this.m_FrontBufferCanvas.width = 1920;
        this.m_FrontBufferCanvas.height = 1080;

        this.m_BackBufferCanvas.width = this.m_FrontBufferCanvas.width;
        this.m_BackBufferCanvas.height = this.m_FrontBufferCanvas.height;

        console.info(this.m_FrontBufferCanvas);
        console.info(this.m_BackBufferCanvas);

        this.m_FrontBufferContext = this.m_FrontBufferCanvas.getContext("2d");
        this.m_BackBufferContext = this.m_BackBufferCanvas.getContext("2d");

        requestAnimationFrame(this.draw.bind(this));
    }

    draw() {
        this.m_FrontBufferCanvas.width = this.m_FrontBufferCanvas.width;
        this.m_BackBufferCanvas.width = this.m_BackBufferCanvas.width;

        for(let element of g_Game.m_GameElements) {
            element.draw(this.m_BackBufferCanvas, this.m_BackBufferContext);
        }

        g_Game.TextScreen.draw(this.m_BackBufferCanvas, this.m_BackBufferContext);

        for(let particle of g_Game.m_ParticleEffects) {
            particle.draw(this.m_BackBufferCanvas, this.m_BackBufferContext);
        }

        this.m_BackBufferContext.strokeStyle = "#FF0000";
        this.m_BackBufferContext.beginPath();
        this.m_BackBufferContext.moveTo(0,0);
        this.m_BackBufferContext.lineTo(10,10);
        this.m_BackBufferContext.stroke();
        this.m_FrontBufferContext.drawImage(this.m_BackBufferCanvas, 0, 0);

        requestAnimationFrame(this.draw.bind(this));
    }
}
