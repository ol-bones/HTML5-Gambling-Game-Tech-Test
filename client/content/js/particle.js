class Particle {

    constructor(config) {
        this.m_Life = -1;
        this.m_StartSize = new Vector2D(-1, -1);
        this.m_EndSize = new Vector2D(-1, -1);
        this.m_Speed = -1;
        this.m_Direction = new Vector2D(
            Math.random(),
            Math.random()
        );

        this.m_Spritesheet = null;
        this.m_Position = new Vector2D(-1,-1);
        this.m_Size = new Vector2D(-1,-1);

        this.m_Grow = true;
        this.m_Dead = false;

        this.loadElementConfig(config);
    }

    loadElementConfig(config) {
        var data = $.getJSON("elementconfigs/" + config + ".json", null,
            (function(json) {
                console.log(json);
                this.m_Spritesheet = new Spritesheet(json.spritesheet);

                this.m_Position.x = json.x;
                this.m_Position.y = json.y;

                this.m_Size.x = json.width;
                this.m_Size.y = json.height;

                this.m_Life = json.life;
                this.m_StartSize = json.startsize;
                this.m_EndSize = json.endsize;
                this.m_Speed = json.speed;

                this.m_Size = new Vector2D(
                    json.startsize,
                    json.startsize
                );
            }).bind(this)
        );
    }

    update() {
        if(this.m_Dead) { return; }
        if(this.m_Grow) {
            this.m_Size.x += 1;
            this.m_Size.y += 1;
        } else {
            this.m_Size.x -= 1;
            this.m_Size.y -= 1;
        }
        if(this.m_Size.x >= this.m_EndSize/2) {
            this.m_Grow = false;
        } else if(this.m_Size.x <= 0 && !this.m_Grow) {
            this.m_Dead = true;
        }

        this.m_Position.add(this.m_Direction.mul(this.m_Speed));
    }

    draw(canvas, context) {
        if(!this.m_Spritesheet || this.m_Spritesheet.m_CurrentFrame === -1 || this.m_Dead) { return; }
        this.m_Spritesheet.draw(canvas, context, this.m_Position.x, this.m_Position.y, this.m_Size.x, this.m_Size.y);
    }
}
