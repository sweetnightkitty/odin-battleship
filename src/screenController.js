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

    //PLACES SHIP ON BOARD UI 
    const placeShipUI = (shipname, targetButton) => {
        const name = activePlayer.name;
        const boardSize = 10;
        
        // Define ship lengths
        const shipLengths = {
            aircraftCarrier: 5,
            battleship: 4,
            cruiser: 3,
            submarine: 3,
            destroyer: 2
        };
        
        const shipLength = shipLengths[shipname];
        if (!shipLength) return; // Early exit if invalid ship name
    
        // Find target button's grid position
        const [x, y] = targetButton.classList[1].split('').map(Number);
    
        // Validate placement (avoid overflow)
        if (y > boardSize - shipLength) {
            alert("Invalid placement! The ship would overflow the board.");
            return;
        }
    
        const ship = document.querySelector(`.${shipname}`);
        const board = document.querySelector(`.player-${name}-board`);
    
        // Set board position for absolute positioning
        board.style.position = "relative";
    
        // Get button and board positions
        const buttonRect = targetButton.getBoundingClientRect();
        const boardRect = board.getBoundingClientRect();
    
        // Calculate position of ship relative to the board
        ship.style.position = "absolute";
        ship.style.left = `${buttonRect.left - boardRect.left}px`;
        ship.style.top = `${buttonRect.top - boardRect.top}px`;
        ship.style.width = `${buttonRect.width * shipLength}px`;
        ship.style.height = `${buttonRect.height}px`; // Set height for consistency
    
        ship.classList.add("after-placement");

        // Now, store the coordinates of the ship on the board
        const occupiedCoordinates = [];

        // Add ship coordinates horizontally
        for (let i = 0; i < shipLength; i++) {
            const buttonId = `${x}${y + i}`;
            const [newX, newY] = buttonId;
            occupiedCoordinates.push([newX, newY]); //Format needed for placeship function coordinates parameter
        }

        const shipsBoard = activePlayer.activePlayer.getBoard();

        //Resets the placement of the ship
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 10; j++) {
                if(shipsBoard[i][j] == shipname) {shipsBoard[i][j] = false};
            }
        }

        //Then run placeship
        activePlayer.activePlayer.placeship(shipname, occupiedCoordinates);
        };
    
    //DRAG DROP FUNCT 
    const dragDropShip = (event) =>{
        event.preventDefault();
        const shipname = event.dataTransfer.getData("ship");

        placeShipUI(shipname, event.target);
    };

    const buttonDropHandler = (event) =>{
        event.preventDefault();
        console.log("Grid drop fires");
    }
    
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

                    //Allows drag and drop
                    button.addEventListener("dragover", (event)=>{
                        event.preventDefault();
                        console.log("Grid Button drag fires")
                    })
                    button.addEventListener("drop", buttonDropHandler);

                    // //Marks ships that are selected
                    if(playerBoard[i][j]) {button.classList.add("selected")};

                    // //Need to mark the hits only
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

        computerTurn() {
            const [x, y] = generateRandomCoordinates();
            activePlayer.opponent.recieveAttack([x, y]);

        },

        executePassDoneToggle(action, players) {
            TogglePassDoneBtns(action, players);
        },

        dragStart(event) {
            const shipname = event.target.classList[0];
            event.dataTransfer.setData("ship", shipname);
            console.log(shipname);

            setTimeout(() => {
                event.target.style.display = "none"; // Hide the original during drag
            }, 0);
        },

        dragEnd(event) {
            event.target.style.display = "block"; // Show it again after drop
        },

}};

export const controller = screenController();



