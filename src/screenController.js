import { player } from "./gameLogic";

export const screenController = () => {
    const playerOne = player();
    const playerTwo = player();
    const playerOneDisplay = document.querySelector(".player-one-board");
    const playerTwoDisplay = document.querySelector(".player-two-board");
    const playerOneShips = document.querySelector(".player-one-ships");
    const playerTwoShips = document.querySelector(".player-two-ships");

    const players = [
        {
            activePlayer: playerOne,
            opponent: playerTwo,
            name: "one",
            display: playerOneDisplay,
            shipDisplay: playerOneShips,
        },

        {
            activePlayer: playerTwo,
            opponent: playerOne,
            name: "two", //computer playing
            display: playerTwoDisplay, // computer playing
            shipDisplay: playerTwoShips,
        }
    ]

    const computerPlaysRound = () => {
        //Generate random coordinates
        const randomX = Math.floor(Math.random() * (0 - 10));
        const randomY = Math.floor(Math.random() * (0 - 10));

        //Recalculates random coordinate if it was already used
        if(activePlayer.opponent.getBoard()[randomX][randomY]) {
            computerAttack();
        } else {
            activePlayer.opponent.recieveAttack([randomX, randomY]);
        }

        //Checks if game is over
        if(activePlayer.opponent.isGameOver()) {
            alert("Game Over!");
        }

        switchPlayers();
    }

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
        displayBoard() {
            const opponentBoard = activePlayer.opponent.getBoard();
            const name = activePlayer.name;

            for(let i = 0; i < opponentBoard.length; i++) {
                for(let j = 0; j < opponentBoard[i].length; j++) {
                    const button = document.createElement("button");
                    button.classList.add(`player-${name}-buttons`, `${i}${j}`);
                    applyColor(i, j, opponentBoard, button);
                    activePlayer.display.appendChild(button);
                }
            }

            //Buttons must be defined AFTER displayBoard generates new buttons.
            const playerOneButtons = document.querySelectorAll(".player-one-buttons");
            const playerTwoButtons = document.querySelectorAll(".player-two-buttons");

            //Need to ensure the event listener is added every time new buttons display.
            playerOneButtons.forEach(button => {
                button.addEventListener("click", ()=> {
                    this.playRound(button);
                    this.resetBoard(playerOneDisplay);
                    this.displayBoard(playerOneDisplay);

                })
            })
        },

        displayShips() {
            const playerBoard = activePlayer.activePlayer.getBoard();
            const name = activePlayer.name;

            for(let i = 0; i < playerBoard.length; i++) {
                for(let j = 0; j < playerBoard[i].length; j++) {
                    const button = document.createElement("button");
                    button.classList.add(`player-${name}-ship-buttons`, `${i}${j}`);
                    //Need to create color for the ships / hits
                    activePlayer.shipDisplay.appendChild(button);
                }
            }
        },

        resetBoard(displayBoard) {
            displayBoard.innerHTML = "";
        },

        playRound(button) {
            const [x, y] = button.classList[1];

            //Send the attack to the opponent - this works
            activePlayer.opponent.recieveAttack([x, y]);
            
            //switch turns
        },
        
    }
}