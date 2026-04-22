//colours in game
var buttonColours = ["red", "blue", "green", "yellow"];

//game pattern
var gamePattern = [];

//array for user clicked pattern
var userCLickedPattern = [];

var started = false;
var level = 0;

//Start the game
$(document).on("keydown", function (event) {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//Restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

//function for next sequence in game
function nextSequence() {
  userCLickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 3) + 1;
  var randomChosenColour = buttonColours[randomNumber];
  //add random colour to game pattern array
  gamePattern.push(randomChosenColour);

  //add animation and sound
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

//check which button is pressed
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userCLickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userCLickedPattern.length - 1);
});

//function that plays sound on clicks
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//function to add animation to clicks
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    ($("#" + currentColour).removeClass("pressed"), 100);
  });
}

//Check answers
function checkAnswer(currentLevel) {
  if (userCLickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userCLickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function () {
      ($("body").removeClass("game-over"), 200);
    });

    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
