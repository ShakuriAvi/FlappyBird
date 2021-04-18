var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var btnPlay = document.getElementById('button');
var label = document.getElementById('label');
var level = document.getElementById('nextLevel');
var buttonAudio = document.getElementById('buttonAudio');

var audio = new Audio();
audio.src = src = "sfx_wing.mp3";

var backgroundHomePage = new Image();
backgroundHomePage.src = "backgroundHomePage.jpg";
backgroundHomePage.addEventListener("load", homePage, false);

var gameWidth = 1500;
var gameHeight = 600;

var birdWidth = 90;
var birdHeight = 60;

pipeWidth = 400;
pipeHeight = 160;
var bX = 10;
var bY = 300;
var gap = 75;
var count = 1;
var gravity = 1.5;
var speed = 2;
var distance = 700;
var score = 0;
var play = true;


var bird = new Image();
bird.src = "birds.png";

var background = new Image();
background.src = "background.png";

var finishBackground = new Image();
finishBackground.src = "finishBackground.png";

var pipeDown = new Image();
pipeDown.src = "pipeDown.png";

var pipeUp = new Image();
pipeUp.src = "pipeUp.png";

var min = (-1 * (gameHeight - pipeHeight - birdHeight - gap));
var max = (pipeHeight);

var pipes = [];

// on key down
document.addEventListener("keydown", moveUp);

function moveUp() {
    bY -= 25;
}
pipes[0] = {
    x: canvas.width - 700,
    y: -pipeHeight,

}

function initGame() {
    pipes = [];
    pipes[0] = {
        x: canvas.width - 700,
        y: -pipeHeight,
    }
    bY = 300;
    distance = 700;
    score = 0;
    buttonAudio.style.visibility = 'visible';
}
// game

function game() {
    btnPlay.style.visibility = 'hidden';
    ctx.drawImage(background, 0, 0, gameWidth, gameHeight);
    ctx.drawImage(bird, bX, bY, birdWidth, birdHeight);

    start();
}

function start() {
    drawShow();
    if (play) {
        for (var i = 0; i < pipes.length; i++) {
            audio.play();
            ctx.drawImage(pipeDown, pipes[i].x, 0, pipeWidth, pipeHeight);
            ctx.drawImage(pipeUp, pipes[i].x, gameHeight, pipeWidth, pipes[i].y);
            pipes[i].x -= speed;

            if (pipes[i].x == distance) {
                pipes.push({
                    x: canvas.width - 200,
                    y: Math.floor(Math.random() * max) + min

                });

            }
            if (count % 6 == 0) {
                nextLevel();
            }
            if ((bY >= pipes[i].y + gameHeight - 50 || bY <= pipeHeight) && (bX >= pipes[i].x + 93 && bX <= pipes[i].x + 250)) {

                play = false;


            } else if (bX >= pipes[i].x + 250) {
                pipes.shift();
                i--;
                count++;
                score++;
            }

        }

        bY += gravity;
        requestAnimationFrame(game);
    } else {

        finish();
    }
}

function finish() {
    ctx.clearRect(0, 0, gameWidth, gameHeight);
    ctx.drawImage(finishBackground, 0, 0, gameWidth, gameHeight);
    level.style.visibility = 'hidden';
    buttonAudio.style.visibility = 'hidden';
    btnPlay.style.visibility = 'visible';
    label.style.visibility = 'visible';
    console.log(finishBackground);
    btnPlay.innerHTML = "Return To Home Game";
    label.innerText = " Your score is: " + score;
}

function homePage() {
    ctx.clearRect(0, 0, gameWidth, gameHeight);
    level.style.visibility = 'hidden';
    label.style.visibility = 'hidden';
    buttonAudio.style.visibility = 'hidden';
    ctx.drawImage(backgroundHomePage, 0, 0, gameWidth, gameHeight);
    // console.log("after");
}

function drawShow() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFFFE0";
    ctx.fillText("Score: " + score, 8, 20);


}

buttonAudio.addEventListener('click', () => {
    console.log(audio.muted);
    if (!audio.muted) {
        buttonAudio.innerHTML = "unmute";

        audio.muted = true;
    } else {
        buttonAudio.innerHTML = "mute";
        buttonAudio.border = "red";
        audio.muted = false;
    }
})

btnPlay.onclick = function() {
    console.log(play);
    if (play) {
        initGame();
        ctx.clearRect(0, 0, gameWidth, gameHeight);

        game();
    } else {
        ctx.clearRect(0, 0, gameWidth, gameHeight);
        play = true;
        btnPlay.innerHTML = "Let's Start the Game";
        label.style.visibility = 'hidden';
        homePage();

    }

}

function nextLevel() {
    count = 1;
    // let anim = Animation(() => {

    setTimeout(() => {

        level.style.visibility = 'visible';
        level.innerText = " Your level is: " + (score / 5);

        console.log("alert!!!");
    }, 3000);
    level.style.visibility = 'hidden';

    if (distance != 1000)
        distance += 50;
    console.log(speed);
    console.log(distance);
}


homePage();