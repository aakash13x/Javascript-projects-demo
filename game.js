
var buttonColours = ["red", "blue", "green", "yellow"];
var userChosenPattern = [];
var gamePattern = [];

var started = false;
var level = 0;

var currentScore = 0;
var highscore = 0;
$(document).keypress(function(){
  
  if(!started){
    $("#level-title").text("level "+ level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){

  var userChosenColor = $(this).attr("id");
  userChosenPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userChosenPattern.length -1);
});

function checkAnswer(currentLevel){
  if(userChosenPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("yes");    
  
    if(userChosenPattern.length === gamePattern.length){
    setTimeout(function(){
      nextSequence();
    },1000);
    }
  }
  else{
    console.log("no");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game Over you lose!")

    startOver();
  }
}
function nextSequence() {

  userChosenPattern = [];
  currentScore = level *100;
  level += 1;
  
  $("#level-title").text("Level " + level);
  $("#currscore").text("Current Score: "+ currentScore);
  $("#hiscore").text("High Score: "+ highscore);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
 
  playSound(randomChosenColour);
};

function playSound(name){
  var audio = new Audio("/sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $('#' + currentColor).addClass("pressed");
  
  setTimeout(function(){
    $('#' + currentColor).removeClass("pressed");
  },100);
}

function startOver(){
    level = 0;
    if(currentScore > highscore){
      highscore = currentScore;
    }
    currentScore = 0;
    
    gamePattern = [];
    started = false
}