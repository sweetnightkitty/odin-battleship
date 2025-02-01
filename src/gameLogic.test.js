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
    it("Does not work with an incorrect ship name", ()=> {
        const game = gameBoard();
        const board = game.getBoard();

        expect(()=>game.placeship("SS Anne", [1, 1], [2, 2])).toThrow("That's not a valid ship name");
        expect(board[1][1]).toBe(false);
    })

    it("Spaces selected must be the same size as the ship", ()=> {
        const board = gameBoard();
        //Cruiser should be 3, and destroyer should be 2 coordinates
        expect(()=> board.placeship("cruiser", [[1, 1], [2, 2]])).toThrow();
        expect(()=> board.placeship("destroyer", [1, 1], [2, 2], [3, 3])).toThrow();
    })

    it("Places ships on the board", ()=> {
        const game = gameBoard();
        const board = game.getBoard();
        expect(board[1][1]).toBe(false);
        expect(board[4][4]).toBe(false);

        //Place Cruiser
        game.placeship("cruiser", [[1, 1], [2, 2], [3, 3]]);
        expect(board[1][1]).toBe("cruiser");

        //Place Destroyer
        game.placeship("destroyer", [[4, 4], [5, 5]]);
        expect(board[4][4]).toBe("destroyer");

    })

    it("Does not allow duplicate coordinates or reassigning", ()=> {
        const game = gameBoard();
        const board = game.getBoard();

        //Before placing cruiser
        expect(board[5][2]).toBe(false);
        // expect(JSON.stringify(game.placeship("cruiser", [[1, 1], [2, 2], [3, 5]]))).toBe(JSON.stringify(ship(3)));

        //Place cruiser
        game.placeship("cruiser", [[1, 1], [2, 2], [5, 2]]);
        expect(board[5][2]).toBe("cruiser");

        //Placing destroyer at the same place
        expect(()=> game.placeship("destroyer", [[1, 1], [5, 2]])).toThrow();
    })
})

describe("Receive attacks", ()=> {
    it("Records misses", ()=> {
        const game = gameBoard();
        const board = game.getBoard();
        expect(board[3][3]).toBe(false);

        game.recieveAttack([3, 3]);
        expect(board[3][3]).toBe("miss");
    })

    it("Records hits", ()=> {
        const game = gameBoard();
        const board = game.getBoard();
        game.placeship("destroyer", [[1, 2], [3, 4]]);
        game.recieveAttack([3, 4]);
        expect(board[3][4]).toBe("hit");
    })

    it("Throws an error if spot already marked miss or hit", ()=> {
        const game = gameBoard();

        //miss case:
        game.recieveAttack([3, 3]);
        expect(()=> game.recieveAttack([3, 3])).toThrow();

        //hit case:
        game.placeship("destroyer", [[1, 1], [2, 2]]);
        game.recieveAttack([1, 1]);
        expect(()=> game.recieveAttack([1, 1])).toThrow();

    })

    it("Marks a ship as hit", ()=> {
        const game = gameBoard();

        game.placeship("destroyer", [[1, 1], [2, 2]]);
        game.recieveAttack([1, 1]);
        expect(game.getShip("destroyer").getHits()).toBe(1);

    })
})