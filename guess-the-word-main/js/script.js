const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const hiddenbutton = document.querySelector(".play-again");


let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;



const getWord = async function() {
  const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const words = await res.text();
  const wordArray = words.split("\n");
  const randomNumber = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomNumber].trim();
  placeholder(word);
  console.log(word);
};


getWord();

//Write a Function to Add Placeholders for Each Letter
const placeholder = function(word) {
  placeholderArray = [];
  for(const w of word) {
    placeholderArray.push("●");
  }
  //console.log(placeholderArray);
  wordInProgress.innerText = placeholderArray.join("");
};



//Add an Event Listener for the Button
guessButton.addEventListener("click", function(e) {
  e.preventDefault();
  message.innerText = "";
  const userGuess = letterInput.value;
  //Validate Input in the Button Event Handler
  const goodGuess = checkPlayersInput(userGuess);
  if (goodGuess) {
    makeGuess(userGuess);

  }
  //console.log(goodGuess);
  letterInput.value = "";



});

//Create a Function to Check Player's Input
const checkPlayersInput = function(input){
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0 ) {
    message.innerText = "Please enter a letter";
  }
  else if (input.length > 1) {
    message.innerText = "Please enter only ONE letter from A to Z";
  }
  else if (!input.match(acceptedLetter)) {
    message.innerText = "Please enter a letter from A to Z";
  }
  else {
    return input;
  }
};

const makeGuess = function(guess){
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = "You tried that letter already, try again.";
  }
  else {
    guessedLetters.push(guess);
    //console.log(guessedLetters);

    updateRemainingGuesses(guess);
    showGuessedLetters();
    updateWordInProgress(guessedLetters);
  }

};

//Create a Function to Show the Guessed Letters
const showGuessedLetters = function() {
  guessedLettersElement.innerHTML = "";
  for (const letter of guessedLetters) {
    const liElement = document.createElement("li");
    liElement.innerText = letter;
    guessedLettersElement.append(liElement)
  }
};
//Updates the word as guesses are added
const updateWordInProgress = function(guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  //console.log(wordArray);

  for (const letter of wordArray) {
   if (guessedLetters.includes(letter)) {
     revealWord.push(letter.toUpperCase());
   } else {
     revealWord.push("●");
   }
 }
 wordInProgress.innerText = revealWord.join("");
 checkIfWin();
};

//Create a Function to Count Guesses Remaining
const updateRemainingGuesses = function (guess) {
  const wordUpper = word.toUpperCase();
  //Determin guessed letter in in mystery word
  if (!wordUpper.includes(guess)) {
    remainingGuesses -= 1;
    message.innerText = `Sorry the mystery word has no ${guess.toUpperCase()}'s in it. Try again`
  }
  else {
    message.innerText = `Way to go! There is a ${guess} in the mystery word.`
  }
  //Count the number of guesses
  if(remainingGuesses === 0) {
    remainingGuessesSpan.innerText = `no guesses`
    message.innerText = `Sorry! Game over. The mystery word is: ${wordUpper}.`
  }
  else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerText = `${remainingGuesses} guess`
  }
  else {
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`
  }

};


//Check to see if player won the game
const checkIfWin = function() {
  const wordUpper = word.toUpperCase();
  if (wordUpper === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
  }
};
