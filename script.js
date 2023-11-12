let colors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];
let currentLevel = 0;
var started = false;

$(document).on("keydown", function () {
    if (!started) {
        var check = $("body").hasClass("game-over");
        if (check === true) {
            $("body").removeClass("game-over");
        }
        $("#level-title").text("Level " + currentLevel);
        nextSequence();
        started = true;
    }

});


$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);



});

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
//nextSequence();
function nextSequence() {
    userClickedPattern = [];
    currentLevel++;
    $("#level-title").text("Level " + currentLevel);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = colors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function endGame() {
    started = false;
    currentLevel = 0;
    gamePattern = [];
    setTimeout(function () {
        $("body").addClass("game-over");
        $("h1").text("Press any key to restart");
    }, 500);


}

function checkAnswer(currentLevel) {

    if ((userClickedPattern[currentLevel]) === (gamePattern[currentLevel])) {

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);

        }
    }
    else {
        $("h1").text("Game over");
        playSound("wrong");
        endGame();


    }
}

