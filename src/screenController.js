import { player } from "./gameLogic";

const screenController = () => {
    const playerOne = player();
    const playerTwo = player();
    const playerOneDisplay = document.querySelector(".player-one-board");
    const playerTwoDisplay = document.querySelector(".player-two-board");
    const playerOneShips = document.querySelector(".player-one-ships");
    const playerTwoShips = document.querySelector(".player-two-ships");

    const playerOneNotice = document.querySelector(".player-one-notice");
    const playerTwoNotice = document.querySelector(".player-two-notice");

    const players = [
        {
            activePlayer: playerOne,
            opponent: playerTwo,
            name: "one",
            display: playerOneDisplay,
            shipDisplay: playerOneShips,
            notice: playerOneNotice,
        },

        {
            activePlayer: playerTwo,
            opponent: playerOne,
            name: "two", //computer playing
            display: playerTwoDisplay, // computer playing
            shipDisplay: playerTwoShips,
            notice: playerTwoNotice,
        }
    ]

    let activePlayer = players[0]

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

    }

    const applyColor = (x, y, button) => {
        const opponentBoard = activePlayer.opponent.getBoard();
        if(opponentBoard[x][y] == "hit") {
            button.classList.add("hit");
        } else if(opponentBoard[x][y] == "miss") {
            button.classList.add("miss");
        }
    }

    const getNotice = (x, y) => {
        const opponentBoard = activePlayer.opponent.getBoard();
        if(opponentBoard[x][y] == "hit") return "It's a hit!";
        if(opponentBoard[x][y] == "miss") return "It's a miss!";
    }

    return {
        displayBoard() {
            const opponentBoard = activePlayer.opponent.getBoard();
            const name = activePlayer.name;

            for(let i = 0; i < opponentBoard.length; i++) {
                for(let j = 0; j < opponentBoard[i].length; j++) {
                    const button = document.createElement("button");
                    button.classList.add(`player-${name}-buttons`, `${i}${j}`);
                    applyColor(i, j, button);
                    activePlayer.display.appendChild(button);
                }
            }

            //Buttons must be defined AFTER displayBoard generates new buttons.
            const playerOneButtons = document.querySelectorAll(".player-one-buttons");
            const playerTwoButtons = document.querySelectorAll(".player-two-buttons");

            //Then event listeners can be added on
            playerOneButtons.forEach(button => button.addEventListener("click", this.playRound));
            playerTwoButtons.forEach(button => button.addEventListener("click", this.playRound));
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

        reset(boardType) {
            if(boardType == "board") {activePlayer.display.innerHTML = ""};
            if(boardType == "ships") {activePlayer.shipDisplay.innerHTML = ""};
        },

        playRound(event) {
            //Get the coordinates of the attack
            const button = event.target;
            const [x, y] = button.classList[1];

            //Send the attack to the opponent
            activePlayer.opponent.recieveAttack([x, y]);

            //Displays the results:
            applyColor(x, y, button);
            activePlayer.notice.textContent = getNotice(x, y);

            //Disables the buttons to prevent additional attacks
            const playerOneButtons = document.querySelectorAll(".player-one-buttons");
            playerOneButtons.forEach(button => button.disabled = true);

            const playerTwoButtons = document.querySelectorAll(".player-two-buttons");
            playerTwoButtons.forEach(button => button.disabled = true);
        },

        switchPlayers() {
            activePlayer = activePlayer === players[0] ? players[1] : players[0];
        },
        
    }
}

export const controller = screenController();

export const screenToggler = () => {
    const gamePlayerOne = document.querySelector(".game-player-one");

    const gamePlayerTwo = document.querySelector(".game-player-two");

    const startRound = document.querySelector(".start-round");
    const startRoundBtn = document.querySelector(".start-round-btn");
    return {
        goToStartRound() {
            if(event.target.classList[1] == "end-player-one") {
                 //Hide player One
                 gamePlayerOne.style.display = "none";
         
                 //Show intermediate screen
                 startRound.style.display = "flex";
         
                 //Add a class to the intermediate screen to know who plays next
                 if(startRoundBtn.classList.contains("one")) {startRoundBtn.classList.remove("one")};
                 startRoundBtn.classList.add("two");
                 startRoundBtn.textContent = "Player Two Start";
         
            } else if(event.target.classList[1] == "end-player-two") {
                 //Hide Player Two
                 gamePlayerTwo.style.display = "none";
         
                 //Shows Intermediate Screen
                 startRound.style.display = "flex";
         
                 //Add a class to the intermediate screen to know who plays next
                 startRoundBtn.classList.add("one");
                 startRoundBtn.classList.remove("two");
                 startRoundBtn.textContent = "Player One Start";
         
            }
         },

        nextPlayerRound () {
                //Hide the intermediate screen
                startRound.style.display = "none";
            
                //Regenerate the game for current active player
                controller.switchPlayers();
                controller.reset("board");
                controller.reset("ships");
                controller.displayBoard();
                controller.displayShips(); // may be an issue
                
                //Displays the correct person's board:
                const nextPlayer = event.target.classList[1];
                if(nextPlayer == "one") {
                    gamePlayerOne.style.display = "flex";
                } else if(nextPlayer == "two") {
                    gamePlayerTwo.style.display = "flex";
                }
        },
    }
} 

