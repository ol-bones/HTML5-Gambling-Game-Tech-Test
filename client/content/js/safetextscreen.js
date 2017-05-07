class SafeTextScreen {
    constructor() {
        this.Digits = ["_","_","_","_"];
        this.WinText = ["W","I","N"];

        this.InstructionText = "Get 2 in a row to win";

        this.CurrentIndex = 0;
        this.DisplayText = this.Digits;
    }

    setText(digit) {
        this.Digits[this.CurrentIndex] = digit;
        this.DisplayText = this.Digits;
        this.CurrentIndex++;
    }

    win() {
        this.DisplayText = this.WinText;
    }

    draw(canvas, context) {
        context.font = "150px Arial";
        context.fillText(this.DisplayText.join().replace(/,/g, ' '), 1275, 425);

        context.fillText(this.InstructionText,
            300, 200
        );
    }
}
