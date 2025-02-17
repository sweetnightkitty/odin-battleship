import "./styles.css";
import { controller } from "./screenController.js";
import { screenToggler } from "./screenController.js";

//INITIATES SCREEN TOGGLER:
const toggler = screenToggler();

//-------------------------------------------------------------------------

//GAME PLAY:

//First initiation -  displays player one by default
controller.displayBoard(); //Displays the active player's top board (tracks their attacks)
controller.displayShips(); //Displays the active player's bottom board (their ship placements and hits so far)

//-------------------------------------------------------------------------

//BUTTONS:

const endPlayerOneRound = document.querySelector(".end-player-one");
const endPlayerTwoRound = document.querySelector(".end-player-two");
const startRoundBtn = document.querySelector(".start-round-btn");

//-------------------------------------------------------------------------

//BUTTON EVENTS:

//Toggles between playerOne's UI game, intermediate startRound, and playerTwo's UI game
endPlayerOneRound.addEventListener("click", toggler.goToStartRound);
endPlayerTwoRound.addEventListener("click", toggler.goToStartRound);
startRoundBtn.addEventListener("click", toggler.nextPlayerRound);

