import "./styles.css";
import { screenController } from "./screenController.js";

//INITIATE GAME:
const controller = screenController();

//-------------------------------------------------------------------------

//HTML CONSTANTS:

const endPlayerOneRound = document.querySelector(".end-player-one");

//-------------------------------------------------------------------------

//GAME PLAY:
controller.displayBoard(); //Displays the active player's top board (tracks their attacks)
controller.displayShips(); //Displays the active player's bottom board (their ship placements and hits so far)

//-------------------------------------------------------------------------

//BUTTON EVENTS:
endPlayerOneRound.addEventListener("click", ()=> {

})