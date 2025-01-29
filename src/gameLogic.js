export const ship = (length) => {
    let hits = 0;

    return {
        length,
        hits () {
            //Length is the max # of hits, so hits should not exceed it.
            if(hits < length){
                ++hits;
            }
        },
        getHits() {
            return hits;
        },
        isSunk() {
            return hits == length;
        }
    }
}

export const gameBoard = () => {
    const board = Array.from({length: 10}, ()=> Array(10).fill(false));

    return {
        getBoard() {
            return board;
        },
        recieveAttack(coordinate) {
            const [x, y] = coordinate;

            if(!board[x][y]) {
                board[x][y] = "miss";
            } else if(board[x][y] == "miss") {
                throw new Error("You already tried that spot, choose another.");
            }
        }
    }
}