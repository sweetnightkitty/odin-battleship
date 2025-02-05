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

    //On screen board
    const boardUI = document.querySelector(".player-one-board");

    let activePlayer = playerOne;
    let opponent = playerTwo;

    const switchPlayers = () => {
        opponent = activePlayer;
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    };

    return {
        //Creates UI buttons for both boards
        displayBoard(displayBoard) {
            const opponentBoard = opponent.getBoard();
            let name;
            if(activePlayer == playerOne) {
                name = "one";
            } else if(activePlayer == playerTwo) {
                name = "two";
            }

            for(let i = 0; i < opponentBoard.length; i++) {
                for(let j = 0; j < opponentBoard[i].length; j++) {
                    const button = document.createElement("button");
                    button.classList.add(`player-${name}-buttons`, `${i}${j}`);
                    displayBoard.appendChild(button);
                }
            }
        },
    }
}