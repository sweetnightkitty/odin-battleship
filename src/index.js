import "./styles.css";
import { player} from "./gameLogic.js";
import { screenController } from "./screenController.js";

//On screen board
const boardOne = document.querySelector(".player-one-board");

const screen = screenController();
screen.displayBoard(boardOne);

// displayBoard("one", playerOneBoard, boardOne);


//Event listeners for each button the game
const playerOneButtons = document.querySelectorAll(".player-one-buttons");

playerOneButtons.forEach(button => {
    button.addEventListener("click", ()=> {
        console.log("player one");
    })
})

