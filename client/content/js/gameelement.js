class GameElement {
    constructor(config) {
        this.m_Children = [];

        this.m_Name = config;
        this.m_Show = true;

        this.m_Angle = 0;

        this.m_Spritesheet = null;
        this.m_Position = new Vector2D(-1,-1);
        this.m_Size = new Vector2D(-1,-1);

        this.m_Behaviours = [];

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

                for(let func of json.behaviours) {
                    this.m_Behaviours.push(new Function(func));
                }

                console.log(this);
            }).bind(this)
        );
    }

    hide() {
        this.m_Show = false;
    }

    show() {
        this.m_Show = true;
    }

    onClick() {
        if(this.m_Behaviours[0]) {
            this.m_Behaviours[0].call(this);
        }
    }

    update() {
    }

    draw(canvas, context) {
        if(!this.m_Show) { return; }
        if(!this.m_Spritesheet || this.m_Spritesheet.m_CurrentFrame === -1) { return; }

        context.save(); {
            context.translate(
                this.m_Spritesheet.m_FrameWidth+this.m_Position.x,
                this.m_Spritesheet.m_FrameHeight+this.m_Position.y
            );
            context.rotate(this.m_Angle);
            context.translate(
                -this.m_Spritesheet.m_FrameWidth+(-this.m_Position.x),
                -this.m_Spritesheet.m_FrameHeight+(-this.m_Position.y)
            );
            if(this.m_Children && this.m_Children.length >= 1) {
                for(let child of this.m_Children) {
                    child.draw(canvas, context, child.m_Position.x, child.m_Position.y, this.m_Size.x, this.m_Size.y);
                }
            }
            this.m_Spritesheet.draw(canvas, context, this.m_Position.x, this.m_Position.y, this.m_Size.x, this.m_Size.y);
        }
        context.restore();
    }
}
