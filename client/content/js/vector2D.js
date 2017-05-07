class Vector2D {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    mul(scalar) {
        return new Vector2D(
            this.x * scalar,
            this.y * scalar
        );
    }
}
