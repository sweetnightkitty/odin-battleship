/**
 * @module index
 * Entry point for the Battleship game - sets up event listeners and game flow
 */

import "./styles.css";
import { toggler } from "./screenToggler.js";
import { controller } from "./screenController.js";

// DOM Element Selectors
// -------------------------------------------------

// Select players screen buttons
const onePlayerGame = document.querySelector(".btn-one-player-game");
const twoPlayerGame = document.querySelector(".btn-two-player-game");

// Ship placement screen buttons
const submitShipsOne = document.querySelector(".ships-submit-player-one");
const submitShipsTwo = document.querySelector(".ships-submit-player-two");

// Game screen buttons
const endPlayerOneRound = document.querySelector(".end-player-one");
const endPlayerTwoRound = document.querySelector(".end-player-two");

// Intermediate screen button (prevents players from seeing each other's boards)
const startRoundBtn = document.querySelector(".start-round-btn");

// Modal close button
const closeModal = document.querySelector(".modal-btn");

// Game Flow Event Handlers
// -------------------------------------------------

// Set up common initial event listeners
onePlayerGame.addEventListener("click", toggler.goToShipPlacementScreenOne);
twoPlayerGame.addEventListener("click", toggler.goToShipPlacementScreenOne);

/**
 * Sets up single player game mode (player vs computer)
 */
const executeOnePlayerGame = () => {
    submitShipsOne.addEventListener("click", () => {
        if (controller.areAllShipsPlaced()) {
            // Switch to player 2 (computer) to place ships
            controller.switchPlayers();
            controller.computerPlaceAllships();

            // Switch back to player one before loading game
            controller.switchPlayers();
            toggler.startOnePlayerGame();
        } else {
            toggler.openModal("Place all your ships first before pressing submit!");
        }
    });

    // Set up computer ships in the background
    controller.computerPlaceAllships();

    // Configure player one end turn button
    endPlayerOneRound.textContent = "Done"; // Better UX for single player
    endPlayerOneRound.addEventListener("click", toggler.goToPlayerOneNextRound);
};

/**
 * Sets up two player game mode
 * Note: There was a state issue mentioned in the original code that needs attention
 */
const executeTwoPlayerGame = () => {
    // Handle player one ship placement submission
    submitShipsOne.addEventListener("click", () => {
        if (controller.areAllShipsPlaced()) {
            toggler.goToShipPlacementScreenTwo();
        } else {
            toggler.openModal("Place all your ships first before pressing submit!");
        }
    });

    // Handle player two ship placement submission
    submitShipsTwo.addEventListener("click", () => {
        if (controller.areAllShipsPlaced()) {
            toggler.startTwoPlayerGame();
        } else {
            toggler.openModal("Place all your ships first before pressing submit!");
        }
    });

    // Set up turn transition flow
    endPlayerOneRound.addEventListener("click", toggler.goToStartScreen);
    endPlayerTwoRound.addEventListener("click", toggler.goToStartScreen);
    startRoundBtn.addEventListener("click", toggler.goToPlayerBoardScreen);
};

// Set up game mode based on player selection
onePlayerGame.addEventListener("click", executeOnePlayerGame);
twoPlayerGame.addEventListener("click", executeTwoPlayerGame);

// Modal event handler
closeModal.addEventListener("click", toggler.closeModal);