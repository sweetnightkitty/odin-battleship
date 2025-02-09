import "./styles.css";
import { screenController } from "./screenController.js";


//Screen controller
const display = screenController();
display.displayBoard();


// //Event listeners for each button the game
// const playerOneButtons = document.querySelectorAll(".player-one-buttons");

// //Runs the first iteration only on load
// playerOneButtons.forEach(button => {
//     button.addEventListener("click", ()=> {
//         display.playRound(button);
//     })
// })

