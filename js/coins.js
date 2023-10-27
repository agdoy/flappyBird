class Coins {

    constructor(gameScreen, gameSize, obstacles) {
        this.gameScreen = gameScreen;
        this.gameSize = gameSize;
        this.obstacles = obstacles;

        this.coinSize = {
            w: 30,
            h: 30
        }


        this.coinPosition = {
            left: gameSize.w,
            top: Math.floor(Math.random() * (gameSize.h - this.coinSize.h))
        }

        this.coinVel = {
            left: 3
        }

        this.init();
    }

    init() {
        this.coinElement1 = document.createElement('img');
        this.coinElement1.src = "./img/coin.png";
        this.coinElement1.style.position = "absolute";
        this.coinElement1.style.width = `${this.coinSize.w}px`;
        this.coinElement1.style.height = `${this.coinSize.h}px`;
        this.coinElement1.style.left = `${this.coinPosition.left}px`;
        this.coinElement1.style.top = `${this.coinPosition.top}px`;
        this.coinElement1.style.borderRadius = "50%";

        this.gameScreen.appendChild(this.coinElement1);
    }

    move() {
        this.coinPosition.left -= this.coinVel.left;
        this.updatePosition();
    }

    updatePosition() {
        this.coinElement1.style.left = `${this.coinPosition.left}px`;
        this.coinElement1.style.top = `${this.coinPosition.top}px`;
    }
}

