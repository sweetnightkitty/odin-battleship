import "./styles.css";
import { screenController } from "./screenController.js";


//Screen controller
const display = screenController();
display.displayBoard();

const header = document.querySelector("header");
const headerText = document.querySelector("h1");
const btnStart = document.querySelector(".btn-start");
const start = document.querySelector(".game-start-modal");

const ChoosePlayer = document.querySelector(".choose-player");
const btnOnePlayers = document.querySelector(".btn-one-players");
const btnTwoPlayers = document.querySelector(".btn-two-players");


btnStart.addEventListener("click", ()=> {
    start.style.visibility = "hidden";
    ChoosePlayer.style.visibility = "visible";
    header.style.visibility = "visible";
    headerText.textContent = "Choose how many players";

})

btnOnePlayers.addEventListener("click", ()=> {
    alert("one player game vs computer");
    //Indicate the game is against computer
    //hide choose players
    //show player one place ships
})

btnTwoPlayers.addEventListener("click", ()=> {
    alert("two player game");
    //indicate the game is two people playing against one another side by side
    //hide choose players
    //show player one place ships
    
    //Then show player two place ships
})

