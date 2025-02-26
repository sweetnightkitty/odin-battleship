# Odin Battleship

## Replication of the game battleship

This project is a practice project that was built in accordance with the ODIN Project Battleship assignment to practice working with graphs and test driven development with Jest.

**Check out the Assignment guidelines for this project:**

https://www.theodinproject.com/lessons/node-path-javascript-battleship



## How to Play Battleship:

A brief synopsis if you're not familiar with the game battleship: 

The game battleship is a 2 player game, where each player has a total of 5 seperate ships of varying lengths that they must place anywhere on their gameboard. Players take turns calling out a location on their opponent's board, to launch an attack. Players announce 'hit' when their opponent's guess hits one of their ships, or "miss". Gameplay concludes when one player successfully sinks all of their opponent's ships.  

For a more in-depth understanding of how to play read: https://en.wikipedia.org/wiki/Battleship_(game) 



## A Note on Ships:

There are 5 different ships in the game battleship with specific names and lengths associated with them. For ease of understanding, all ships in this project are named based on their in-game names. 

Ship names are listed exactly as they are named (as variables) in the code.

You will likely want to refer to this information often:

|  **Ship Name**  | **Length** |
| --------------- | ---------- |
| aircraftCarrier |      5     |
| battleship      |      4     |
| cruiser         |      3     |
| submarine       |      3     |
| destroyer       |      2     |



## Getting Started

Before getting started make sure you have the latest version of npm installed.

I recommend downloading Node Version Manager (NVM) first and then downloading Node.

**For quick and easy instructions on how to download nvm and set up node:** https://www.theodinproject.com/lessons/foundations-installing-node-js

Next clone the repository
```
git clone git@github.com:sweetnightkitty/odin-battleship.git
```

and download the following dependencies:


### Webpack

Download Webpack locally with
```
npm install --save-dev webpack webpack-cli
```
and download the following:


**HTML Plugin**
```
npm install --save-dev html-webpack-plugin
```


**HTML Loader**
```
npm install --save-dev html-loader
```


**CSS-Loader**
```
npm install --save-dev style-loader css-loader

```
For a more detailed guide on installing and working with Webpack see : https://webpack.js.org/guides/installation/




### Jest & Babel (Optional)

One aim of this project was to practice implementing test-driven development when writing the game logic. Jest was the assigned testing framework for this project, and was utilized to write tests when developing the gameLogic.js module. 

If you wish to run, or write additional tests you will need to download Jest & Babel:

Install the latest version of Jest:

```
npm init jest@latest
``` 

Then install Babel with

```
npm install --save-dev babel-jest @babel/core @babel/preset-env
```

For a more detailed guide to downloading and working with Jest see: https://jestjs.io/docs/getting-started


### Fetch Branches

When working with this project you will need to work on the "rework-UI" branch.

In order to access this branch first fetch all branches:

```
git fetch --all
```

Then checkout to the rework-UI branch with

```
git checkout rework-UI
``` 


### Local Server

After sucessfully cloning the repo, and accessing the correct branch in order to launch the program locally you will need to run the webpack server using the command

```
npm run serve
```
and then the program will load at http://localhost:8080/ 



## Development Roadmap

At the moment, this game is in development. Please refer to the detailed list below of current development status and known issues before getting started.


### Placing ships on the board

At the moment, placing ships on the game board are done manually by clicking coordinates. So for example when placing the battleship, which has a length of 4, the user must click 4 buttons on the gameboard in chronological horizontal, or vertical order. 

When selecting buttons horizontally, they MUST BE from left to right and when selecting buttons vertically they MUST BE from top to bottom.

Selecting buttons right to left, or bottom to top will throw an error, as well as picking buttons that are not adjacent. 

This is obviously not very user-friendly and a temporary feature. It will later be replaced with a drag and drop style of placement, or another user-friendly alternative. 

Also, when a ship is placed, it is still possible to click on other ships, or to press submit. This essentially means there is no checks in place to ensure a ship is placed correctly before another ship is selected, and no checks in place to prevent the user from continuing on in the game without placing their ships. 

**Outstanding Tasks**
- [ ] Disable other ship buttons while the current ship is being placed.
- [ ] Prevent user from submitting ships until ALL ships are placed.
- [ ] Create modals that pop-up to explain to user how to interact with buttons.
- [ ] Change the method for placing ships to something user-friendly and intuititve. 


### Announcing Sunk Ships and Game Over

At the moment, there is no logic that announces to players when a ship has been sunk or that the game is over. As such, the gameplay will continue on indefinitely without end.  In the case of the 1-player version, this will lead to a "maximum call stack exceeded" error, as the computer player will eventually exhaust all possible coordinates to play. 

**Outstanding Tasks**
- [ ] Alert users when they sunk a single ship.
- [ ] Check when the game is over and notify users of the winner with a modal that provides the option to play again.


### Appearance & Design

**Outstanding Tasks**
- [ ] Add title row and column that contains letters for the x-axis and numbers for the y-axis. 
- [ ] Update formating for "It's a hit!" "It's a miss!" messaginging (div.notices);
- [ ] Modal screen that pops-up with a relevant explanation to replace all errors, or to appear when user clicks deactivated buttons.