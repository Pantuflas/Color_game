var numberOfSquares = 6;
var colors = [];
var goalColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeBtn = document.querySelectorAll(".mode");

init();

function init() {
    setUpModeBtn();
    setUpSquaresListeners();
    reset();
}

//Function to set up the listeners of modeBtn
function setUpModeBtn() {
    //Mode buttons events listeners
    for(var i = 0; i < modeBtn.length; i++) {
        modeBtn[i].addEventListener("click", function(){
        modeBtn[0].classList.remove("selected");
        modeBtn[1].classList.remove("selected");
        this.classList.add("selected");
        this.textContent === "Easy" ? numberOfSquares = 3: numberOfSquares = 6;
        reset();
        });
    }
}

//Function to set up the listeners of squares
function setUpSquaresListeners() {
    for(var i = 0; i < squares.length; i++) {
        //add click listener to squares
        squares[i].addEventListener("click", function(){
           //grab color of clicked square
           var clickedColor = this.style.backgroundColor;
           //compare clicked and goal color 
           if(clickedColor === goalColor) {
               messageDisplay.textContent = "Correct";
               resetButton.textContent = "Play again?";
               changeColors(clickedColor);
               h1.style.backgroundColor = clickedColor;
           } else {
               this.style.backgroundColor = "#232323";
               messageDisplay.textContent = "Try again";
           }
        });
    }
}


function reset() {
    //Generate new  colors
    colors = randomColors(numberOfSquares);
    //Pick new goal color from array
    goalColor = randomGoalColor();
    //Change colorDisplay to match goal color
    colorDisplay.textContent = goalColor;
    resetButton.textContent = "New Colors"
    messageDisplay.textContent="";

    //change color of squares 
    for(var i = 0; i < squares.length; i++){
        if(colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none"; 
        }
    }

    h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function(){
    reset();
});


function changeColors(color){
    //loop squares
    for(var i = 0; i < squares.length; i++) {
         //change each color to match goal color
        squares[i].style.backgroundColor = color;
    }
}

//This function returns a random goal color from the color's array
function randomGoalColor(){
    var random = Math.floor(Math.random() * colors.length); //generate a random index between 1-6 due to the array's length is 6
    return colors[random]; //return the value of whatever index was randomly generated. i.e. random = 4 then colors[random] = [0, 255 ,255];
}

//This function returns 3 or 6 random colors to fill colors' array
function randomColors(n){
    //make array
    var rColors = [];
    //add 'n' random colors to array
    for(var i = 0; i < n; i++) {
        //get random color and push into arr
        rColors.push(randomRGB());
    }
    return rColors;
}

function randomRGB() {
    //Make random for "red"
    var r = Math.floor(Math.random() * 256); 
    //Make random for "green"
    var g = Math.floor(Math.random() * 256);
    //Make random for "blue"
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
