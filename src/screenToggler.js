/**
 * @module screenToggler
 * Manages screen transitions and UI states for the Battleship game
 */

import { controller } from "./screenController";

/**
 * Factory function that creates screen toggler for managing UI screens and transitions
 * @returns {Object} Screen toggler with methods to control UI states
 */
const screenToggler = () => {
    // DOM elements - screen sections
    const headerTextContainer = document.querySelector(".header-text");
    const selectPlayersScreen = document.querySelector(".select-players-screen");
    
    // Ship placement screens
    const placeShipsScreen = document.querySelector(".place-ships-screen");
    const shipPlacementScreenOne = document.querySelector(".placement-player-one");
    const shipPlacementScreenTwo = document.querySelector(".placement-player-two");
    const shipBtnsOne = document.querySelectorAll(".ship-one");
    const shipBtnsTwo = document.querySelectorAll(".ship-two");

    // Game screens
    const gameScreen = document.querySelector(".game-screen");
    const gamePlayerOneScreen = document.querySelector(".game-player-one");
    const gamePlayerTwoScreen = document.querySelector(".game-player-two");
    const startRoundScreen = document.querySelector(".start-round");
    const startRoundBtn = document.querySelector(".start-round-btn");
    
    // Ship displays
    const gamePlayerOneShips = document.querySelector(".player-one-ships");
    const gamePlayerTwoShips = document.querySelector(".player-two-ships");

    // Modal elements
    const modal = document.querySelector(".modal");
    const modalNotice = document.querySelector(".modal-notice");
    const modalBtn = document.querySelector(".modal-btn");

    /**
     * Helper function to start the game after ship placement
     */
    const startGame = () => {
        placeShipsScreen.style.display = "none";
        gameScreen.style.display = "flex";
        controller.displayBoard();
        controller.displayShips(gamePlayerOneShips);
    };

    /**
     * Helper function to restart the game (reload page)
     */
    const restartGame = () => {
        location.reload();
    };

    // Stores computer hits, which can be used to develop logic to attack adjacent spots
    let computerHit;
    
    return {
        /**
         * Transitions to player one ship placement screen
         */
        goToShipPlacementScreenOne() {
            // Hide select players screen
            selectPlayersScreen.style.display = "none";
            headerTextContainer.style.display = "none";

            // Display placement screen for player one
            placeShipsScreen.style.display = "flex";
            controller.displayShips();
            
            // Add drag and drop event listeners
            shipBtnsOne.forEach(btn => {
                btn.addEventListener("dragstart", controller.dragStart);
                btn.addEventListener("dragend", controller.dragEnd);
            });
        },

        /**
         * Transitions to player two ship placement screen
         */
        goToShipPlacementScreenTwo() {
            // Switch to player two
            controller.switchPlayers();

            // Hide player one placement screen
            shipPlacementScreenOne.style.display = "none";

            // Display player two placement screen
            shipPlacementScreenTwo.style.display = "flex";
            controller.displayShips();
            
            // Add drag and drop event listeners
            shipBtnsTwo.forEach(btn => {
                btn.addEventListener("dragstart", controller.dragStart);
                btn.addEventListener("dragend", controller.dragEnd);
            });
        },

        /**
         * Starts a single player game (vs computer)
         */
        startOnePlayerGame() {
            startGame();
            controller.executePassDoneToggle("disable", "one");
        },

        /**
         * Starts a two player game
         */
        startTwoPlayerGame() {
            controller.switchPlayers();
            startGame();
            controller.executePassDoneToggle("disable", "two");
        },

        /**
         * Transitions to the intermediate screen between player turns
         * @param {Event} event - Click event from the end turn button
         */
        goToStartScreen(event) {
            if (event.target.classList[1] === "end-player-one") {
                // Hide player one screen
                gamePlayerOneScreen.style.display = "none";
                const playerOneNotice = document.querySelector(".player-one-notice");
                playerOneNotice.textContent = "";
         
                // Show intermediate screen
                startRoundScreen.style.display = "flex";
         
                // Configure intermediate screen for player two
                if (startRoundBtn.classList.contains("one")) {
                    startRoundBtn.classList.remove("one");
                }
                startRoundBtn.classList.add("two");
                startRoundBtn.textContent = "Player Two Start";
         
            } else if (event.target.classList[1] === "end-player-two") {
                // Hide player two screen
                gamePlayerTwoScreen.style.display = "none";
                const playerTwoNotice = document.querySelector(".player-two-notice");
                playerTwoNotice.textContent = "";
         
                // Show intermediate screen
                startRoundScreen.style.display = "flex";
         
                // Configure intermediate screen for player one
                startRoundBtn.classList.add("one");
                startRoundBtn.classList.remove("two");
                startRoundBtn.textContent = "Player One Start";
            }
        },

        /**
         * Transitions to a player's board screen
         * @param {Event} event - Click event from the start turn button
         */
        goToPlayerBoardScreen(event) {
            // Hide the intermediate screen
            startRoundScreen.style.display = "none";
            
            // Regenerate the game board for current active player
            controller.switchPlayers();
            controller.reset("board");
            controller.displayBoard();
            controller.executePassDoneToggle("disable", "two");
                
            // Display the correct player's board
            const nextPlayer = event.target.classList[1];
            if (nextPlayer === "one") {
                gamePlayerOneScreen.style.display = "flex";
                controller.reset("ships");
                controller.displayShips(gamePlayerOneShips);
            } else if (nextPlayer === "two") {
                gamePlayerTwoScreen.style.display = "flex";
                controller.reset("ships");
                controller.displayShips(gamePlayerTwoShips);
            }
        },

        /**
         * Reloads player one's game board
         */
        reloadPlayerOneGame() {
            controller.reset("board");
            controller.displayBoard();

            controller.reset("ships");
            controller.displayShips(gamePlayerOneShips);
        },

        /**
         * Handles transition to the next round for player one in single player mode
         */
        goToPlayerOneNextRound() {
            // Switch to player 2 (computer)
            controller.switchPlayers();

            // Computer takes a turn
            const computerTurn = controller.computerTurn();
            if (computerTurn) {
                computerHit = computerTurn;
            }

            // Switch back to player 1
            controller.switchPlayers();

            // Reload the boards for player 1
            controller.reset("board");
            controller.reset("ships");
            controller.displayBoard();
            controller.executePassDoneToggle("disable", "one");
            controller.displayShips(gamePlayerOneShips);
        },

        /**
         * Opens a modal with a message
         * @param {string} message - Message to display in the modal
         */
        openModal(message) {
            modal.style.display = "block";
            modalNotice.textContent = message;
        },

        /**
         * Closes the modal
         */
        closeModal() {
            modal.style.display = "none";
        },

        /**
         * Opens a modal with computer turn result
         * @param {string} message - Message about computer's turn
         */
        computerModal(message) {
            modal.style.display = "block";
            modalNotice.textContent = message;
            modalBtn.textContent = "Start turn";
        },

        /**
         * Opens a game over modal with restart option
         * @param {string} message - Game over message
         */
        gameOverModal(message) {
            modal.style.display = "block";
            modalNotice.textContent = message;
            modalBtn.textContent = "Play Again";
            modalBtn.addEventListener("click", restartGame);
        },
    };
}; 

export const toggler = screenToggler();