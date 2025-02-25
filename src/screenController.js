import { player, ship } from "./gameLogic";
import { toggler } from "./screenToggler";

const screenController = () => {
    const playerOne = player();
    const playerTwo = player();

    const playerOneDisplay = document.querySelector(".player-one-board");
    const playerTwoDisplay = document.querySelector(".player-two-board");
    const playerOneShipDisplay = document.querySelector(".player-one-ships");
    const playerTwoShipDisplay = document.querySelector(".player-two-ships");
    const playerOneShipPlacement = document.querySelector(".placement-boards-player-one");
    const playerTwoShipPlacement = document.querySelector(".placement-boards-player-two");

    const playerOneNotice = document.querySelector(".player-one-notice");
    const playerTwoNotice = document.querySelector(".player-two-notice");

    const players = [
        {
            activePlayer: playerOne,
            opponent: playerTwo,
            name: "one",
            display: playerOneDisplay, // Displays players attacks
            shipDisplay: playerOneShipDisplay, //Displays the locations of their ships
            notice: playerOneNotice,
            shipPlacement: playerOneShipPlacement,
        },

        {
            activePlayer: playerTwo,
            opponent: playerOne,
            name: "two", //computer playing
            display: playerTwoDisplay, // computer playing
            shipDisplay: playerTwoShipDisplay,
            notice: playerTwoNotice,
            shipPlacement: playerTwoShipPlacement,
        }
    ]

    let activePlayer = players[0]


    const applyColor = (x, y, button, board = activePlayer.opponent.getBoard()) => {

        //HANDLES COLOR FOR DISPLAY SHIPS
        if(board == "ships") {
            board = activePlayer.activePlayer.getBoard();

            if(board[x][y] == "hit") {
                button.classList.remove("selected");
                button.classList.add("hit");
            } else if(board[x][y] == "miss") {
                //Don't want to display all the misses
                button.classList.remove("selected");
            }
        }

        //HANDLES COLOR FOR DISPLAY BOARD - uses board default
        else {
            if(board[x][y] == "hit") {
                button.classList.add("hit");
                disableCoordinate(button);
    
            } else if(board[x][y] == "miss") {
                button.classList.add("miss");
                disableCoordinate(button);
            }
        }
    }

    const getNotice = (x, y) => {
        const opponentBoard = activePlayer.opponent.getBoard();
        if(opponentBoard[x][y] == "hit") return "It's a hit!";
        if(opponentBoard[x][y] == "miss") return "It's a miss!";
    }

    const getAlert = ()=> { alert("Take a turn first!")};

    const TogglePassDoneBtns = (action, players)=>{
        const endPlayerOneRound = document.querySelector(".end-player-one");
        const endPlayerTwoRound = document.querySelector(".end-player-two");

        //When action = "enable" this is the only way to determine whether it's a one/two player game
        if(endPlayerOneRound.textContent == "Done") {players = "one"};
        if(endPlayerOneRound.textContent == "Pass") {players = "two"};

        //ONE PLAYER GAME TOGGLES:
        if((action == "enable") && (players == "one")) {
            endPlayerOneRound.removeEventListener("click", getAlert);
            endPlayerOneRound.addEventListener("click", toggler.goToPlayerOneNextRound);
        }
        if((action == "disable") && (players == "one")) {
            endPlayerOneRound.removeEventListener("click", toggler.goToPlayerOneNextRound);
            endPlayerOneRound.addEventListener("click", getAlert);
        }

        //TWO PLAYER GAME TOGGLES
        //Player One Toggles:
        if((action == "enable") && (players == "two") && (activePlayer.name == "one")) {
            endPlayerOneRound.removeEventListener("click", getAlert);
            endPlayerOneRound.addEventListener("click", toggler.goToStartScreen);
        }
        if((action == "disable") && (players == "two") && (activePlayer.name == "one")) {
            endPlayerOneRound.removeEventListener("click", toggler.goToStartScreen);
            endPlayerOneRound.addEventListener("click", getAlert);
        }

        //Player Two Toggles:
        if((action == "enable") && (players == "two") && (activePlayer.name == "two")) {
            endPlayerTwoRound.removeEventListener("click", getAlert);
            endPlayerTwoRound.addEventListener("click", toggler.goToStartScreen);
        }
        if((action == "disable") && (players == "two") && (activePlayer.name == "two")) {
            endPlayerTwoRound.removeEventListener("click", toggler.goToStartScreen);
            endPlayerTwoRound.addEventListener("click", getAlert);
        }

    }

    const userSelectsAttack = (event) => {
        const [x, y] = event.target.classList[1];

        disableAllCoordinateBtns();
        activePlayer.opponent.recieveAttack([x, y]);

        const notice = getNotice(x, y); //Need to put this somewhere in dom
        activePlayer.notice.textContent = notice;

        //Btn color immediately changes to reflect hit/miss
        applyColor(x, y, event.target);

        TogglePassDoneBtns("enable");
    }

    const disableAllCoordinateBtns = () => {
        if(activePlayer.name == "one") {
            const playerOneBtns = document.querySelectorAll(".player-one-buttons");
            playerOneBtns.forEach(button => {
                disableCoordinate(button);
            })
        }
        if(activePlayer.name == "two") {
            const playerTwoBtns = document.querySelectorAll(".player-two-buttons");
            playerTwoBtns.forEach(button => {
                disableCoordinate(button);
            })
        }
    }

    const disableCoordinate = (button) => {
        button.removeEventListener("click", userSelectsAttack);
        button.classList.remove("hover");
    };

    const generateRandomCoordinates = () => {
        const x = Math.floor(Math.random() * (10));
        const y = Math.floor(Math.random() * (10));

        //Recalculates random coordinate if it was already used
        if((activePlayer.opponent.getBoard()[x][y]) == "hit" || (activePlayer.opponent.getBoard()[x][y]) == "miss") {
            return generateRandomCoordinates();
        } else {
            return [x, y];
        }
    };

    return {
        displayBoard(displayBoard = activePlayer.display) {
            const opponentBoard = activePlayer.opponent.getBoard();
            const name = activePlayer.name;

            for(let i = 0; i < opponentBoard.length; i++) {
                for(let j = 0; j < opponentBoard[i].length; j++) {
                    const button = document.createElement("button");
                    button.classList.add(`player-${name}-buttons`, `${i}${j}`, `hover`);
                    button.addEventListener("click", userSelectsAttack);
                    applyColor(i, j, button);
                    displayBoard.appendChild(button);
                }
            }

            TogglePassDoneBtns("disable");

        },

        displayShips(displayBoard = activePlayer.shipPlacement) {
            const playerBoard = activePlayer.activePlayer.getBoard()
            const name = activePlayer.name;

            for(let i = 0; i < playerBoard.length; i++) {
                for(let j = 0; j < playerBoard[i].length; j++) {
                    const button = document.createElement("button");
                    button.classList.add(`player-${name}-ship-buttons`, `${i}${j}`);
                    
                    //Marks ships that are selected
                    if(playerBoard[i][j]) {button.classList.add("selected")};

                    //Need to mark the hits only
                    applyColor(i, j, button, "ships");

                    displayBoard.appendChild(button);
                }
            }
        },

        reset(boardType) {
            if(boardType == "board") {activePlayer.display.innerHTML = ""};
            if(boardType == "ships") {
                activePlayer.shipDisplay.innerHTML = "";
                activePlayer.shipPlacement.innerHTML = "";
            };
        },

        switchPlayers() {
            activePlayer = activePlayer === players[0] ? players[1] : players[0];
        },

        generateShipButtons(displayDiv) {
            const aircraftCarrier = document.createElement("button");
            const battleship = document.createElement("button");
            const cruiser = document.createElement("button");
            const submarine = document.createElement("button");
            const destroyer = document.createElement("button");

            aircraftCarrier.textContent = "Aircraft Carrier";
            battleship.textContent = "Battleship";
            cruiser.textContent = "Cruiser";
            submarine.textContent = "Submarine";
            destroyer.textContent = "Destroyer";
            
            aircraftCarrier.classList.add("aircraftCarrier");
            battleship.classList.add("battleship");
            cruiser.classList.add("cruiser");
            submarine.classList.add("submarine");
            destroyer.classList.add("destroyer");

            displayDiv.appendChild(aircraftCarrier);
            displayDiv.appendChild(battleship);
            displayDiv.appendChild(cruiser);
            displayDiv.appendChild(submarine);
            displayDiv.appendChild(destroyer);

           //Add event listeners here
           aircraftCarrier.addEventListener("click", this.userPlacesShip);
           battleship.addEventListener("click", this.userPlacesShip);
           cruiser.addEventListener("click", this.userPlacesShip);
           submarine.addEventListener("click", this.userPlacesShip);
           destroyer.addEventListener("click", this.userPlacesShip);

        },

        userPlacesShip(event) {
            const ship = event.target;
            const shipname = event.target.classList[0];
            ship.classList.add("current");
            const playerOneShipButtons = document.querySelectorAll(".player-one-ship-buttons");
            const playerTwoShipButtons = document.querySelectorAll(".player-two-ship-buttons");
            
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

                    if(activePlayer.name == "one") {
                        playerOneShipButtons.forEach(button => {
                            button.removeEventListener("click", handleShipPlacement);
                            button.classList.remove("hover-effect");
                        });
                    } else if(activePlayer.name = "two") {
                        playerTwoShipButtons.forEach(button => {
                            button.removeEventListener("click", handleShipPlacement);
                            button.classList.remove("hover-effect");
                        })
                    }
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

        computerTurn() {
            const [x, y] = generateRandomCoordinates();
            activePlayer.opponent.recieveAttack([x, y]);

            // //Checks if game is over
            // if(activePlayer.opponent.isGameOver()) {
            //     alert("Game Over!");
            // }

        },

        executePassDoneToggle(action, players) {
            TogglePassDoneBtns(action, players);
        },

}};

export const controller = screenController();
