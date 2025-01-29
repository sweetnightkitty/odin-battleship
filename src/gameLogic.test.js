import { ship } from "./gameLogic.js";

describe("Ship Factory Function", ()=> {
    it("Ship initializes with correct length", () => {
        let myShip = ship(3);
        expect(myShip.length).toBe(3);
        myShip = ship(5);
        expect(myShip.length).toBe(5);
    })

    it("Ship tracks hits correctly", ()=> {
        const myShip = ship(3);
        expect(myShip.getHits()).toBe(0);
        myShip.hits();
        expect(myShip.getHits()).toBe(1);
        myShip.hits();
        myShip.hits();
        expect(myShip.getHits()).toBe(3);
    })

    it("Hits do not exceed ship length", ()=> {
        const myShip = ship(3);
        myShip.hits();
        myShip.hits();
        myShip.hits();
        myShip.hits();
        expect(myShip.getHits()).toBe(3);
    })

    it("Ship sinks when hits = length", ()=> {
        const myShip = ship(3);
        expect(myShip.isSunk()).toBe(false);
        myShip.hits();
        myShip.hits();
        expect(myShip.isSunk()).toBe(false);
        myShip.hits();
        expect(myShip.isSunk()).toBe(true);
        myShip.hits();
        expect(myShip.isSunk()).toBe(true);
    })
})
