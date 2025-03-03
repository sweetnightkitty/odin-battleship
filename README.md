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


### Local Server

After sucessfully cloning the repo, and accessing the correct branch in order to launch the program locally you will need to run the webpack server using the command

```
npm run serve
```
and then the program will load at http://localhost:8080/ 



## Development Roadmap

At the moment, this game is in development. Please refer to the detailed list below of current development status and known issues before getting started.


### Placing ships on the board

At the moment, placing ships on the board are done by dragging and dropping the ships onto the gameboard. So for ships can only be dragged and dropped into a horizontal position.

Also, currently there is no logic for the computer player to place their own ships.

**The following tasks are being addressed on the dragDropFeature branch and are in development**
- [ ] Create logic that places ships on the board at random for a computer player.
- [ ] Allow rotating of ships when drag and dropping.


### Announcing Sunk Ships and Game Over

At the moment, there is no logic that announces to players when a ship has been sunk or that the game is over. As such, the gameplay will continue on indefinitely without end.  In the case of the 1-player version, this will lead to a "maximum call stack exceeded" error, as the computer player will eventually exhaust all possible coordinates to play. 

**Outstanding Tasks**
- [X] Alert users when they sunk a single ship.
- [X] Check when the game is over and notify users

### Appearance & Design

**Outstanding Tasks** 
- [ ] Update styling for "It's a hit!" "It's a miss!" messaginging (div.notices);
- [ ] Modal screen that pops-up for any alerts/error messages or to explain instructions.
- [ ] In 1 player game mode user journey is not clear.