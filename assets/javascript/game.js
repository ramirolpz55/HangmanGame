
var wordArray = ["computer", "mouse", "engineer", "developer", "koder", "poster"]
var chosenWord = " "; //This is going to break down the word with indexOf 
var incorrectLettersGuessed = [] ;
var correctLettersGuessed = [];
var tryCounter = 0;
var maxTrys = 11;

var wins = 0;
var loses = 0;


//When we initialize game we need to pick a random word, Then we need to break that word 
function initializeGame() {
	initWord(); 						//This gets my random word from the wordArray
	initChosenPlaceholders(); 			//This call the function to set the placeholders
	refreshTrysRemainingLabel();		// Initialize the trys remaining
	//alert(chosenWord); 				
}

//This function created my random word from my wordArray
function initWord() {
	chosenWord = wordArray[Math.floor(Math.random() * wordArray.length)];
}

//Get number of letters in the chosen word
//Modify the DOM by adding on span tag for each letter.	
function initChosenPlaceholders() {
	var correctGuesses = document.getElementById("correct-guesses");
    for(i = 0; i < chosenWord.length; i++) {
    	correctGuesses.insertAdjacentHTML('beforeend', '<span id="CORRECT'+ i + '"> _ </span>');
	}
}



// take in a letter as a parameter and check to see if it is valid check the `ropriate array, 
// NOTE: This function() should take an input letter
// call indexOf(word) simple if statement.
function isLetterValid(letter) { 					//A Function that takes a letter and gives it a isLetterValid
	var index = chosenWord.indexOf(letter); 		//engineer = (letter means button they pressed) 
	if (index == -1) {
		incorrectLettersGuessed.push(letter);
		return false;
	} else {
    for (var i = 0; i < chosenWord.length; i++) {
        if (chosenWord[i] === letter) {
            correctLettersGuessed.push(letter);
        }
    }
    return true;

	}



}


//Check each array if it has been used check the incorrect and the correct letter arrays here. 
//This function() should take an input letter
function hasLetterBeenUsed(letter) {
	var incorrectIndex = incorrectLettersGuessed.indexOf(letter);
	var correctIndex = correctLettersGuessed.indexOf(letter);
	if (incorrectIndex == -1 && correctIndex == -1) {
		return false;
	}else {
		return true;
	}
}
	


document.onkeyup = function(event) {
	//Determines which exact key was selected. Make it lowercase.
	var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
	
	if (!hasLetterBeenUsed(userGuess)) {

		if(hasReachedLimit()){
			// The user has exceeded the limit. Do nothing and just show an alert
			alert("You have used all your trys!");
			return;
		}
		else{
			// The user has not reached limit, we're good so go ahead and process the request
			// and see if it's a matching letter or not.
			var result = isLetterValid(userGuess);
			tryCounter ++;
			refreshTrysRemainingLabel();

			if(result == true){
				markLetterCorrect(userGuess);
			}
			else{
				markLetterIncorrect(userGuess);

				// If the limit is reached, the user loses
				if(hasReachedLimit()){
					userLoses();
				}
			}
		}

	// update ui with correct letter if valid 
	// if not update letters guessed 
	}
	else{
		// TODO: Put an alert here and tell user the letter has an 
		alert("The letter " + userGuess + " has already been used.");
	}

	// var userGuess = String.fromCharCode(event.keyCode).toLowerCase(); Might use this
	// Get the letter that was pressed 
	//check if the letter has been used before.
	//check the correct and the incorrect array check both.
	//Check if the letter is valid. fucntion isLetterValid(); 
}

function hasReachedLimit(){

	if(tryCounter >= maxTrys){
		return true;
	}
	else{
		return false;
	}
}

// This will calculate how many trys left and will set the label in the UI.
function refreshTrysRemainingLabel(){
	var trysLeft = maxTrys - tryCounter;
	document.getElementById("trys-remaining").innerText = trysLeft;
}

function markLetterCorrect(letter) {
	// Modify the DOM and replace the __ underscore with the letter in the appropriate position/index

	// First, find all the indeces of the letter in the word. Then use that to determine which
	// underscore placeholders to modify in the DOM 
	// var indices = [];
	for(var i=0; i<chosenWord.length;i++) {
	    if (chosenWord[i] === letter) {
	    	// Use documentGetElement... to find the element with an ID of "CORRECTX" where X is the index/value of i.
	    	document.getElementById("CORRECT" + [i]).innerText = letter.toUpperCase();
	    }
	}
 
	// Let's determine if the user has won, by checking the number of correct letters guessed against the
	// total number of letters in the word.
	if(correctLettersGuessed.length == chosenWord.length){
		// The user won, yay!
		userWins();
	} else if (tryCounter == maxTrys) {
			userLoses();
	}
}

function markLetterIncorrect(letter) {
	//update counter here to reflect # of trys ++ each time.
	//Add letter to the incorrect letters array. 
	//This function() should take an input letter
	var guesses = document.getElementById("letters-guessed");
    	
   	guesses.insertAdjacentHTML('beforeend', "<span class='styleMeDaddy'>" + letter + "</span> ");
	
}

 function userWins() {
 	//Pop up an alert saying they win? Or update the your a winner!<span>
 	// alert("winner")
 	var element = document.getElementById("resultWin");
 	element.style.display = 'block';
 	//forceRedraw(element);
 	wins++;
 	// document.getElementById("wins-alert").innerText = "Wins: " + wins;
 	document.getElementById("picture").src ="assets/images/youwin.gif";

 }

function userLoses() {
 	//Pop up an alert saying they lose? Or update sorry you lost!<span>
 	var element = document.getElementById("resultLose");
 	element.style.display = 'block';
 	//forceRedraw(element);
 	loses++;
 	document.getElementById("picture").src ="assets/images/gameover.gif";
 }

// forces Chrome to repaint. Source: http://stackoverflow.com/questions/8840580/force-dom-redraw-refresh-on-chrome-mac
 var forceRedraw = function(element){ 

    if (!element) { return; }

    var n = document.createTextNode(' ');
    var disp = element.style.display;  // don't worry about previous display style

    element.appendChild(n);
    element.style.display = 'none';

    setTimeout(function(){
        element.style.display = disp;
        n.parentNode.removeChild(n);
    },20); // you can play with this timeout to make it as short as possible
}

