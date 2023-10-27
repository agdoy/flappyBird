class Player {

    constructor(gameScreen, gameSize,) {

        this.gameScreen = gameScreen;
        this.gameSize = gameSize;


        this.playerSize = {
            w: 50,
            h: 50
        }

        this.playerPos = {
            left: 100,
            top: this.gameSize.h / 2 - this.playerSize.h,
        }

        this.playerVel = {
            left: 1,
            top: 0,
            gravity: 0.04,
        }
        this.playerBackgroundPos = {
            x: 0,
            y: 0
        }

        this.playerSprite = {
            backgroundPositionX: 0,
            totalFrames: 3,
            currentFrame: 1,
            frameSpeed: 4
        }


        this.init()
    }

    init() {


        this.playerElement = document.createElement('div')
        this.playerElement.style.position = "absolute"
        this.playerElement.style.width = `${this.playerSize.w}px`
        this.playerElement.style.height = `${this.playerSize.h}px`
        this.playerElement.style.left = `${this.playerPos.left}px`
        this.playerElement.style.top = `${this.playerPos.top}px`

        this.playerElement.style.backgroundImage = 'url(./img/flappybird.png)'
        this.playerElement.style.backgroundSize = '150px 50px'
        this.playerElement.style.overflow = 'hidden'
        this.playerElement.style.backgroundRepeat = 'no-repeat'
        this.playerElement.style.backgroundPositionX = '0px'

        this.gameScreen.appendChild(this.playerElement)
    }

    move(framesCounter) {

        this.playerPos.top += this.playerVel.top;
        this.playerVel.top += this.playerVel.gravity;
        this.animateSprite(framesCounter)
        this.updatePosition()
    }
    
    animateSprite(framesCounter) {

        if (framesCounter % this.playerSprite.frameSpeed == 0) {
            this.playerSprite.currentFrame++
        }
        if (this.playerSprite.currentFrame >= this.playerSprite.totalFrames) {
            this.playerSprite.currentFrame = 1
        }

        this.playerSprite.backgroundPositionX = -this.playerSize.w * this.playerSprite.currentFrame

        this.updateSprite()
    }

    moveLeft() {
        this.playerPos.left -= this.playerVel.left;
    }

    moveRight() {
        this.playerPos.left += this.playerVel.left;
    }
    
    updateSprite() {
        this.playerElement.style.backgroundPositionX = `${this.playerSprite.backgroundPositionX}px`;
    }

    updatePosition() {
        this.playerElement.style.left = `${this.playerPos.left}px`;
        this.playerElement.style.top = `${this.playerPos.top}px`;
    }

    updatePosition() {
        this.playerElement.style.left = `${this.playerPos.left}px`
        this.playerElement.style.top = `${this.playerPos.top}px`
    }

    jump() {

        this.playerPos.left-=this.playerVel.gravity
        this.playerPos.top -= 40;
        this.playerVel.top -= 3;
    }
}