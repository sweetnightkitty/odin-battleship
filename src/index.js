import "./styles.css";
import { player} from "./gameLogic.js";

//On screen board
const boardOne = document.querySelector(".player-one-board");

//Will handle all player related actions
const playerOne = player();
const computer = player(); // begin game development against a computer player

//Copies of player's boards
const playerOneBoard = playerOne.getGameBoard().getBoard();


//Creates UI buttons for both boards
const displayBoard = (selectPlayer, playererBoard, displayBoard) => {
    for(let i = 0; i < playererBoard.length; i++) {
        for(let j = 0; j < playererBoard[i].length; j++) {
            const button = document.createElement("button");
            button.classList.add(`player-${selectPlayer}-buttons`, `${i}${j}`);
            displayBoard.appendChild(button);
        }
    }
}

displayBoard("one", playerOneBoard, boardOne);


//Event listeners for each button the game
const playerOneButtons = document.querySelectorAll(".player-one-buttons");

playerOneButtons.forEach(button => {
    button.addEventListener("click", ()=> {
        console.log("player one");
    })
})