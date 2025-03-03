import "./styles.css";
import { toggler } from "./screenToggler.js";
import { controller } from "./screenController.js";

//BUTTONS

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

//MODAL CLOSE BTN
const closeModal = document.querySelector(".modal-btn");

//-------------------------------------------------------------------------

//Regardless of 1 vs 2 player game, next screen is Player one places their ships:
onePlayerGame.addEventListener("click", toggler.goToShipPlacementScreenOne);
twoPlayerGame.addEventListener("click", toggler.goToShipPlacementScreenOne);


const executeOnePlayerGame = ()=> {
    submitShipsOne.addEventListener("click", ()=> {
        if(controller.areAllShipsPlaced()) {
            toggler.startOnePlayerGame();
        } else {
            toggler.openModal("Place all your ships first before pressing submit!");
        }
    })

    endPlayerOneRound.textContent = "Done"; //Better UX
    endPlayerOneRound.addEventListener("click", toggler.goToPlayerOneNextRound);
}

//State issue needs to be resolved:
const executeTwoPlayerGame = ()=> {
    //Switch to player 2, so they can place their ships:
    submitShipsOne.addEventListener("click", ()=> {
        if(controller.areAllShipsPlaced()) {
            toggler.goToShipPlacementScreenTwo()
        } else {
            toggler.openModal("Place all your ships first before pressing submit!");
        }
    })

    //Switch back to player 1, and start game from player 1's turn:
    submitShipsTwo.addEventListener("click", ()=> {
        if(controller.areAllShipsPlaced()) {
            toggler.startTwoPlayerGame()
        } else {
            toggler.openModal("Place all your ships first before pressing submit!");
        }
    })

    //Toggles gameplay between player 1, 2, and an intermediate pass screen
    endPlayerOneRound.addEventListener("click", toggler.goToStartScreen);
    endPlayerTwoRound.addEventListener("click", toggler.goToStartScreen);
    startRoundBtn.addEventListener("click", toggler.goToPlayerBoardScreen);
}

//Executes correct gameplay logic depending on if 1 or 2 player game
onePlayerGame.addEventListener("click", executeOnePlayerGame);
twoPlayerGame.addEventListener("click", executeTwoPlayerGame);

//Allows user to close modal whenever it opens.
closeModal.addEventListener("click", toggler.closeModal);