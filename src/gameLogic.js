/**
 * @module gameLogic
 * Core game logic for the Battleship game
 */

import { SHIP_LENGTHS, BOARD_SIZE, CELL_STATES } from './constants.js';

/**
 * Factory function that creates a ship with a given length
 * @param {number} length - The length of the ship
 * @returns {Object} Ship object with methods to track hits and check if sunk
 */
export const ship = (length) => {
    let hits = 0;

    return {
        length,
        hits() {
            // Length is the max # of hits, so hits should not exceed it
            if (hits < length) {
                ++hits;
            }
        },
        getHits() {
            return hits;
        },
        isSunk() {
            return hits === length;
        }
    };
};

/**
 * Factory function that creates a game board
 * @returns {Object} Game board object with methods to place ships, receive attacks, etc.
 */
export const gameBoard = () => {
    // Initialize empty board (10x10 grid)
    const board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(false));

    // Initialize ships
    const aircraftCarrier = ship(SHIP_LENGTHS.aircraftCarrier);
    const battleship = ship(SHIP_LENGTHS.battleship);
    const cruiser = ship(SHIP_LENGTHS.cruiser);
    const submarine = ship(SHIP_LENGTHS.submarine);
    const destroyer = ship(SHIP_LENGTHS.destroyer);

    /**
     * Helper function to select a ship by name
     * @param {string} shipname - Name of the ship to select
     * @returns {Object|undefined} The ship object or undefined if not found
     */
    const selectShip = (shipname) => {
        const ships = {
            aircraftCarrier,
            battleship,
            cruiser,
            submarine,
            destroyer
        };

        return ships[shipname];
    };

    /**
     * Validates if coordinates are in a valid sequence (adjacent horizontally or vertically)
     * @param {Array} coordinates - Array of coordinate pairs [x,y]
     * @returns {boolean} True if placement is valid, false otherwise
     */
    const isValidPlacement = (coordinates) => {
        let [x, y] = coordinates[0];
        for (let i = 1; i < coordinates.length; i++) {
            let [x2, y2] = coordinates[i];

            // Check if coordinates form a continuous line (horizontally or vertically)
            if (x2 - x === 0 && y2 - y !== 1) { // Same row (horizontal)
                return false;
            } else if (x2 - x === 1 && y2 - y !== 0) { // Next row (vertical)
                return false;
            } else if ((x2 - x < 0) || (x2 - x > 1)) { // Check for invalid x values
                return false;
            }

            x = x2;
            y = y2;
        }

        return true;
    };

    return {
        getBoard() {
            return board;
        },

        /**
         * Places a ship on the board at specified coordinates
         * @param {string} shipname - Name of the ship to place
         * @param {Array} coordinates - Array of coordinate pairs where ship will be placed
         * @throws {Error} If ship name is invalid, placement is invalid, or coordinates don't match ship length
         */
        placeship(shipname, coordinates) {
            const shipObj = selectShip(shipname);

            if (!shipObj) throw new Error("That's not a valid ship name");

            // Check that the coordinates are correct
            if (!isValidPlacement(coordinates)) throw new Error("That's not a valid placement.");

            // Coordinate is an array, ship is an object with a length property
            if (coordinates.length !== shipObj.length) throw new Error("Make sure to select a number of locations on the board that are EQUAL to the ship's length.");

            for (let i = 0; i < coordinates.length; i++) {
                let [x, y] = coordinates[i];
                board[x][y] = shipname;
            }
        },

        /**
         * Processes an attack at specified coordinates
         * @param {Array} coordinate - [x,y] coordinate to attack
         * @throws {Error} If coordinate was already attacked
         */
        receiveAttack(coordinate) {
            const [x, y] = coordinate;

            if (!board[x][y]) {
                board[x][y] = CELL_STATES.MISS;
                return;
            }

            if (board[x][y] === CELL_STATES.MISS || board[x][y] === CELL_STATES.HIT) {
                throw new Error("You already tried that spot, choose another.");
            }

            const shipObj = selectShip(board[x][y]);
            board[x][y] = CELL_STATES.HIT;
            shipObj.hits();
        },

        /**
         * Retrieves a ship object by name
         * @param {string} shipname - Name of the ship to retrieve
         * @returns {Object|undefined} Ship object or undefined if not found
         * @throws {Error} If ship name is invalid
         */
        getShip(shipname) {
            return selectShip(shipname);
        },

        /**
         * Checks if a specific ship is sunk
         * @param {string} shipname - Name of the ship to check
         * @returns {boolean} True if ship is sunk, false otherwise
         */
        isShipSunk(shipname) {
            const shipObj = selectShip(shipname);
            return shipObj ? shipObj.isSunk() : false;
        },

        /**
         * Checks if all ships are sunk (game over)
         * @returns {boolean} True if all ships are sunk, false otherwise
         */
        isGameOver() {
            const ships = [battleship, aircraftCarrier, submarine, cruiser, destroyer];
            return ships.every(ship => ship.isSunk());
        },

        /**
         *
         * @param {Array} coordinates - Array of coordinate pairs to check
         * @returns {boolean} True if placement is valid, false otherwise.
         */
        checkValid(coordinates) {
            return isValidPlacement(coordinates);
        },

        /**
         * Checks if all positions in coordinates array are available (empty)
         * @param {Array} coordinates - Array of coordinate pairs to check
         * @returns {boolean} True if all positions are available, false otherwise
         */
        arePositionsAvailable(coordinates) {
            for (let i = 0; i < coordinates.length; i++) {
                let [x, y] = coordinates[i];
                if (board[x][y]) return false;
            }
            return true;
        },
    };
};

/**
 * Factory function that creates a player
 * @returns {Object} Player object with methods to interact with their game board
 */
export const player = () => {
    const game = gameBoard();

    return {
        getBoard() {
            return game.getBoard();
        },

        receiveAttack(coordinate) {
            return game.receiveAttack(coordinate);
        },

        isShipSunk(shipname) {
            return game.isShipSunk(shipname);
        },

        isGameOver() {
            return game.isGameOver();
        },

        placeship(shipname, coordinates) {
            return game.placeship(shipname, coordinates);
        },

        /**
         * Places a ship randomly on the computer's board
         * @param {string} shipname - Name of the ship to place
         * @returns {void}
         */
        computerPlaceship(shipname) {
            let xStart = Math.floor(Math.random() * BOARD_SIZE);
            let yStart = Math.floor(Math.random() * BOARD_SIZE);
            const coordinates = [];

            // Checks if starting coordinate is taken
            if (game.getBoard()[xStart][yStart]) {
                return this.computerPlaceship(shipname); // Regenerates if it is
            } else {
                coordinates.push([[xStart], [yStart]]); // Adds to coordinates if not
            }

            const length = SHIP_LENGTHS[shipname];

            // Add remaining coordinates in horizontal order
            for (let i = 1; i < length; i++) {
                yStart++;

                // Checks if y value exceeds the board
                if (yStart > BOARD_SIZE - 1) {
                    return this.computerPlaceship(shipname);
                } else {
                    coordinates.push([[xStart], [yStart]]);
                }
            }

            // Places ship IF coordinates are available
            if (this.arePositionsAvailable(coordinates)) {
                game.placeship(shipname, coordinates);
            } else {
                this.computerPlaceship(shipname); // Or restarts the process
            }
        },

        arePositionsAvailable(coordinates) {
            return game.arePositionsAvailable(coordinates);
        }
    };
};
