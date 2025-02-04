import { gameBoard } from "./gameLogic";
import { player } from "./gameLogic";

export const screenController = () => {
    //Default begins with player 1:
        //Player 1 submits coordinates by interacting with board
        //Player 2 receives the attack - hit or miss
            //hit: announcement + turns btn red
            //miss: announcement + turns btn white
        //Checks isGameOver for Player2
            //yes: goes to game over screen
            //no: switches to player 2's turn / player1 receives attacks and checks


    //Player 1 displays to -> player one's UI

    const playerOne = player();
    const playerTwo = player();


    //Player1 -> player2's board, 
    //Player2 = computer == player1's board
    const players = [
        {
            name: "one",
            gameBoard: playerOne.getGameBoard(),
            opponent: playerTwo.getGameBoard(),
        },

        {
            name: "two",
            gameBoard: playerTwo.getGameBoard(),
            opponent: playerOne.getGameBoard(),
        }
    ];

    //On screen board
    const boardUI = document.querySelector(".player-one-board");

    let activePlayer = players[0];

    const switchPlayers = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    return {
        //Creates UI buttons for both boards
        //displayBoard = on screen div
        displayBoard(displayBoard) {
            const opponentBoard = activePlayer.opponent.getBoard();
            for(let i = 0; i < opponentBoard.length; i++) {
                for(let j = 0; j < opponentBoard[i].length; j++) {
                    const button = document.createElement("button");
                    button.classList.add(`player-${activePlayer.name}-buttons`, `${i}${j}`);
                    displayBoard.appendChild(button);
                }
            }
        },
    }
}