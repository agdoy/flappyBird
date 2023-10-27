const musicBackground = new Audio("../sfx/background.mp3")




const Game = {

    gameScreen: document.querySelector("#game-screen"),

    gameSize: {
        w: window.innerWidth, //ref gamescreen
        h: window.innerHeight //ref gamescreen
    },

    framesCounter: 0,

    background: undefined,
    player: undefined,
    obstacles: [],
    coins: [],
    score: 0,

    obstacleDensity: 300,
    coinDensity: 500,

    init() {
        this.setDimensions()
        this.start()
        this.setEventListeners()
    },

    keys: { jump: 'w' }, //controles

    setDimensions() {
        this.gameScreen.style.width = `${this.gameSize.w}px`//tamaño gamescreen
        this.gameScreen.style.height = `${this.gameSize.h}px`//tamaño gamescreen
    },

    setEventListeners() {
        document.addEventListener("keydown", e => {

            if (e.key === this.keys.jump) { //check kwe to jump
                this.player.jump()
            }
        });
    },

    start() {
        this.createElements()
        this.gameLoop()
    },

    gameLoop() {

        musicBackground.play()
        this.drawAll()
        this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++
        this.clearAll()
        this.generateObstacles()
        this.isCollisionCoin()
        this.winCondition() && this.winner()
        this.isCollision() && this.gameOver()
        if (this.player.playerPos.top <= 0 || this.player.playerPos.top + this.player.playerSize.h >= this.gameSize.h) {
            this.gameOver()
        }
        this.generateCoin()




        window.requestAnimationFrame(() => this.gameLoop())

    },

    createElements() {
        this.background = new Background(this.gameScreen, this.gameSize)
        this.player = new Player(this.gameScreen, this.gameSize, this.playerPos, this.PlayerSize)
        this.obstacles = []
        this.coins = []

        this.scoreDisplay = document.createElement('div');
        this.scoreDisplay.style.position = 'absolute'
        this.scoreDisplay.style.top = '10px'
        this.scoreDisplay.style.left = '50%'
        this.scoreDisplay.textContent = `Score: ${this.score}`
        this.scoreDisplay.style.color = `white`
        this.scoreDisplay.style.fontFamily = `Pixelify Sans`
        this.scoreDisplay.style.fontSize = `25px`
        this.scoreDisplay.style.border = `20px`
        this.scoreDisplay.style.borderColor = `white`

        this.gameScreen.appendChild(this.scoreDisplay)

    },

    drawAll() {
        this.background.move()
        this.player.updatePosition()
        this.player.move()
        this.player.move(this.framesCounter)
        this.obstacles.forEach(obs => obs.move())
        this.coins.forEach(coin => coin.move())

    },
    generateObstacles() {
        if (this.framesCounter % this.obstacleDensity === 0) {
            this.obstacles.push(new Obstacle(this.gameScreen, this.gameSize))
        }

    },

    generateCoin() {
        if (this.framesCounter % this.coinDensity === 0) {
            this.coins.push(new Coins(this.gameScreen, this.gameSize))

        }
    },



    updateScore() {
        this.score += 1;
        this.scoreDisplay.textContent = `Score: ${this.score}`;
    },

    winCondition() {
        return this.score === 10
    },

    clearAll() {
        this.obstacles.forEach((obs, idx) => {
            if (obs.obstaclePos1.left <= 0) {
                obs.obstacleElement1.remove()
                obs.obstacleElement2.remove()
                this.obstacles.splice(idx, 1)
            }
        })
    },

    isCollisionCoin() {
        for (let i = 0; i < this.coins.length; i++) {
            if (
                (this.player.playerPos.left + this.player.playerSize.w >= this.coins[i].coinPosition.left &&
                    this.player.playerPos.top + this.player.playerSize.h >= this.coins[i].coinPosition.top) &&
                (this.player.playerPos.left <= this.coins[i].coinPosition.left + this.coins[i].coinSize.w) &&
                (this.player.playerPos.top <= this.coins[i].coinPosition.top + this.coins[i].coinSize.h) &&
                (this.player.playerPos.top + this.player.playerSize.h >= this.coins[i].coinPosition.top + this.coins[i].coinSize.h)
            ) {

                this.coins[i].coinElement1.remove();
                this.coins.splice(i, 1);


                this.updateScore();



            }
        }
    },

    isCollision() {
        for (let i = 0; i < this.obstacles.length; i++) {
            if (
                ((this.player.playerPos.left + this.player.playerSize.w >= this.obstacles[i].obstaclePos1.left &&
                    this.player.playerPos.top + this.player.playerSize.h >= this.obstacles[i].obstaclePos1.top) ||
                    (this.player.playerPos.left + this.player.playerSize.w >= this.obstacles[i].obstaclePos2.left &&
                        this.player.playerPos.top <= this.obstacles[i].obstacleSize2.h)) &&
                (this.player.playerPos.left <= this.obstacles[i].obstaclePos1.left + this.obstacles[i].obstacleSize1.w ||
                    this.player.playerPos.left <= this.obstacles[i].obstaclePos2.left + this.obstacles[i].obstacleSize2.w
                )
            ) {
                return true
            }
        }

    },

    winner() {
        alert('sheeeesh')

    },


    gameOver() {
        alert('GAME OVER')
    }


}
