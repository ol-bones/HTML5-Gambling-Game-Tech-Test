class Mouse {
    constructor(canvas) {
        canvas.addEventListener("click", this.onClick, false);
    }

    onClick(e) {
        for(var element of g_Game.m_GameElements) {
            if(e.clientX > element.m_Position.x && e.clientX < element.m_Position.x + element.m_Size.x
            && e.clientY > element.m_Position.y && e.clientY < element.m_Position.y + element.m_Size.y)
            {
                element.onClick();
            }
        }
    }
}
