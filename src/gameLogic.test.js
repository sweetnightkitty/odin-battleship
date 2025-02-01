import { gameBoard, ship } from "./gameLogic.js";

describe("Ship Factory Function", ()=> {
    it("Ship initializes with correct length", () => {
        let myShip = ship(3);
        expect(myShip.length).toBe(3);
        myShip = ship(5);
        expect(myShip.length).toBe(5);
    })

    it("Ship tracks hits correctly", ()=> {
        const myShip = ship(3);
        expect(myShip.getHits()).toBe(0);
        myShip.hits();
        expect(myShip.getHits()).toBe(1);
        myShip.hits();
        myShip.hits();
        expect(myShip.getHits()).toBe(3);
    })

    it("Hits do not exceed ship length", ()=> {
        const myShip = ship(3);
        myShip.hits();
        myShip.hits();
        myShip.hits();
        myShip.hits();
        expect(myShip.getHits()).toBe(3);
    })

    it("Ship sinks when hits = length", ()=> {
        const myShip = ship(3);
        expect(myShip.isSunk()).toBe(false);
        myShip.hits();
        myShip.hits();
        expect(myShip.isSunk()).toBe(false);
        myShip.hits();
        expect(myShip.isSunk()).toBe(true);
        myShip.hits();
        expect(myShip.isSunk()).toBe(true);
    })
})

describe("Game Board factory function", ()=> {

    it("Board row and columns have a length of 10", ()=> {
        const board = gameBoard().getBoard();
        expect(board.length).toBe(10);
        expect(board[5].length).toBe(10);
        expect(board[10]).toBeUndefined();
        expect(board[2][10]).toBeUndefined();
    })

    it("Board logs correct values", ()=> {
        //Empty gameboard
        const board = gameBoard()
        expect(board.getBoard()[5][2]).toBe(false);

        //If board logs an attack on an empty spot
        board.recieveAttack([5, 2]);
        expect(board.getBoard()[5][2]).toBe("miss");

        //If board logs an attack on a spot marked miss:
        expect(()=> board.recieveAttack([5, 2])).toThrow();
    })

    describe("Place Ship function", ()=> {
        it("Correctly targets the ship object", ()=> {
            const board = gameBoard();
            const testCruiser = ship(3);
            const placeShipResult = board.placeship("cruiser");
            expect(JSON.stringify(placeShipResult)).toBe(JSON.stringify(testCruiser));
        })
    })
})