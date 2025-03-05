export const ship = (length) => {
    let hits = 0;

    return {
        length,
        hits () {
            //Length is the max # of hits, so hits should not exceed it.
            if(hits < length){
                ++hits;
            }
        },
        getHits() {
            return hits;
        },
        isSunk() {
            return hits == length;
        }
    }
}

export const gameBoard = () => {
    const board = Array.from({length: 10}, ()=> Array(10).fill(false));

        const aircraftCarrier = ship(5);
        const battleship = ship(4);
        const cruiser = ship(3);
        const submarine = ship(3);
        const destroyer = ship(2);

    const selectShip = (shipname) => {
        if(shipname == "aircraftCarrier") {
            return aircraftCarrier;
        } else if(shipname == "battleship") {
            return battleship;
        } else if(shipname == "cruiser") {
            return cruiser;
        } else if(shipname == "submarine") {
            return submarine;
        } else if(shipname == "destroyer") {
            return destroyer;
        }
    }

    //Where coordinates are provided in order from top-bottom or left-right
    const isValidPlacement = (coordinates) => {
        let [x, y] = coordinates[0];
        for(let i = 1; i < coordinates.length; i++) {
            let [x2, y2] = coordinates[i];

            if(x2 - x == 0) {
                if(y2 - y != 1) {
                    return false;
                }
            } else if(x2 - x == 1) {
                if(y2 - y != 0) {
                    return false;
                }
            } else if((x2 - x < 0) || (x2 - x > 1)) {
                return false;
            }

            x = x2;
            y = y2;
        }
        return true;
    }

    return {
        getBoard() {
            return board;
        },
        placeship(shipname, coordinates) {
            const ship = selectShip(shipname);

            if(!ship) throw new Error ("That's not a valid ship name");

            //Check that the coordinates are correct
            if(!isValidPlacement(coordinates)) throw new Error("That's not a valid placement.");
            
            //Coordinate is an array, ship is an object with a length property
            if(coordinates.length != ship.length) throw new Error("Make sure to select a number of locations on the board that are EQUAL to the ship's length.")
            
            for(let i = 0; i < coordinates.length; i++) {
                let [x, y] = coordinates[i];
                board[x][y] = shipname;
            }
        },
        recieveAttack(coordinate) {
            const [x, y] = coordinate;

            if(!board[x][y]) {
                board[x][y] = "miss";
            } else {
                if(board[x][y] == "miss") {
                    throw new Error("You already tried that spot, choose another.");
                } else if(board[x][y] == "hit") {
                    throw new Error("You already hit something located there. Choose another spot.");
                } else {
                    const ship = selectShip(board[x][y]);
                    board[x][y] = "hit";
                    ship.hits();
                }
            }
        },

        getShip(shipname) {
           return selectShip(shipname);
        },

        isShipSunk(shipname) {
            let ship;
            if(shipname == "aircraftCarrier") {ship = aircraftCarrier};
            if(shipname == "battleship") {ship = battleship};
            if(shipname == "cruiser") {ship = cruiser};
            if(shipname == "submarine") {ship = submarine};
            if(shipname == "destroyer") {ship = destroyer};

            return ship.isSunk();
        },

        isGameOver() {
            let sunkShips = 0;
            if(battleship.isSunk()) { ++sunkShips};
            if(aircraftCarrier.isSunk()) {++sunkShips};
            if(submarine.isSunk()) {++sunkShips};
            if(cruiser.isSunk()) {++sunkShips};
            if(destroyer.isSunk()) {++sunkShips};

            return sunkShips == 5;
        },

        checkvalid(coordinates) {
            return isValidPlacement(coordinates);
        },

        arePositionSAvailable(coordinates) {
            for(let i = 0; i < coordinates.length; i++) {
                let [x, y] = coordinates[i];
                if(board[x][y]) return false;
            }
            return true;
        },
    }
}

export const player = () => {
    const game = gameBoard();

    return {
        getBoard () {
            return game.getBoard();
        },

        recieveAttack(coordinate) {
            return game.recieveAttack(coordinate);
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

        computerPlaceship(shipname) {
            let xStart = Math.floor(Math.random() * (10));
            let yStart = Math.floor(Math.random() * (10));
            const coordinates = [];
    
            //Checks if starting coordinate is taken
            if(game.getBoard()[xStart][yStart]) {
                return this.computerPlaceship(shipname) //Regenerates if it is
            } else {
                coordinates.push([[xStart], [yStart]]); // Adds to coordinates if not
            }

            // Define ship lengths
            const shipLengths = {
                aircraftCarrier: 5,
                battleship: 4,
                cruiser: 3,
                submarine: 3,
                destroyer: 2
            };
            
            const length = shipLengths[shipname];

            //Add remaining coordinates in horizontal order.
            for(let i = 1; i < length; i++) {
                yStart++;

                //Checks if y value exceeds the board
                if(yStart > 9) {
                    return this.computerPlaceship(shipname);
                } else{
                    coordinates.push([[xStart], [yStart]]);
                }
            };

            //Places ship IF coordinates are available 
            if(this.arePositionSAvailable(coordinates)) {
                game.placeship(shipname, coordinates);
            } else{
                this.computerPlaceship(shipname); //Or restarts the process
            }
        },

        arePositionSAvailable(coordinates) {
            return game.arePositionSAvailable(coordinates);
        }
    }
} 