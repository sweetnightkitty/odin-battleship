import { isWebTarget } from "webpack-dev-server";
import { gameBoard, player, ship } from "./gameLogic.js";

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

    describe("Place Ship", ()=> {
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

        it("Must not allow non-linear and adjacent coordinates", ()=> {
            const board = gameBoard();
            board.placeship("cruiser", [[1, 1], [1, 2], [1, 3]]);
            expect(board.getBoard()[1][1]).toBe("cruiser");
            
            expect(()=> board.placeship("destroyer", [[3, 3], [5, 5]])).toThrow();
        })

        it("Places ships on the board", ()=> {
            const game = gameBoard();
            const board = game.getBoard();
            expect(board[1][1]).toBe(false);
            expect(board[4][4]).toBe(false);

            //Place Cruiser
            game.placeship("cruiser", [[1, 1], [1, 2], [1, 3]]);
            expect(board[1][1]).toBe("cruiser");

            //Place Destroyer
            game.placeship("destroyer", [[4, 4], [4, 5]]);
            expect(board[4][4]).toBe("destroyer");

        })

        it("Does not allow duplicate coordinates or reassigning", ()=> {
            const game = gameBoard();
            const board = game.getBoard();

            //Before placing cruiser
            expect(board[1][2]).toBe(false);

            //Place cruiser
            game.placeship("cruiser", [[1, 1], [1, 2], [1, 3]]);
            expect(board[1][2]).toBe("cruiser");

            //Placing destroyer at the same place
            expect(()=> game.placeship("destroyer", [[1, 1], [1, 2]])).toThrow();
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
            game.placeship("destroyer", [[1, 2], [1, 3]]);
            game.recieveAttack([1, 2]);
            expect(board[1][2]).toBe("hit");
        })
    
        it("Throws an error if spot already marked miss or hit", ()=> {
            const game = gameBoard();
    
            //miss case:
            game.recieveAttack([3, 3]);
            expect(()=> game.recieveAttack([3, 3])).toThrow();
    
            //hit case:
            game.placeship("destroyer", [[1, 1], [1, 2]]);
            game.recieveAttack([1, 1]);
            expect(()=> game.recieveAttack([1, 1])).toThrow();
    
        })
    
        it("Marks a ship as hit", ()=> {
            const game = gameBoard();
    
            game.placeship("destroyer", [[1, 1], [1, 2]]);
            game.recieveAttack([1, 1]);
            expect(game.getShip("destroyer").getHits()).toBe(1);
    
        })
    })
    
    describe("Is Game Over", ()=> {
        it("is game over", ()=> {
            const game = gameBoard();
            expect(game.isGameOver()).toBe(false);
    
            //When game is over:
            const board = game.getBoard();
            game.placeship("aircraftCarrier", [[1, 1], [1, 2], [1, 3], [1, 4], [1, 5]]);
            game.placeship("battleship", [[2, 1], [2, 2], [2, 3], [2, 4]]);
            game.placeship("submarine", [[3, 1], [3, 2], [3, 3]]);
            game.placeship("cruiser", [[4, 1], [4, 2], [4, 3]]);
            game.placeship("destroyer", [[5, 1], [5, 2]]);
            game.recieveAttack([1, 1]);
            game.recieveAttack([1, 2]);
            game.recieveAttack([1, 3]);
            game.recieveAttack([1, 4]);
            game.recieveAttack([1, 5]);
            game.recieveAttack([2, 1]);
            game.recieveAttack([2, 2]);
            game.recieveAttack([2, 3]);
            game.recieveAttack([2, 4]);
            game.recieveAttack([3, 1]);
            game.recieveAttack([3, 2]);
            game.recieveAttack([3, 3]);
            game.recieveAttack([4, 1]);
            game.recieveAttack([4, 2]);
            game.recieveAttack([4, 3]);
            game.recieveAttack([5, 1]);
            expect(game.isGameOver()).toBe(false);
            game.recieveAttack([5, 2]);
            expect(game.isGameOver()).toBe(true);
        })
    })
})

describe("Player", ()=> {
    it("Saves gameboard to each player", ()=> {
        const player1 = player();
        const player1Board = player1.getBoard();
        expect(player1Board[5][5]).toBe(false);

        const player2 = player();
        const player2Board = player2.getBoard();
        expect(player2Board[5][5]).toBe(false);
    })

    it("Stores hits on the correct board", ()=> {
        const player1 = player();
        const player2 = player();
        const player1Board = player1.getBoard();
        const player2Board = player2.getBoard();
        player1.recieveAttack([5, 5]);
        expect(player1Board[5][5]).toBe("miss");
        expect(player2Board[5][5]).toBe(false);
    })

})

describe("Is valid placement?", ()=> {
    it("Places a ship correctly", ()=> {
        const game = gameBoard();

        expect(game.checkvalid([[1, 1], [1, 2]])).toBe(true);
        expect(game.checkvalid([[1, 1], [5, 5]])).toBe(false);
        expect(game.checkvalid([[1, 3], [2, 3], [3, 3]])).toBe(true);
    })
})