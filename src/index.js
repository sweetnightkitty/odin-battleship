import "./styles.css";
import { player} from "./gameLogic.js";

//On screen boards
const boardOne = document.querySelector(".player-one-board");
const boardTwo = document.querySelector(".player-two-board");


//Will handle all player related actions
const playerOne = player();
const playerTwo = player();

//Copies of player's boards
const playerOneBoard = playerOne.getGameBoard().getBoard();
const playerTWoBoard = playerTwo.getGameBoard().getBoard();


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
displayBoard("two", playerTWoBoard, boardTwo);




//Event listeners for each button the game
const playerOneButtons = document.querySelectorAll(".player-one-buttons");
const playerTwoButtons = document.querySelectorAll(".player-two-buttons");

playerOneButtons.forEach(button => {
    button.addEventListener("click", ()=> {
        console.log("player one");
    })
})

playerTwoButtons.forEach(button => {
    button.addEventListener("click", ()=> {
        console.log("player two");
    })
})