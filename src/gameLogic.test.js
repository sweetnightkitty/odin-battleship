import { newShip } from "./gameLogic.js";
import { ship } from "./gameLogic.js";

describe("Checks newShip function", ()=> {
    it("Returns the hits", ()=> {
        expect(newShip(5)).toStrictEqual({length: 5, hits: 0, isSunk: false});
    })
})

describe("ship function", ()=> {
    it("Returns individual ship objects", ()=> {
        expect(ship().battleship).toBeDefined();
        expect(ship().battleship).toStrictEqual({length: 4, hits: 0, isSunk: false});
        expect(ship().aircraftCarrier).toStrictEqual({length: 5, hits: 0, isSunk: false});
        expect(ship().cruiser).toStrictEqual({length: 3, hits: 0, isSunk: false});
        expect(ship().submarine).toStrictEqual({length: 3, hits: 0, isSunk: false});
        expect(ship().destroyer).toStrictEqual({length: 2, hits: 0, isSunk: false});
    })
})
