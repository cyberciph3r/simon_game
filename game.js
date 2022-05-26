var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("h1").text("Level   " + level);
    nextSequence();
    started = true;
  }

});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  //console.log(userClickedPattern );
  userClickedPattern.push(userChosenColour);

  playMusic(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playMusic("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver()
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level   " + level);
  var randomNum = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNum];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playMusic(randomChosenColour);
}

function playMusic(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}


function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
