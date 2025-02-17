import "./styles.css";

//CONTROLS - controls UI Game displays
import { controller } from "./screenController.js";

//TOGGLER - Toggles all game play screens
import { toggler } from "./screenToggler.js";


//-------------------------------------------------------------------------

//GAME PLAY:

//First initiation -  displays player one by default
controller.displayBoard(); //Displays the active player's top board (tracks their attacks)
controller.displayShips(); //Displays the active player's bottom board (their ship placements and hits so far)

//-------------------------------------------------------------------------

//SHIP PLACEMENT:

//First initiation - displays player one by default
toggler.goToShipPlacementBoard();

//-------------------------------------------------------------------------

//BUTTONS:

const endPlayerOneRound = document.querySelector(".end-player-one");
const endPlayerTwoRound = document.querySelector(".end-player-two");
const startRoundBtn = document.querySelector(".start-round-btn");

//-------------------------------------------------------------------------

//BUTTON EVENTS:

//Toggles between playerOne's UI game, intermediate startRound, and playerTwo's UI game
endPlayerOneRound.addEventListener("click", toggler.goToStartScreen);
endPlayerTwoRound.addEventListener("click", toggler.goToStartScreen);
startRoundBtn.addEventListener("click", toggler.goToPlayerBoardScreen);

