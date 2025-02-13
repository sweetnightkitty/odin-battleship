import "./styles.css";
import { screenController } from "./screenController.js";


//Screen controller
const display = screenController();
display.displayBoard();

const btnStart = document.querySelector(".btn-start");
const modalStart = document.querySelector(".game-start-modal");

const modalChoosePlayer = document.querySelector(".choose-player");


btnStart.addEventListener("click", ()=> {
    modalStart.style.visibility = "hidden";
    modalChoosePlayer.style.visibility = "visible";

})
