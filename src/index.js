import "./styles.css";
import { screenController } from "./screenController.js";

//INITIATE GAME:
const controller = screenController();

//-------------------------------------------------------------------------

//HTML CONSTANTS:

const endPlayerOneRound = document.querySelector(".end-player-one");

//-------------------------------------------------------------------------

//GAME PLAY:
controller.displayBoard(); //default displays player ones board
controller.displayShips();

//-------------------------------------------------------------------------

//BUTTON EVENTS:
endPlayerOneRound.addEventListener("click", ()=> {

})