import "./styles.css";
import { toggler } from "./screenToggler.js";
import { controller } from "./screenController.js";

//BUTTONS

//START-BATTLESHIP-SCREEN:
const startBattleshipBtn = document.querySelector(".start-game-btn");

//SELECT-PLAYERS-SCREEN:
const onePlayerGame = document.querySelector(".btn-one-player-game");
const twoPlayerGame = document.querySelector(".btn-two-player-game");

//PLACE-SHIPS-SCREENS:
const submitShipsOne = document.querySelector(".ships-submit-player-one");
const submitShipsTwo = document.querySelector(".ships-submit-player-two");

//GAME-SCREENS:
const endPlayerOneRound = document.querySelector(".end-player-one");
const endPlayerTwoRound = document.querySelector(".end-player-two");

//INTERMEDIATE SCREEN: This screen appears after each player ends their round, 
//this prevents viewers from seeing each other's game board.
const startRoundBtn = document.querySelector(".start-round-btn");

//-------------------------------------------------------------------------

//START-BATTLESHIP-SCREEN / USER CLICKS "START"
startBattleshipBtn.addEventListener("click", toggler.goToSelectPlayersScreen);

//Regardless of 1 vs 2 player game, next screen is Player one places their ships:
onePlayerGame.addEventListener("click", toggler.goToShipPlacementScreenOne);
twoPlayerGame.addEventListener("click", toggler.goToShipPlacementScreenOne);


const executeOnePlayerGame = ()=> {
    submitShipsOne.addEventListener("click", toggler.startGame);
    
    endPlayerOneRound.textContent = "Done"; //Better UX
    endPlayerOneRound.addEventListener("click", toggler.goToPlayerOneNextRound);
}


const executeTwoPlayerGame = ()=> {
    //Switch to player 2, so they can place their ships:
    submitShipsOne.addEventListener("click", controller.switchPlayers);
    submitShipsOne.addEventListener("click", toggler.goToShipPlacementScreenTwo);

    //Switch back to player 1, and start game from player 1's turn:
    submitShipsTwo.addEventListener("click", controller.switchPlayers); 
    submitShipsTwo.addEventListener("click", toggler.startGame);

    //Toggles gameplay between player 1, 2, and an intermediate pass screen
    endPlayerOneRound.addEventListener("click", toggler.goToStartScreen);
    endPlayerTwoRound.addEventListener("click", toggler.goToStartScreen);
    startRoundBtn.addEventListener("click", toggler.goToPlayerBoardScreen);
}


onePlayerGame.addEventListener("click", executeOnePlayerGame);
twoPlayerGame.addEventListener("click", executeTwoPlayerGame);