/**
 * @module constants
 * Centralized constants for the Battleship game
 */

/**
 * Size of the game board (BOARD_SIZE x BOARD_SIZE)
 */
export const BOARD_SIZE = 10;

/**
 * Ship lengths by type
 */
export const SHIP_LENGTHS = {
    aircraftCarrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2
};

/**
 * Ship display names for UI presentation
 */
export const SHIP_DISPLAY_NAMES = {
    aircraftCarrier: "Aircraft Carrier",
    battleship: "Battleship",
    cruiser: "Cruiser", 
    submarine: "Submarine",
    destroyer: "Destroyer"
};

/**
 * Board cell states
 */
export const CELL_STATES = {
    EMPTY: false,
    HIT: "hit",
    MISS: "miss"
};

/**
 * CSS class names used in the UI
 */
export const CSS_CLASSES = {
    HIT: "hit",
    MISS: "miss",
    SELECTED: "selected",
    HOVER: "hover"
};