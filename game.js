let gamePattern = [];
let userClickedPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;


$(".btn").click(function() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    // console.log(userClickedPattern.length - 1);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    level += 1;
    $("h1").text(`Level ${level}`);
    let randomNumber = Math.floor((Math.random() * 3) + 1);
    // console.log(randomNumber);
    let randomChosenColour = buttonColours[randomNumber];
    // console.log(randomChosenColour);
    gamePattern.push(randomChosenColour);

    $("." + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    let audioToPlay = new Audio(`sounds/${name}.mp3`);
    audioToPlay.play();
}

function animatePress(currentColour) {
    $("."+currentColour).addClass("pressed");
    setTimeout(function() {
        $("."+currentColour).removeClass("pressed")
    }, 100);
} 

$(document).keypress(function() {
    nextSequence();
        $(this).unbind();
        $("h1").text(`Level ${level}`);
});

function checkAnswer(currentLevel) {
    // console.log(gamePattern);
    // console.log(userClickedPattern);
    let lastIndex = userClickedPattern.length - 1;
    // console.log('lastIndex'+lastIndex);
    if(gamePattern[currentLevel] === userClickedPattern[lastIndex]) {
        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence()
            }, 1000);
            userClickedPattern = [];
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    $(document).keypress(function() {
        nextSequence();
        $(this).unbind();
        $("h1").text(`Level ${level}`);
    });
    userClickedPattern = [];
}