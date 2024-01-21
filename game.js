var randomNumber = 0;
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var levelCheck = 0;
var brojac = 0;

function nextSequence(){
    if (level === levelCheck){
        randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);

        $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        var audio = new Audio(randomChosenColour+'.mp3');
        audio.play();
        $("h1").text("Level "+level); 
        level +=1;
        userClickedPattern = [];
        brojac = 0;
    }
}

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    var userAudio = new Audio($(this).attr("id") +'.mp3');
    userAudio.play();
    animatePress(userChosenColour);
    checkAnswer();
});

function checkAnswer() {
    var wrongAudio = new Audio("wrong.mp3");
        if(gamePattern[brojac] !== userClickedPattern[brojac]){
            wrongAudio.play();
            wrongPress();
            level = 0;
            levelCheck = 0;
            userClickedPattern = [];
            gamePattern = [];
            $("h1").text("Press A Key to Start"); 
        }else{
            brojac += 1;
            console.log(userClickedPattern.length);
            console.log(gamePattern.length);
            if(gamePattern.length === userClickedPattern.length)
                {setTimeout(nextSequence, 1000);
                levelCheck +=1;}
            console.log("Uspeh");
        }
        

    
}

function animatePress(currentColour) {
    $("#"+ currentColour).addClass("pressed");
    setTimeout(function (){
        $("#"+ currentColour).removeClass("pressed");
    }, 100);
}

function wrongPress(){
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over")
    }, 200);
}


$(document).on("keydown", nextSequence);
console.log(gamePattern);
