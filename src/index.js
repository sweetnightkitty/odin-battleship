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

//GAME-SCREEN:

//BUTTONS:

const endPlayerOneRound = document.querySelector(".end-player-one");
const endPlayerTwoRound = document.querySelector(".end-player-two");
const startRoundBtn = document.querySelector(".start-round-btn");

//BUTTON EVENTS:

//Toggles between playerOne's UI game, intermediate startRound, and playerTwo's UI game
endPlayerOneRound.addEventListener("click", toggler.goToStartScreen);
endPlayerTwoRound.addEventListener("click", toggler.goToStartScreen);
startRoundBtn.addEventListener("click", toggler.goToPlayerBoardScreen);

//-------------------------------------------------------------------------

//PLACE-SHIPS-SCREEN:

//SHIP BUTTONS
const aircraftBtn = document.querySelector(".aircraftCarrier");
const battleshipBtn = document.querySelector(".battleship");
const cruiserBtn = document.querySelector(".cruiser");
const submarineBtn = document.querySelector(".submarine");
const destroyerBtn = document.querySelector(".destroyer");

//BUTTON EVENTS:
aircraftBtn.addEventListener("click", controller.placeship);
battleshipBtn.addEventListener("click", controller.placeship);
cruiserBtn.addEventListener("click", controller.placeship);
submarineBtn.addEventListener("click", controller.placeship);
destroyerBtn.addEventListener("click", controller.placeship);

const submitPlayerOneShips = document.querySelector(".ships-submit-player-one");

submitPlayerOneShips.addEventListener("click", ()=> {

    //Complete class is added after ship is placed: indicates all are placed.
    if((aircraftBtn.classList.contains("complete")) 
        && (battleshipBtn.classList.contains("complete"))
        && (cruiserBtn.classList.contains("complete"))
        && (submarineBtn.classList.contains("complete"))
        && (destroyerBtn.classList.contains("complete"))
    ) {
        //Yes - toggle next screen
        toggler.goToShipPlacementBoard("two");
    } else {    
        alert("Not all ships are placed, place them all then press submit");
    };


})