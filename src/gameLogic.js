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

    const arePositionSAvailable = (coordinates) => {
        for(let i = 0; i < coordinates.length; i++) {
            let [x, y] = coordinates[i];
            if(board[x][y]) return false;
        }
        return true;
    }

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
            
            //Coordinate is an array, ship is an object with a length property
            if(coordinates.length != ship.length) throw new Error("Make sure to select a number of locations on the board that are EQUAL to the ship's length.")
            
            //are those positions available? Prevents duplicate ship placements
            if(!arePositionSAvailable(coordinates)) throw new Error("Some of the positions you selected either don't exist or you already placed a ship there. Try again")

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
        }
    }
}

export const player = () => {
    const game = gameBoard();

    return {
        getGameBoard () {
            return game;
        }
    }
}