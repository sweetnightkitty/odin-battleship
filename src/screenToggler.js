import { ship } from "./gameLogic";
import { controller } from "./screenController";

const screenToggler = () => {

    //HEADER
    const headerTextContainer = document.querySelector(".header-text");

    //SELECT PLAYERS SCREEN
    const selectPlayersScreen = document.querySelector(".select-players-screen");

    //PLACE SHIPS SCREENS
    const placeShipsScreen = document.querySelector(".place-ships-screen");
    const shipPlacementScreenOne = document.querySelector(".placement-player-one");
    const shipPlacementScreenTwo = document.querySelector(".placement-player-two");
    const shipBtnsOne = document.querySelectorAll(".ship-one");
    const shipBtnsTwo = document.querySelectorAll(".ship-two");


    //GAME SCREEN DIVS
    const gameScreen = document.querySelector(".game-screen");
    const gamePlayerOneScreen = document.querySelector(".game-player-one");
    const gamePlayerTwoScreen = document.querySelector(".game-player-two");
    const startRoundScreen = document.querySelector(".start-round");

    const startRoundBtn = document.querySelector(".start-round-btn");
    const gamePlayerOneShips = document.querySelector(".player-one-ships");
    const gamePlayerTwoShips = document.querySelector(".player-two-ships");

    //MODAL
    const modal = document.querySelector(".modal");
    const modalNotice = document.querySelector(".modal-notice");
    const modalBtn = document.querySelector(".modal-btn");

    const startGame = ()=> {
        placeShipsScreen.style.display = "none";
        gameScreen.style.display = "flex";
        controller.displayBoard();
        controller.displayShips(gamePlayerOneShips);
    }

    const restartGame = ()=> {
        location.reload();
    }

    //Stores computer hits, which can be used to develop logic to attack adjacent spots
    let computerHit;
    return {
        goToShipPlacementScreenOne() {
            //hide select players screen
            selectPlayersScreen.style.display = "none";
            headerTextContainer.style.display = "none";

            //display placement one
            placeShipsScreen.style.display = "flex";
            controller.displayShips();
            shipBtnsOne.forEach(btn => {
                btn.addEventListener("dragstart", controller.dragStart);
                btn.addEventListener("dragend", controller.dragEnd);
            })

        },

        goToShipPlacementScreenTwo() {
            //Switch players
            controller.switchPlayers();

            //hide placement one
            shipPlacementScreenOne.style.display = "none";

            //display placement two
            shipPlacementScreenTwo.style.display = "flex";
            controller.displayShips();
            shipBtnsTwo.forEach(btn => {
                btn.addEventListener("dragstart", controller.dragStart);
                btn.addEventListener("dragend", controller.dragEnd);
            })
        },

        startOnePlayerGame() {
            startGame();
            controller.executePassDoneToggle("disable", "one");
        },

        startTwoPlayerGame() {
            controller.switchPlayers();
            startGame();
            controller.executePassDoneToggle("disable", "two");
        },

        goToStartScreen(event) {
            if(event.target.classList[1] == "end-player-one") {
                //Hide player One
                gamePlayerOneScreen.style.display = "none";
                const playerOneNotice = document.querySelector(".player-one-notice");
                playerOneNotice.textContent = "";
         
                //Show intermediate screen
                startRoundScreen.style.display = "flex";
         
                //Add a class to the intermediate screen to know who plays next
                if(startRoundBtn.classList.contains("one")) {startRoundBtn.classList.remove("one")};
                startRoundBtn.classList.add("two");
                startRoundBtn.textContent = "Player Two Start";
         
            } else if(event.target.classList[1] == "end-player-two") {
                 //Hide Player Two
                 gamePlayerTwoScreen.style.display = "none";
                 const playerTwoNotice = document.querySelector(".player-two-notice");
                 playerTwoNotice.textContent = "";
         
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
                controller.executePassDoneToggle("disable", "two");
                
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

        reloadPlayerOneGame () {
            controller.reset("board");
            controller.displayBoard();

            controller.reset("ships");
            controller.displayShips(gamePlayerOneShips);
        },

        goToPlayerOneNextRound() {
            //Switches to "player 2" which is the computer:
            controller.switchPlayers();

            //Computer takes a turn in the background:
            const computerTurn = controller.computerTurn();
            if(computerTurn) {computerHit = computerTurn};

            //Switches back to player 1
            controller.switchPlayers();

            //Reloads the board for player 1
            controller.reset("board");
            controller.reset("ships");
            controller.displayBoard();
            controller.executePassDoneToggle("disable", "one");
            controller.displayShips(gamePlayerOneShips);
        },

        openModal(message) {
            modal.style.display = "block";
            modalNotice.textContent = message;
        },

        closeModal() {
            modal.style.display = "none";
        },

        computerModal(message) {
            modal.style.display = "block";
            modalNotice.textContent = message;
            modalBtn.textContent = "Start turn";
        },

        //Converts the close modal btn to play again button
        gameOverModal(message) {
            modal.style.display = "block";
            modalNotice.textContent = message;
            modalBtn.textContent = "Play Again";
            modalBtn.addEventListener("click", restartGame);
        },

    }
} 

export const toggler = screenToggler();