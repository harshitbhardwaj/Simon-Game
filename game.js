var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedColour = []

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    level++;
    $('h1').text("LEVEL " + level);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(randomNumber);
    // $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    animatePress(randomNumber);
    playsound(randomChosenColour);
}

//click here
$(".btn").click(function (event) {
    var userChosenColour = event.currentTarget.id;
    userClickedColour.push(userChosenColour);
    playsound(userChosenColour);
    if (userClickedColour.length === level) {
        check(gamePattern, userClickedColour);
        userClickedColour = [];
    } else if (userClickedColour.length > gamePattern.length) {
        gameStarted = false;
        $('h1').text("Game over Press Any Key to Restart");
    }

})

function playsound(userChosenColour) {
    // $("#" + userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    animatePress(userChosenColour);
    var audio = new Audio('sounds/' + userChosenColour + '.mp3');
    audio.play();
}

function animatePress(key) {
    $("." + key).addClass("pressed");
    setTimeout(() => {
        $("." + key).removeClass("pressed")
    }, 100);
}

var gameStarted = false;
var level = 0;
$(document).keypress(function () {
    if (gameStarted == false) {
        gameStarted = true;
        if (gameStarted == true) {
            nextSequence();
        }
    }

})

function check(gamePattern, userClickedColour) {
    var i = 0;
    while (i < level) {
        if (gamePattern[i] === userClickedColour[i]) {
            i++;
        } else {

            gameover();
            return;
        }
    }
    userClickedColour = [];
    setTimeout(function () {
        nextSequence();
    }, 1000);


}

function gameover() {
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();
    $('body').addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over")
    }, 200);
    gameStarted = false;
    $('h1').text("Game Over, Press Any Key to Restart");
    while (gamePattern.length !== 0) {
        gamePattern.pop();
    }
    level = 0;

}