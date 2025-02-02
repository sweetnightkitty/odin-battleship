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
playerOneBoard.forEach(row => {
    row.forEach(cell => {
        const button = document.createElement("button");
        button.classList.add("buttons", "player-one-buttons")
        boardOne.appendChild(button);
    })
});

playerTWoBoard.forEach(row => {
    row.forEach(cell => {
        const button = document.createElement("button");
        button.classList.add("buttons", "player-two-buttons")
        boardTwo.appendChild(button);
    })
})


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