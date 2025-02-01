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
})

describe("Place Ship function", ()=> {
    it("Correctly targets the ship object", ()=> {
        const board = gameBoard();
        const testCruiser = ship(3);

        //Cruiser has a length of 3 (thus 3 coordinates):
        const placeShipResult = board.placeship("cruiser", [[1, 1], [2, 2], [3, 3]]);

        //Serializes to the same string:
        expect(JSON.stringify(placeShipResult)).toBe(JSON.stringify(testCruiser));
    })

    it("Spaces selected must be the same size as the ship", ()=> {
        const board = gameBoard();
        //Cruiser has length 3, and should have 3 coordinates
        expect(()=> board.placeship("cruiser", [[1, 1], [2, 2]])).toThrow();

    
        const placeShipResult = board.placeship("cruiser", [[1, 1], [2, 2], [3, 3]]);
        const testCruiser = ship(3);
        //Serializes to the same string:
        expect(JSON.stringify(placeShipResult)).toBe(JSON.stringify(testCruiser));
    })

    it("Does not allow duplicate coordinates or reassigning", ()=> {
        const game = gameBoard();
        const board = game.getBoard();

        //Before hitting [5, 2]
        expect(JSON.stringify(game.placeship("cruiser", [[1, 1], [2, 2], [3, 5]]))).toBe(JSON.stringify(ship(3)));

        game.recieveAttack([3, 5]);
        expect(board[3][5]).toBe("miss");

        //After hitting [5, 2]
        expect(()=> game.placeship("cruiser", [[1, 1], [2, 2], [3, 5]])).toThrow();
    })
})