import { player, ship } from "./gameLogic";

const screenController = () => {
    const playerOne = player();
    const playerTwo = player();

    const playerOneDisplay = document.querySelector(".player-one-board");
    const playerTwoDisplay = document.querySelector(".player-two-board");
    const playerOneShipDisplay = document.querySelector(".player-one-ships");
    const playerTwoShipDisplay = document.querySelector(".player-two-ships");

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
        },

        {
            activePlayer: playerTwo,
            opponent: playerOne,
            name: "two", //computer playing
            display: playerTwoDisplay, // computer playing
            shipDisplay: playerTwoShipDisplay,
            notice: playerTwoNotice,
        }
    ]

    let activePlayer = players[0]


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

        }
    }
}

export const controller = screenController();

