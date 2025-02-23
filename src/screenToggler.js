import { ship } from "./gameLogic";
import { controller } from "./screenController";

const screenToggler = () => {

    //HEADER
    const header = document.querySelector("header");

    //START BATTLESHIP SCREEN
    const startBattleshipScreen = document.querySelector(".start-battleship-screen");

    //SELECT PLAYERS SCREEN
    const selectPlayersScreen = document.querySelector(".select-players-screen");

    //PLACE SHIPS SCREENS
    const placeShipsScreen = document.querySelector(".place-ships-screen");
    const shipPlacementScreenOne = document.querySelector(".placement-player-one");
    const shipPlacementScreenTwo = document.querySelector(".placement-player-two");
    const shipButtonsOne = document.querySelector(".ship-buttons-one");
    const shipButtonsTwo = document.querySelector(".ship-buttons-two");

    //GAME SCREEN DIVS
    const gameScreen = document.querySelector(".game-screen");
    const gamePlayerOneScreen = document.querySelector(".game-player-one");
    const gamePlayerTwoScreen = document.querySelector(".game-player-two");
    const startRoundScreen = document.querySelector(".start-round");

    const startRoundBtn = document.querySelector(".start-round-btn");
    const gamePlayerOneShips = document.querySelector(".player-one-ships");
    const gamePlayerTwoShips = document.querySelector(".player-two-ships");

    return {
        goToSelectPlayersScreen() {
            //Hide start battleship screen
            startBattleshipScreen.style.display = "none";
            
            //display select players screen
            selectPlayersScreen.style.display = "flex";
        },

        goToShipPlacementScreenOne() {
            //hide select players screen
            selectPlayersScreen.style.display = "none";
            header.style.visibility = "hidden";
            header.innerHTML = "";

            //display placement one
            placeShipsScreen.style.display = "flex";
            controller.displayShips();
            controller.generateShipButtons(shipButtonsOne);
        },

        goToShipPlacementScreenTwo() {
            //hide placement one
            shipPlacementScreenOne.style.display = "none";

            //display placement two
            shipPlacementScreenTwo.style.display = "flex";
            controller.switchPlayers(); //Switch from player 1 to player 2
            controller.displayShips();
            controller.generateShipButtons(shipButtonsTwo);
        },

        startGame() {
            placeShipsScreen.style.display = "none";
            gameScreen.style.display = "flex";
            controller.switchPlayers(); // Switch from player 2 (Placement) to player 1
            controller.displayBoard();
            controller.displayShips(gamePlayerOneShips);
            
        },

        goToStartScreen(event) {
            if(event.target.classList[1] == "end-player-one") {
                 //Hide player One
                 gamePlayerOneScreen.style.display = "none";
         
                 //Show intermediate screen
                 startRoundScreen.style.display = "flex";
         
                 //Add a class to the intermediate screen to know who plays next
                 if(startRoundBtn.classList.contains("one")) {startRoundBtn.classList.remove("one")};
                 startRoundBtn.classList.add("two");
                 startRoundBtn.textContent = "Player Two Start";
         
            } else if(event.target.classList[1] == "end-player-two") {
                 //Hide Player Two
                 gamePlayerTwoScreen.style.display = "none";
         
                 //Shows Intermediate Screen
                 startRoundScreen.style.display = "flex";
         
                 //Add a class to the intermediate screen to know who plays next
                 startRoundBtn.classList.add("one");
                 startRoundBtn.classList.remove("two");
                 startRoundBtn.textContent = "Player One Start";
         
            }
         },

        goToPlayerBoardScreen (event) {
                //Hide the intermediate screen
                startRoundScreen.style.display = "none";
            
                //Regenerate the game for current active player
                controller.switchPlayers();
                controller.reset("board");
                controller.displayBoard();
                
                //Displays the correct person's board:
                const nextPlayer = event.target.classList[1];
                if(nextPlayer == "one") {
                    gamePlayerOneScreen.style.display = "flex";
                    controller.reset("ships");
                    controller.displayShips(gamePlayerOneShips);
                } else if(nextPlayer == "two") {
                    gamePlayerTwoScreen.style.display = "flex";
                    controller.reset("ships");
                    controller.displayShips(gamePlayerTwoShips);
                }
        },

    }
} 

export const toggler = screenToggler();