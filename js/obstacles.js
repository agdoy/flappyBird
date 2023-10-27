class Obstacle {

    constructor(gameScreen, gameSize) {

        this.gameScreen = gameScreen;
        this.gameSize = gameSize;




        this.obstacleSize1 = {
            w: 50,
            h: this.gameSize.h - (Math.floor(Math.random() * (600 - 400) + 400))

        }



        this.obstacleSize2 = {
            w: 50,
            h: this.gameSize.h - this.obstacleSize1.h - 215,


        }

        this.obstaclePos1 = {
            left: gameSize.w,
            top: this.gameSize.h - this.obstacleSize1.h,
        }

        this.obstaclePos2 = {
            left: gameSize.w,
            top: 0,
        }

        this.obstacleVel = {
            left: 5

        }

        this.init()
    }

    init() {
        this.obstacleElement1 = document.createElement('img')
        this.obstacleElement2 = document.createElement('img')
        this.obstacleElement2.src = "./img/pipetop.png"
        this.obstacleElement1.src = "./img/pipebot.png"

        this.obstacleElement1.style.position = "absolute"
        this.obstacleElement1.style.backgroundColor = `green`
        this.obstacleElement1.style.width = `${this.obstacleSize1.w}px`
        this.obstacleElement1.style.height = `${this.obstacleSize1.h}px`
        this.obstacleElement1.style.left = `${this.obstaclePos1.left}px`
        this.obstacleElement1.style.top = `${this.obstaclePos1.top}px`


        this.obstacleElement2.style.position = "absolute"
        this.obstacleElement2.style.backgroundColor = `green`
        this.obstacleElement2.style.width = `${this.obstacleSize2.w}px`
        this.obstacleElement2.style.height = `${this.obstacleSize2.h}px`
        this.obstacleElement2.style.left = `${this.obstaclePos2.left}px`
        this.obstacleElement2.style.top = `${this.obstaclePos2.top}px`


        this.gameScreen.appendChild(this.obstacleElement1)
        this.gameScreen.appendChild(this.obstacleElement2)
    }

    move() {
        this.obstaclePos1.left -= this.obstacleVel.left
        this.obstaclePos2.left -= this.obstacleVel.left
        this.updatePosition()

    }

    updatePosition() {
        this.obstacleElement1.style.left = `${this.obstaclePos1.left}px`
        this.obstacleElement1.style.top = `${this.obstaclePos1.top}px`

        this.obstacleElement2.style.left = `${this.obstaclePos2.left}px`
        this.obstacleElement2.style.top = `${this.obstaclePos2.top}px`
    }

}