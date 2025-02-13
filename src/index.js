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
const placeShips = document.querySelector(".place-ships");

btnStart.addEventListener("click", ()=> {
    start.style.visibility = "hidden";
    ChoosePlayer.style.visibility = "visible";
    header.style.visibility = "visible";
    headerText.textContent = "Choose how many players";

})

btnOnePlayers.addEventListener("click", ()=> {
    //Indicate the game is against computer
    //hide choose players
    ChoosePlayer.style.visibility = "hidden";
    //show player one place ships
    placeShips.style.visibility = "visibile";
    headerText.textContent = "Place your ships!";

})

btnTwoPlayers.addEventListener("click", ()=> {
    //indicate the game is two people playing against one another side by side
    //hide choose players
    ChoosePlayer.style.visibility = "hidden";
    //show player one place ships
    placeShips.style.visibility = "visible";
    headerText.textContent = "Place your ships!";
    
    //Then show player two place ships
})

