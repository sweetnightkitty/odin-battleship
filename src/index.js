import "./styles.css";
import { controller } from "./screenController.js";
import { toggler } from "./screenToggler.js";

//START BATTLESHIP SCREEN

const startBattleshipBtn = document.querySelector(".start-game-btn");
startBattleshipBtn.addEventListener("click", toggler.goToSelectPlayersScreen);

//SELECT-PLAYERS-SCREEN:

const twoPlayerGame = document.querySelector(".btn-two-player-game");
twoPlayerGame.addEventListener("click", toggler.goToShipPlacementScreenOne);

//-------------------------------------------------------------------------

//PLACE-SHIPS-SCREEN:

const submitShipsOne = document.querySelector(".ships-submit-player-one");
const submitShipsTwo = document.querySelector(".ships-submit-player-two");

//Toggles from player one placing their ships, to player two, then to begin game play
submitShipsOne.addEventListener("click", toggler.goToShipPlacementScreenTwo);
submitShipsTwo.addEventListener("click", toggler.startGame);

//-------------------------------------------------------------------------

//GAME-SCREEN:

const endPlayerOneRound = document.querySelector(".end-player-one");
const endPlayerTwoRound = document.querySelector(".end-player-two");
const startRoundBtn = document.querySelector(".start-round-btn");

//Toggles between playerOne's UI game, intermediate startRound, and playerTwo's UI game
endPlayerOneRound.addEventListener("click", toggler.goToStartScreen);
endPlayerTwoRound.addEventListener("click", toggler.goToStartScreen);
startRoundBtn.addEventListener("click", toggler.goToPlayerBoardScreen);

//-------------------------------------------------------------------------

//FIRST SCREEN = PLACE SHIPS ONE - FIRST INITIATION:

// const shipButtonsOne = document.querySelector(".ship-buttons-one");
// controller.displayShips();
// controller.generateShipButtons(shipButtonsOne);