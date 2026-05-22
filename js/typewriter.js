class TypeWriter {
    constructor(element, config) {
        this.element = element;
        this.strings = config.strings;
        this.typingSpeed = config.typingSpeed;
        this.eraseSpeed = config.eraseSpeed;
        this.pauseDuration = config.pauseDuration;

        this.currentString = 0;
        this.currentText = "";
        this.state = "typing";

        this.type();
    }

    type() {
        const fullString = this.strings[this.currentString];

        if (this.state === "typing") {
            this.currentText = fullString.slice(0, this.currentText.length + 1);
            this.element.textContent = this.currentText;

            if (this.currentText === fullString) {
                this.state = "pausing";
                setTimeout(() => this.type(), this.pauseDuration);
            }
            else {
                setTimeout(() => this.type(), this.typingSpeed);
            }
        }

        else if (this.state === "pausing") {
            this.state = "erasing";
            this.type();
        }

        else if (this.state === "erasing") {
            this.currentText = this.currentText.slice(0, -1);
            this.element.textContent = this.currentText;

            if (this.currentText === "") {
                this.currentString = (this.currentString + 1) % this.strings.length;
                this.state = "typing";
                setTimeout(() => this.type(), this.pauseDuration);
            }
            else {
                setTimeout(() => this.type(), this.eraseSpeed);
            }
        }
    }
}

const element = document.getElementById("typed-text");

const writer = new TypeWriter(element, {
    strings: [
        "physics simulations",
        "discord bots",
        "tkinter GUI apps",
        "with python"
    ],
    typingSpeed: 50,
    eraseSpeed: 30,
    pauseDuration: 1500
})