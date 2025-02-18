import { player, ship } from "./gameLogic";

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
        displayBoard(displayBoard = activePlayer.display) {
            const opponentBoard = activePlayer.opponent.getBoard();
            const name = activePlayer.name;

            for(let i = 0; i < opponentBoard.length; i++) {
                for(let j = 0; j < opponentBoard[i].length; j++) {
                    const button = document.createElement("button");
                    button.classList.add(`player-${name}-buttons`, `${i}${j}`);
                    applyColor(i, j, button);
                    displayBoard.appendChild(button);
                }
            }

            this.addEventListeners();

        },

        displayShips(displayBoard = activePlayer.shipDisplay) {
            const playerBoard = activePlayer.activePlayer.getBoard()
            const name = activePlayer.name;

            for(let i = 0; i < playerBoard.length; i++) {
                for(let j = 0; j < playerBoard[i].length; j++) {
                    const button = document.createElement("button");
                    button.classList.add(`player-${name}-ship-buttons`, `${i}${j}`);
                    //Need to create color for the ships / hits
                    displayBoard.appendChild(button);
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

        placeship(event) {
            const ship = event.target;
            const shipname = event.target.classList[0];
            ship.classList.add("current");
            const playerOneShipButtons = document.querySelectorAll(".player-one-ship-buttons");
            const playerTwoShipButtons = document.querySelectorAll(".player-two-buttons");
            
            let limit = 0;
            const coordinates = [];

            //Limit determines how many coordinates are needed
            if(shipname == "aircraftCarrier") {limit = 5};
            if(shipname == "battleship") {limit = 4};
            if(shipname == "submarine" || shipname == "cruiser") {limit = 3};
            if(shipname == "destroyer") {limit = 2};

            const handleShipPlacement = (event) => {
                const [x, y] = event.target.classList[1];
                coordinates.push([x, y]);

                event.target.classList.add("selected");

                //When all coordinates are collected disables buttons and passes to placeship:
                if(coordinates.length == limit) {
                    activePlayer.activePlayer.placeship(shipname, coordinates);
                    playerOneShipButtons.forEach(button => {
                        button.removeEventListener("click", handleShipPlacement);
                        button.classList.remove("hover-effect");
                    });
                    ship.classList.remove("current");
                    ship.classList.add("complete");
                };

            }

            if(activePlayer.name == "one") {
                playerOneShipButtons.forEach(button => {
                    //Adds hover effects only after buttons are active
                    button.classList.add("hover-effect");
                    button.addEventListener("click", handleShipPlacement);
                })
            } else if(activePlayer.name == "two") {
                playerTwoShipButtons.forEach(button => {
                    //Adds hover effects only after buttons are active
                    button.classList.add("hover-effect");
                    button.addEventListener("click", handleShipPlacement);
                })
            }
        },

        addEventListeners() {
            //Buttons must be defined AFTER EVERY time they are generated in dom
            const playerOneButtons = document.querySelectorAll(".player-one-buttons");
            const playerTwoButtons = document.querySelectorAll(".player-two-buttons");

            //Then event listeners can be added on
            playerOneButtons.forEach(button => button.addEventListener("click", this.playRound));
            playerTwoButtons.forEach(button => button.addEventListener("click", this.playRound));
        },

    }
}

export const controller = screenController();

