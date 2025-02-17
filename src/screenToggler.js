import { controller } from "./screenController";

const screenToggler = () => {
    const gamePlayerOne = document.querySelector(".game-player-one");

    const gamePlayerTwo = document.querySelector(".game-player-two");

    const startRound = document.querySelector(".start-round");
    const startRoundBtn = document.querySelector(".start-round-btn");
    return {
        goToStartRound() {
            if(event.target.classList[1] == "end-player-one") {
                 //Hide player One
                 gamePlayerOne.style.display = "none";
         
                 //Show intermediate screen
                 startRound.style.display = "flex";
         
                 //Add a class to the intermediate screen to know who plays next
                 if(startRoundBtn.classList.contains("one")) {startRoundBtn.classList.remove("one")};
                 startRoundBtn.classList.add("two");
                 startRoundBtn.textContent = "Player Two Start";
         
            } else if(event.target.classList[1] == "end-player-two") {
                 //Hide Player Two
                 gamePlayerTwo.style.display = "none";
         
                 //Shows Intermediate Screen
                 startRound.style.display = "flex";
         
                 //Add a class to the intermediate screen to know who plays next
                 startRoundBtn.classList.add("one");
                 startRoundBtn.classList.remove("two");
                 startRoundBtn.textContent = "Player One Start";
         
            }
         },

        nextPlayerRound () {
                //Hide the intermediate screen
                startRound.style.display = "none";
            
                //Regenerate the game for current active player
                controller.switchPlayers();
                controller.reset("board");
                controller.reset("ships");
                controller.displayBoard();
                controller.displayShips(); // may be an issue
                
                //Displays the correct person's board:
                const nextPlayer = event.target.classList[1];
                if(nextPlayer == "one") {
                    gamePlayerOne.style.display = "flex";
                } else if(nextPlayer == "two") {
                    gamePlayerTwo.style.display = "flex";
                }
        },
    }
} 

export const toggler = screenToggler();