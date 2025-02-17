import "./styles.css";
import { screenController } from "./screenController.js";

//INITIATE GAME:
const controller = screenController();

//-------------------------------------------------------------------------

//HTML CONSTANTS:

const gamePlayerOne = document.querySelector(".game-player-one");
const endPlayerOneRound = document.querySelector(".end-player-one");
const hideShipsOne = document.querySelector(".player-one-ships");

const gamePlayerTwo = document.querySelector(".game-player-two");
const endPlayerTwoRound = document.querySelector(".end-player-two");
const hideShipsTwo = document.querySelector(".player-two-ships");

const startRound = document.querySelector(".start-round");
const startRoundBtn = document.querySelector(".start-round-btn");

//-------------------------------------------------------------------------

//GAME PLAY:
controller.displayBoard(); //Displays the active player's top board (tracks their attacks)
controller.displayShips(); //Displays the active player's bottom board (their ship placements and hits so far)

//-------------------------------------------------------------------------

//BUTTON EVENTS:
endPlayerOneRound.addEventListener("click", goToStartRound);
endPlayerTwoRound.addEventListener("click", goToStartRound);
startRoundBtn.addEventListener("click", nextPlayerRound);


function goToStartRound() {
   if(event.target.classList[1] == "end-player-one") {
        //Hide player One
        gamePlayerOne.style.display = "none";

        //Show intermediate screen
        startRound.style.display = "flex";

        //Add a class to the intermediate screen to know who plays next
        if(startRoundBtn.classList.contains("one")) {startRoundBtn.classList.remove("one")};
        startRoundBtn.classList.add("two");
        startRoundBtn.textContent = "Player Two Start";

   } else if(event.target.classList[1] == "end-player-two") {
        //Hide Player Two
        gamePlayerTwo.style.display = "none";

        //Shows Intermediate Screen
        startRound.style.display = "flex";

        //Add a class to the intermediate screen to know who plays next
        startRoundBtn.classList.add("one");
        startRoundBtn.classList.remove("two");
        startRoundBtn.textContent = "Player One Start";

   }
}

function nextPlayerRound() {

    //Hide the intermediate screen
    startRound.style.display = "none";

    //Regenerate the game for current active player
    controller.switchPlayers();
    controller.reset("board");
    controller.reset("ships");
    controller.displayBoard();
    controller.displayShips(); // may be an issue
    
    //Displays the correct person's board:
    const nextPlayer = event.target.classList[1];
    if(nextPlayer == "one") {
        gamePlayerOne.style.display = "flex";
    } else if(nextPlayer == "two") {
        gamePlayerTwo.style.display = "flex";
    }
}
