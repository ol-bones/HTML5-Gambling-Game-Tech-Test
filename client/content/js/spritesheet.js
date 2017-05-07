class Spritesheet {
    constructor(filepath) {
        this.m_Path = filepath;

        this.m_Image = new Image();
        this.m_Image.src = filepath + ".png";
        this.m_Image.onload = this.load.call(this);
        this.m_ImageWidth = -1;
        this.m_ImageHeight = -1;

        this.m_Frames = -1;
        this.m_FrameWidth = -1;
        this.m_FrameHeight = -1;
        this.m_FramePositions = [];

        this.m_CurrentFrame = -1;
    }

    load(e) {
        console.log(this.m_Path);
        var data = $.getJSON(this.m_Path + ".json",
            null,
            (function(json) {
                console.log(json);
                this.m_Frames = json.frames;

                this.m_ImageWidth = json.width;
                this.m_ImageHeight = json.height;

                this.m_FrameWidth = json.framewidth;
                this.m_FrameHeight = json.frameheight;
                console.log(this);
                this.calculateFramePositions();
            }).bind(this)
        );
    }

    calculateFramePositions() {
        for(var y = 0; y < this.m_ImageHeight; y += this.m_FrameHeight) {
            for(var x = 0; x < this.m_ImageWidth; x += this.m_FrameWidth) {
                if(x >= this.m_ImageWidth && y < this.m_ImageHeight) {
                    x = 0;
                    break;
                } else {
                    this.m_FramePositions.push(new Vector2D(x, y));
                }
            }
        }

        this.m_CurrentFrame = 0;
        console.log(this.m_FramePositions);
    }

    draw(canvas, context, x, y, w, h) {
        context.drawImage(this.m_Image,
                          this.m_FramePositions[this.m_CurrentFrame].x,
                          this.m_FramePositions[this.m_CurrentFrame].y,
                          this.m_FrameWidth, this.m_FrameHeight, x, y,
                          w, h
        );
    }
}
