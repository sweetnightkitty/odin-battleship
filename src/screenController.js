import { player, ship } from "./gameLogic";

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


    const applyColor = (x, y, button) => {
        const opponentBoard = activePlayer.opponent.getBoard();
        if(opponentBoard[x][y] == "hit") {
            button.classList.add("hit");

            // prevents reselecting a used btn -> create a second fn to prevent btn activation?
            // needs to disable hover
            button.removeEventListener("click", userSelectsAttack); 

        } else if(opponentBoard[x][y] == "miss") {
            button.classList.add("miss");
            button.removeEventListener("click", userSelectsAttack); // prevents selecting a used btn
        }
    }

    const getNotice = (x, y) => {
        const opponentBoard = activePlayer.opponent.getBoard();
        if(opponentBoard[x][y] == "hit") return "It's a hit!";
        if(opponentBoard[x][y] == "miss") return "It's a miss!";
    }

    const userSelectsAttack = (event) => {
        const [x, y] = event.target.classList[1];

        console.log(activePlayer.name);
        //Disables btns so no more than one move can be made
        if(activePlayer.name = "one") {
            const playerOneBtns = document.querySelectorAll(".player-one-buttons");
            playerOneBtns.forEach(button => {
                button.removeEventListener("click", userSelectsAttack);
            })
        } if(activePlayer.name = "two") {
            const playerTwoBtns = document.querySelectorAll(".player-two-buttons");
            playerTwoBtns.forEach(button => {
                button.removeEventListener("click", userSelectsAttack);
            });
        }

        //Sends the attack to opponent
        activePlayer.opponent.recieveAttack([x, y]);

        const notice = getNotice(x, y); //Need to put this somewhere in dom

        //Btn color immediately changes to reflect hit/miss
        applyColor(x, y, event.target);
    }

    return {
        displayBoard(displayBoard = activePlayer.display) {
            const opponentBoard = activePlayer.opponent.getBoard();
            const name = activePlayer.name;

            for(let i = 0; i < opponentBoard.length; i++) {
                for(let j = 0; j < opponentBoard[i].length; j++) {
                    const button = document.createElement("button");
                    button.classList.add(`player-${name}-buttons`, `${i}${j}`);
                    button.addEventListener("click", userSelectsAttack);
                    applyColor(i, j, button);
                    displayBoard.appendChild(button);
                }
            }

        },

        displayShips(displayBoard = activePlayer.shipPlacement) {
            const playerBoard = activePlayer.activePlayer.getBoard()
            const name = activePlayer.name;

            for(let i = 0; i < playerBoard.length; i++) {
                for(let j = 0; j < playerBoard[i].length; j++) {
                    const button = document.createElement("button");
                    button.classList.add(`player-${name}-ship-buttons`, `${i}${j}`);
                    //Need to create color for the ships / hits
                    if(playerBoard[i][j]) {button.classList.add("selected")}; // mark ships
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

}};

export const controller = screenController();
