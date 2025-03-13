/**
 * @module screenController
 * UI controller for the Battleship game - handles rendering and UI interactions
 */

import { player } from "./gameLogic";
import { toggler } from "./screenToggler";
import {
    SHIP_LENGTHS,
    BOARD_SIZE,
    CELL_STATES,
    SHIP_DISPLAY_NAMES,
    CSS_CLASSES
} from './constants.js';

/**
 * Factory function for the screen controller
 * @returns {Object} Controller object with methods to handle game UI
 */
const screenController = () => {
    // Initialize players
    const playerOne = player();
    const playerTwo = player();

    // Get DOM elements
    const playerOneDisplay = document.querySelector(".player-one-board");
    const playerTwoDisplay = document.querySelector(".player-two-board");
    const playerOneShipDisplay = document.querySelector(".player-one-ships");
    const playerTwoShipDisplay = document.querySelector(".player-two-ships");
    const playerOneShipPlacement = document.querySelector(".placement-boards-player-one");
    const playerTwoShipPlacement = document.querySelector(".placement-boards-player-two");
    const playerOneNotice = document.querySelector(".player-one-notice");
    const playerTwoNotice = document.querySelector(".player-two-notice");

    // Player configurations
    const players = [
        {
            activePlayer: playerOne,
            opponent: playerTwo,
            name: "one",
            display: playerOneDisplay, // Displays player's attacks
            shipDisplay: playerOneShipDisplay, // Displays the locations of their ships
            notice: playerOneNotice,
            shipPlacement: playerOneShipPlacement,
        },
        {
            activePlayer: playerTwo,
            opponent: playerOne,
            name: "two", // computer playing
            display: playerTwoDisplay,
            shipDisplay: playerTwoShipDisplay,
            notice: playerTwoNotice,
            shipPlacement: playerTwoShipPlacement,
        }
    ];

    let activePlayer = players[0];

    /**
     * Applies appropriate CSS classes to a cell based on its state
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {HTMLElement} button - Button element to apply classes to
     * @param {Array|string} board - Board to check or "ships" for ship display board
     */
    const applyColor = (x, y, button, board = activePlayer.opponent.getBoard()) => {
        // HANDLES COLOR FOR DISPLAY SHIPS
        if (board === "ships") {
            board = activePlayer.activePlayer.getBoard();

            if (board[x][y] === CELL_STATES.HIT) {
                button.classList.remove(CSS_CLASSES.SELECTED);
                button.classList.add(CSS_CLASSES.HIT);
            } else if (board[x][y] === CELL_STATES.MISS) {
                // Don't want to display all the misses
                button.classList.remove(CSS_CLASSES.SELECTED);
            }
        }
        // HANDLES COLOR FOR DISPLAY BOARD - uses board default
        else {
            if (board[x][y] === CELL_STATES.HIT) {
                button.classList.add(CSS_CLASSES.HIT);
                disableCoordinate(button);
            } else if (board[x][y] === CELL_STATES.MISS) {
                button.classList.add(CSS_CLASSES.MISS);
                disableCoordinate(button);
            }
        }
    };

    /**
     * Gets the notice text based on attack result
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @returns {string} Text describing the result
     */
    const getNotice = (x, y) => {
        const opponentBoard = activePlayer.opponent.getBoard();
        if (opponentBoard[x][y] === CELL_STATES.HIT) return "It's a hit!";
        if (opponentBoard[x][y] === CELL_STATES.MISS) return "It's a miss!";
    };

    /**
     * Opens a modal with instructions
     */
    const getModal = () => {
        toggler.openModal("Take a turn first! Select any coordinate on the attack screen");
    };

    /**
     * Toggles the Pass/Done buttons based on game state
     * @param {string} action - "enable" or "disable"
     * @param {string} players - "one" for single player, "two" for two players
     */
    const togglePassDoneBtns = (action, players) => {
        const endPlayerOneRound = document.querySelector(".end-player-one");
        const endPlayerTwoRound = document.querySelector(".end-player-two");

        // When action = "enable" this is the only way to determine whether it's a one/two player game
        if (endPlayerOneRound.textContent === "Done") {players = "one";}
        if (endPlayerOneRound.textContent === "Pass") {players = "two";}

        // ONE PLAYER GAME TOGGLES:
        if ((action === "enable") && (players === "one")) {
            endPlayerOneRound.removeEventListener("click", getModal);
            endPlayerOneRound.addEventListener("click", toggler.goToPlayerOneNextRound);
        }
        if ((action === "disable") && (players === "one")) {
            endPlayerOneRound.removeEventListener("click", toggler.goToPlayerOneNextRound);
            endPlayerOneRound.addEventListener("click", getModal);
        }

        // TWO PLAYER GAME TOGGLES
        // Player One Toggles:
        if ((action === "enable") && (players === "two") && (activePlayer.name === "one")) {
            endPlayerOneRound.removeEventListener("click", getModal);
            endPlayerOneRound.addEventListener("click", toggler.goToStartScreen);
        }
        if ((action === "disable") && (players === "two") && (activePlayer.name === "one")) {
            endPlayerOneRound.removeEventListener("click", toggler.goToStartScreen);
            endPlayerOneRound.addEventListener("click", getModal);
        }

        // Player Two Toggles:
        if ((action === "enable") && (players === "two") && (activePlayer.name === "two")) {
            endPlayerTwoRound.removeEventListener("click", getModal);
            endPlayerTwoRound.addEventListener("click", toggler.goToStartScreen);
        }
        if ((action === "disable") && (players === "two") && (activePlayer.name === "two")) {
            endPlayerTwoRound.removeEventListener("click", toggler.goToStartScreen);
            endPlayerTwoRound.addEventListener("click", getModal);
        }
    };

    /**
     * Handles user attack selection on the game board
     * @param {Event} event - Click event
     */
    const userSelectsAttack = (event) => {
        const [x, y] = event.target.classList[1];
        const opponentBoard = activePlayer.opponent.getBoard();
        let attackedShip;

        disableAllCoordinateBtns();

        // Get the ship, if any located at that coordinate
        if ((opponentBoard[x][y])
            && (opponentBoard[x][y] !== CELL_STATES.MISS)
            && (opponentBoard[x][y] !== CELL_STATES.HIT)) {
                attackedShip = opponentBoard[x][y];
        }

        // Sends the attack
        activePlayer.opponent.receiveAttack([x, y]);

        const notice = getNotice(x, y);
        activePlayer.notice.textContent = notice;

        // Button color immediately changes to reflect hit/miss
        applyColor(x, y, event.target);

        // If a ship was hit, checks if the ship sunk
        if (attackedShip && activePlayer.opponent.isShipSunk(attackedShip)) {
            const shipDisplayName = SHIP_DISPLAY_NAMES[attackedShip];
            toggler.openModal(`${shipDisplayName} was sunk!`);
        }

        // Checks if Game is Over
        if (activePlayer.opponent.isGameOver()) {
            toggler.gameOverModal(`Game Over! You win!`);
        } else {
            togglePassDoneBtns("enable");
        }
    };

    /**
     * Disables all coordinate buttons for the active player
     */
    const disableAllCoordinateBtns = () => {
        const selector = `.player-${activePlayer.name}-buttons`;
        const buttons = document.querySelectorAll(selector);
        buttons.forEach(button => {
            disableCoordinate(button);
        });
    };

    /**
     * Disables a single coordinate button
     * @param {HTMLElement} button - Button to disable
     */
    const disableCoordinate = (button) => {
        button.removeEventListener("click", userSelectsAttack);
        button.classList.remove(CSS_CLASSES.HOVER);
    };

    /**
     * Generates random coordinates for computer attacks
     * @returns {Array} [x, y] coordinate pair
     */
    const generateRandomCoordinates = () => {
        const x = Math.floor(Math.random() * BOARD_SIZE);
        const y = Math.floor(Math.random() * BOARD_SIZE);
        const boardCell = activePlayer.opponent.getBoard()[x][y];

        // Recalculates random coordinate if it was already used
        if (boardCell === CELL_STATES.HIT || boardCell === CELL_STATES.MISS) {
            return generateRandomCoordinates();
        } else {
            return [x, y];
        }
    };

    /**
     * Relocates a dragged ship to its new position on the board
     * @param {string} shipname - Name of the ship
     * @param {number} shipLength - Length of the ship
     * @param {HTMLElement} targetButton - Target button where ship is dropped
     */
    const relocateDraggedShip = (shipname, shipLength, targetButton) => {
        // Two possible ships with that shipname
        const ships = document.querySelectorAll(`.${shipname}`);

        // Gets the one related to the current player
        const targetShip = Array.from(ships).find(ship => ship.classList.contains(`ship-${activePlayer.name}`));

        // Get the position of the targetButton
        const buttonRect = targetButton.getBoundingClientRect();
        const CELL_SIZE = 40; // Size of each cell in pixels

        // Set ship styles (absolute positioning)
        targetShip.style.position = "absolute";
        targetShip.style.left = `${buttonRect.left}px`; // Horizontal position
        targetShip.style.top = `${buttonRect.top}px`; // Vertical position
        targetShip.style.width = `${CELL_SIZE * shipLength}px`; // Width based on ship length
        targetShip.style.height = `${CELL_SIZE}px`; // Consistent height

        targetShip.classList.add("after-placement");
    };

    /**
     * Handles drop events for ship placement
     * @param {Event} event - Drop event
     */
    const buttonDropHandler = (event) => {
        event.preventDefault();

        // Get the name of the ship that's being placed
        const shipname = event.dataTransfer.getData("ship");
        const shipLength = SHIP_LENGTHS[shipname];

        if (!shipLength) return; // Early exit if invalid ship name

        // Find target button's grid position
        const [x, y] = event.target.classList[1].split('').map(Number);
        const occupiedCoordinates = [];

        // Validate placement (avoid overflow)
        if (y > BOARD_SIZE - shipLength) {
            toggler.openModal("Invalid placement! The ship would overflow the board.");
            return;
        }

        // Add ship coordinates horizontally
        for (let i = 0; i < shipLength; i++) {
            const buttonId = `${x}${y + i}`;
            const [newX, newY] = buttonId;
            occupiedCoordinates.push([newX, newY]); // Format needed for placeship function
        }

        const shipsBoard = activePlayer.activePlayer.getBoard();

        // Reset the placement of the ship
        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                if (shipsBoard[i][j] === shipname) {
                    shipsBoard[i][j] = false;
                }
            }
        }

        // Check if the selected coordinates are valid
        if (!activePlayer.activePlayer.arePositionsAvailable(occupiedCoordinates)) {
            toggler.openModal("Cannot overlap ships, please try placing that in an empty location");
            return; // Aborts the placement process if coordinates are invalid
        }

        // Store the placed ships in the player's board
        activePlayer.activePlayer.placeship(shipname, occupiedCoordinates);

        // Reapply style values to the ship
        relocateDraggedShip(shipname, shipLength, event.target);
    };

    return {
        /**
         * Displays the game board for attacks
         * @param {HTMLElement} displayBoard - DOM element to render board in
         */
        displayBoard(displayBoard = activePlayer.display) {
            const opponentBoard = activePlayer.opponent.getBoard();
            const name = activePlayer.name;

            for (let i = 0; i < opponentBoard.length; i++) {
                for (let j = 0; j < opponentBoard[i].length; j++) {
                    const button = document.createElement("button");
                    button.classList.add(`player-${name}-buttons`, `${i}${j}`, CSS_CLASSES.HOVER);
                    button.addEventListener("click", userSelectsAttack);
                    applyColor(i, j, button);

                    displayBoard.appendChild(button);
                }
            }

            togglePassDoneBtns("disable");
        },

        /**
         * Displays the player's ships on their board
         * @param {HTMLElement} displayBoard - DOM element to render ships in
         */
        displayShips(displayBoard = activePlayer.shipPlacement) {
            const playerBoard = activePlayer.activePlayer.getBoard();
            const name = activePlayer.name;

            for (let i = 0; i < playerBoard.length; i++) {
                for (let j = 0; j < playerBoard[i].length; j++) {
                    const button = document.createElement("button");
                    button.classList.add(`player-${name}-ship-buttons`, `${i}${j}`);

                    // Enable drag and drop
                    button.addEventListener("dragover", (event) => {
                        event.preventDefault();
                    });
                    button.addEventListener("drop", buttonDropHandler);

                    // Mark ships that are selected
                    if (playerBoard[i][j]) {
                        button.classList.add(CSS_CLASSES.SELECTED);
                    }

                    // Mark hits only
                    applyColor(i, j, button, "ships");

                    displayBoard.appendChild(button);
                }
            }
        },

        /**
         * Resets the specified board type
         * @param {string} boardType - "board" for attack board, "ships" for ship board
         */
        reset(boardType) {
            if (boardType === "board") {
                activePlayer.display.innerHTML = "";
            }
            if (boardType === "ships") {
                activePlayer.shipDisplay.innerHTML = "";
                activePlayer.shipPlacement.innerHTML = "";
            }
        },

        /**
         * Switches between players
         */
        switchPlayers() {
            activePlayer = activePlayer === players[0] ? players[1] : players[0];
        },

        /**
         * Executes computer's turn
         * @returns {Array|undefined} Coordinates of hit, if any
         */
        computerTurn() {
            const [x, y] = generateRandomCoordinates();
            activePlayer.opponent.receiveAttack([x, y]);

            // Check if game is over
            if (activePlayer.opponent.isGameOver()) {
                toggler.gameOverModal("Game Over! You lose!");
            }

            // Get the result of computer's turn and load the modal for player1
            const result = getNotice(x, y);
            toggler.computerModal(`Computer's turn is over. ${result}`);

            if (result === "It's a hit!") {
                return [x, y];
            }
        },

        /**
         * Places all ships randomly for computer player
         */
        computerPlaceAllships() {
            const shipTypes = Object.keys(SHIP_LENGTHS);
            shipTypes.forEach(shipType => {
                activePlayer.activePlayer.computerPlaceship(shipType);
            });
        },

        /**
         * Executes the pass/done toggle functionality
         * @param {string} action - "enable" or "disable"
         * @param {string} players - Player type
         */
        executePassDoneToggle(action, players) {
            togglePassDoneBtns(action, players);
        },

        /**
         * Handles drag start event for ships
         * @param {Event} event - Drag start event
         */
        dragStart(event) {
            const shipname = event.target.classList[0];
            event.dataTransfer.setData("ship", shipname);

            setTimeout(() => {
                event.target.style.display = "none"; // Hide the original during drag
            }, 0);
        },

        /**
         * Handles drag end event for ships
         * @param {Event} event - Drag end event
         */
        dragEnd(event) {
            event.target.style.display = "block"; // Show it again after drop
        },

        /**
         * Checks if all ships have been placed on the board
         * @returns {boolean} True if all ships are placed
         */
        areAllShipsPlaced() {
            const board = activePlayer.activePlayer.getBoard();
            const shipTypes = Object.keys(SHIP_LENGTHS);
            const flatBoard = board.flat();

            // Check if all ships are present in the flattened array
            return shipTypes.every(shipType => flatBoard.includes(shipType));
        },
    };
};

export const controller = screenController();

