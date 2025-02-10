import { player } from "./gameLogic";

export const screenController = () => {
    const playerOne = player();
    const playerTwo = player();
    const playerOneDisplay = document.querySelector(".player-one-board");

    const players = [
        {
            activePlayer: playerOne,
            opponent: playerTwo,
            name: "one"
        },

        {
            activePlayer: playerTwo,
            opponent: playerOne,
            name: "two"
        }
    ]

    let activePlayer = players[0]
    const switchPlayers = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const applyColor = (x, y, opponentBoard, button) => {
        if(opponentBoard[x][y] == "hit") {
            button.classList.add("hit");
        } else if(opponentBoard[x][y] == "miss") {
            button.classList.add("miss");
        }
    }

    return {
        //Creates UI buttons for both boards, playerOne is the default staring player
        displayBoard(displayBoard = playerOneDisplay) {
            const opponentBoard = activePlayer.opponent.getBoard();
            const name = activePlayer.name;

            for(let i = 0; i < opponentBoard.length; i++) {
                for(let j = 0; j < opponentBoard[i].length; j++) {
                    const button = document.createElement("button");
                    button.classList.add(`player-${name}-buttons`, `${i}${j}`);
                    applyColor(i, j, opponentBoard, button);
                    displayBoard.appendChild(button);
                }
            }

            //Buttons must be defined AFTER displayBoard generates new buttons.
            const playerOneButtons = document.querySelectorAll(".player-one-buttons");

            //Need to ensure the event listener is added every time new buttons display.
            playerOneButtons.forEach(button => {
                button.addEventListener("click", ()=> {
                    this.playRound(button);
                    this.resetBoard(playerOneDisplay);
                    this.displayBoard(playerOneDisplay);

                    //Checks if game is over
                    if(activePlayer.opponent.isGameOver()) {
                        alert("Game Over!");
                    }
                })
            })
        },

        resetBoard(displayBoard) {
            displayBoard.innerHTML = "";
        },

        playRound(button) {
            const [x, y] = button.classList[1];

            //Send the attack to the opponent - this works
            activePlayer.opponent.recieveAttack([x, y]);
            
            //switch turns
        }
    }
}