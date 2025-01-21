export function ship() {

    const battleship = newShip(4);
    const aircraftCarrier = newShip(5);
    const cruiser = newShip(3);
    const submarine = newShip(3);
    const destroyer = newShip(2);

    return {
        battleship,
        aircraftCarrier,
        cruiser,
        submarine,
        destroyer
    }
}


export function newShip(length) {
    return {
        length: length,
        hits: 0,
        isSunk: false,
        }
    };