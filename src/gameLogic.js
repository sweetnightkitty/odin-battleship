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
        } else if(shipname == "battleshp") {
            return battleship;
        } else if(shipname == "cruiser") {
            return cruiser;
        } else if(shipname == "submarine") {
            return submarine;
        } else if(shipname == "destroyer") {
            return destroyer;
        }
    }

    const isPositionAvailable = (coordinate) => {
        const [x, y] = coordinate;
        if(board[x][y]) return;
    }

    return {
        getBoard() {
            return board;
        },
        placeship(shipname, coordinates) {
            const ship = selectShip(shipname);
            
            //Coordinate is an array, ship is an object with a length property
            if(coordinates.length != ship.length) throw new Error("Make sure to select a number of locations on the board that are EQUAL to the ship's length.")
            
            //is that position available?
            return ship;
        },
        recieveAttack(coordinate) {
            const [x, y] = coordinate;

            if(!board[x][y]) {
                board[x][y] = "miss";
            } else if(board[x][y] == "miss") {
                throw new Error("You already tried that spot, choose another.");
            }
        },
    }
}