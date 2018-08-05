//constructor initialize
var Word = require("./word.js");
var inquirer = require("inquirer");

//letters entry
var letterArray = "abcdefghijklmnopqrstuvwxyz";

//list of words options
var torontoStreets = ["bay", "yonge", "dundas", "adelaide", "york", "bloor", "spadina"];

//generate a random answer
var randomIndex = Math.floor(Math.random() * torontoStreets.length);
var randomWord = torontoStreets[randomIndex];

//passing random word through Word constructor
computerWord = new Word(randomWord);

var requireNewWord = false;

//array for guessed letters
var incorrectLetters = [];
var correctLetters = [];

var guessesLeft = 10;

function knowledge() {

    //generating new word for word constructor if true
    if (requireNewWord) {
        //random torontoStreets array
        var randomIndex = Math.floor(Math.random() * torontoStreets.length);
        var randomWord = torontoStreets[randomIndex];

        //passing random word via the word constructor
        computerWord = new Word(randomWord);

        requireNewWord = false;
    }

    //testing if a guessed letter is correct
    var wordComplete = [];
    computerWord.objArray.forEach(completeCheck);

    //remaining letters to be guessed
    if (wordComplete.includes(false)) {

        inquirer.prompt([
            {
                type: "input",
                message: "Guess a letter from A to Z!",
                name: "userInput"
            }

        ]).then(function (input) {

            if (!letterArray.includes(input.userInput) || input.userInput.length > 1) {
                console.log("\nTry again!\n");
                knowledge();

            } else {

                if (incorrectLetters.includes(input.userInput) || correctLetters.includes(input.userInput) || input.userInput === "") {
                    console.log("\nAlready Guessed or Nothing Entered\n");
                    knowledge();
                } else {

                    //checking if guess is correct
                    var wordCheckArray = [];

                    computerWord.userGuess(input.userInput);

                    //checking if guess is correct
                    computerWord.objArray.forEach(wordCheck);
                    if (wordCheckArray.join(' ') === wordComplete.join('')) {

                        console.log("\nIncorrect\n");
                        incorrectLetters.push(input.userInput);
                        guessesLeft--;
                    } else {

                        console.log("\nCorrect!\n");
                        correctLetters.push(input.userInput);
                    }

                    computerWord.log();

                    //printing guesses left
                    console.log("Guesses Left: " + guessesLeft + "\n");

                    //printing already guessed letters
                    console.log("Letters Guessed: " + incorrectLetters.join(" ") + "\n");

                    //Guesses left
                    if (guessesLeft > 0) {
                        
                        knowledge();
                    } else {
                        console.log("Sorry, you lost!\n");
                        restartGame();
                    }

                    function wordCheck(key) {
                        wordCheckArray.push(key.guessed);
                    }
                }
            }
        })
    } else {
        console.log("You Win!\n");
        restartGame();
    }

    function completeCheck(key) {
        inquirer.prompt([
            {
                type: "list",
                message: "Would you like to:",
                choices: ["Play Again", "Exit"],
                name: "restart"
            }
        ]).then(function (input) {

            if (input.restart === "Play Again") {
                requireNewWord = true;
                incorrectLetters = [];
                correctLetters = [];
                guessesLeft = 10;
                knowledge();

            } else {

                return
            }
        })
    }
};

knowledge();

