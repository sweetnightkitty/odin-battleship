import { ship } from "./gameLogic.js";

describe("Ship Factory Function", ()=> {
    it("Ship initializes with correct length", () => {
        expect(ship(3).length).toBe(3);
    })
})
