# Odin Battleship

## Replication of the game battleship

This project is a practice project that was built in accordance with the ODIN Project Battleship assignment to practice working with graphs and test driven development with Jest.

Check out the Assignment guidelines for this project:

https://www.theodinproject.com/lessons/node-path-javascript-battleship

## How to Play Battleship:

A brief synopsis if you're not familiar with the game battleship: 

The game battleship is a 2 player game, where each player has a total of 5 seperate ships of varying lengths that they must place anywhere on their gameboard. Players take turns calling out a location on their opponent's board, to launch an attack. Players announce 'hit' when their opponent's guess hits one of their ships, or "miss". Gameplay concludes when one player successfully sinks all of their opponent's ships.  

For a more in-depth understanding of how to play read: https://en.wikipedia.org/wiki/Battleship_(game) 

## A Note on Ships:

There are 5 different ships in the game battleship with specific names and lengths associated with them. For ease of understanding, all ships in this project are given a class name based on their in-game names. 

You will likely want to refer to this information often:

- Aircraft Carrier          length: 5
- Battleship                length: 4
- Crusier                   length: 3
- Submarine                 length: 3
- Destroyer                 length: 2

You may need to refere

## Getting Started

Ensure you have Node.js installed before getting started. You can download it from https://nodejs.org/en

Clone the repository and download the following dependencies:

### Webpack

Download Webpack locally with
```
npm install --save-dev webpack webpack-cli
```
and download the following:

HTML Plugin
```
npm install --save-dev html-webpack-plugin
```

HTML Loader
```
npm install --save-dev html-loader
```

CSS-Loader
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
