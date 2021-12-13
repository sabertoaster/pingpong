const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
var ball = $('.ball')
var gameBoard = $('.game-board')
var player1 = $('.player-1')
var player2 = $('.player-2')
var score1 = $('.score-1')
var score2 = $('.score-2')
var heading = $('h3')

var gameGridRows = 1000
var player1XPosition = 100
var player2XPosition = 900
var GAME_SPEED = 0.1;
function gamePlay() {

    var max = Math.floor(gameGridRows * 11 / 12)
    var min = Math.floor(gameGridRows * 1 / 12)
    var ramdomY = Math.floor(Math.random() * max + min)
    var ballPosition = { x: gameGridRows / 2, y: ramdomY }

    var ballMove = {
        right: { x: 1, y: 0 },
        left: { x: -1, y: 0 },
        down: { x: 0, y: 1 },
        up: { x: 0, y: -1 },
    }

    var isMoveUp = false
    var isMoveDown = false
    var isMoveLeft = false
    var isMoveRight = false

    var player1State = {
        victory: false,
        y: gameGridRows / 2,
        score: 0,
    }
    var player2State = {
        victory: true,
        y: gameGridRows / 2,
        score: 0,
    }

    var round = 1
    heading.innerHTML = `ROUND<span class="round">${round}</span>`


    player1.style.gridRowStart = player1State.y
    player2.style.gridRowStart = player2State.y


    if (player1State.victory) {
        isMoveRight = true

        var random = Math.floor(Math.random() * 2 + 1)
        if (random === 1) {
            isMoveUp = true
        } else {
            isMoveDown = true
        }
    }
    if (player2State.victory) {
        isMoveLeft = true
        var random = Math.floor(Math.random() * 2 + 1)
        if (random === 1) {
            isMoveUp = true
        } else {
            isMoveDown = true
        }
    }
    
    // control button
    window.addEventListener('keydown', function (e) {
        switch (e.key) {
            case ("ArrowUp"): {
                if (player1State.y >= 15) {
                    player1State.y -= 25
                    player1.style.gridRowStart = player1State.y
                }
            }
                break
            case ("ArrowDown"): {
                if (player1State.y <= 885) {
                    player1State.y += 25
                    player1.style.gridRowStart = player1State.y
                }
            }
                break
        }
    })


    var co1 = 0, co2 = 0
    var isUp = true, isDown = false
    var ballInterval = setInterval(function () {
        if (player1State.score == 10 || player2State.score == 10) {
            round += 1
            player2State.score = 0
            player1State.score = 0
            co1 = 0
            co2 = 0
            score1.innerHTML = `<div class="animate"><span>${player1State.score}</span>`
            score2.innerHTML = `<div class="animate"><span>${player2State.score}</span>`

            heading.innerHTML = `ROUND<span class="round">${round}</span>`
        }


        if (isMoveRight) {
            ballPosition.x += ballMove.right.x
            ball.style.gridColumnStart = ballPosition.x
        }

        if (ballPosition.x > gameGridRows) {
            player1State.victory = true
            player2State.victory = false
            ballPosition.x = gameGridRows / 2
            co1 += 1
            player1State.score = co1
        }

        if (isMoveLeft) {
            ballPosition.x += ballMove.left.x
            ball.style.gridColumnStart = ballPosition.x
        }

        if (ballPosition.x < 0) {
            player1State.victory = false
            player2State.victory = true
            ballPosition.x = gameGridRows / 2
            co2 += 1
            player2State.score = co2
        }

        score1.innerHTML = `<div class="animate"><span>${player1State.score}</span>`
        score2.innerHTML = `<div class="animate"><span>${player2State.score}</span>`

        if (isMoveUp) {
            ballPosition.y += ballMove.up.y
            ball.style.gridRowStart = ballPosition.y
            if (ballPosition.y < 0) {
                isMoveDown = true
                isMoveUp = false
            }
        }
        if (isMoveDown) {
            ballPosition.y += ballMove.down.y
            ball.style.gridRowStart = ballPosition.y
            if (ballPosition.y > gameGridRows) {
                isMoveDown = false
                isMoveUp = true
            }
        }
        if (ballPosition.x <= player1XPosition + 20 && ballPosition.x >= player1XPosition) {
            if (ballPosition.y >= player1State.y && ballPosition.y <= player1State.y + 100) {
                isMoveLeft = false
                isMoveRight = true
            }
        }
        if (ballPosition.x >= player2XPosition - 20 && ballPosition.x <= player2XPosition) {
            if (ballPosition.y >= player2State.y && ballPosition.y <= player2State.y + 100) {
                isMoveLeft = true
                isMoveRight = false
            }
        }

        if (ballPosition.x < gameGridRows / 2) {
            if (isUp) {
                player2State.y -= 0.5
                player2.style.gridRowStart = player2State.y
                if (player2State.y <= 0) {
                    isDown = true
                    isUp = false
                }
            }
            if (isDown) {
                player2State.y += 0.5
                player2.style.gridRowStart = player2State.y
                if (ballPosition.y >= 500) {
                    isDown = false
                    isUp = true
                }
            }
        }

        if (ballPosition.x >= gameGridRows / 2) {

            if (player2State.y > ballPosition.y) {
                player2State.y -= 1.5
                player2.style.gridRowStart = player2State.y
            }

            if (player2State.y < ballPosition.y - 100) {
                player2State.y += 1.5
                player2.style.gridRowStart = player2State.y
            }
        }

    }, GAME_SPEED)

}

gamePlay();
