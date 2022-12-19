//--constants--//
const colorOptions = ['Bone','Blood','Sludge','Slime']//options that player has for colors
const  devCards = ['knight','road-building','year-of-plenty','monopoly']; //array for names of developement cards
const numTileList = ['A','B','C','D','E','F','G','H','I','J','K','L','N','O','P','Q','R']; //made into object list later
//--variables--//
let playerNames = [];
const gameState ={
  roundCount: 0, //the count of how many rounds have been played
  turnCount: 0,// how many turns through round have been played
  leaderboard:[],// array of playerName strings sorted by VP, 
  deckOfPlayers:null,
  devCardDeck:null,
  activePlayer:null,
}


//--classes--//
class Player{
  constructor (playerName, playerNum,hand){
    this.hand = hand; //cards[#of card types(development, vp, resources)];
    this.playerName = playerName;
    this.playerNum =  playerNum;
    this.settlements=0; //-number of settlements players hold, 5 @ start
    this.cities=0; //-number of cities player holds,  4 added @ start
    this.roadsHeld=0; //-number of roads player holds, 15 added @ start
    this.victoryPoints=0; //-number of VP player has, 10 to win, 0 at start
    this.diceRoll={};
  }
  setDiceRoll(obj){
    this.diceRoll = obj;
  }
}
//creates and stores objects of classs Player in a object for functions of the game to iterate through.
class PlayerDeck {
  constructor(numPlayers){
    this.numPlayers = numPlayers;
    this.roster = colorOptions;
  }
  populateRoster(){
    this.roster = this.roster.map(function(player, idx){
        let newPlayer = new Player(player, idx, []);
        newPlayer.settlements = 5;
        newPlayer.cities = 4;
        newPlayer.roadsHeld = 15;
        return newPlayer;
    })  
  }
  getRoster(){
    return this.roster;
  }
}

//general card class to create a deck holding every kind of card
class Cards{
  constructor(cardType){
    this.cardType = cardType;
  }
  
  buildDeck(){

  }
}
class ResourceCards extends Cards{
  constructor(){
    this.resourceTypes = ['wood','ore','grain','sheep','brick'];
    this.resource = '';
    this.quantity = 95; //19 for each type of resource
  }
}
class DevelopmentCards extends Cards{
    constructor (){
      this.grantsVP = false;
    }
}
class KnightCard extends DevelopmentCards{
    constructor(){
      this.cardType = 'knight';
      this.quantity = 14;
    }
}
class Monopoly extends DevelopmentCards{
    constructor(){
      this.cardType = 'monopoly';
      this.quantity = 2;
    }
}
class YearOfPlenty extends DevelopmentCards{
  constructor(){
    this.cardType = 'year-of-plenty';
    this.quantity = 2;
  }
}
class RoadBuilding extends DevelopmentCards{
  constructor(){
    this.cardType = 'road-building';
    this.quantity = 2;
  }
}
class VpCards extends DevelopmentCards{
  constructor(vpCardType){
      this.vpCardType = vpCardType;
      this.grantsVP = true;
      //array for names of development cards that grant 1 Victory Point
      this.vpCardNames =['great hall','library','market','chapel','university'];
  }
}
class SpecialCards extends Cards{
  constructor(){
    //longest road or biggest army
  }
}
class Board{
  constructor(){

  }
}

class BoardTile{
  constructor(tileType){
    this.tileType = tileType;
    this.resourceNames = ['wood','ore','grain','sheep','brick'];
    this.tileNames = ['forest','mountain','fields', 'pasture','hill'];
    
  }
}

function makeChips(){
      let arr = numTileList.map(function(letter){
        if(letter ==='B'){return {letter: letter, number:2, dots:'.',};
        }else if (letter === 'D' || letter === 'Q'){
          return {letter: letter, number: 3, dots:'..',}
        }else if (letter === 'A' || letter === 'O'){
          return {letter: letter, number: 5, dots:'...',};
        }else if (letter === 'C' || letter === 'P'){
            return {letter: letter, number: 6, dots:'....',};
        }else if (letter === 'E' || letter === 'K'){
          return {letter: letter, number: 8, dots:'.....',};
        }else if (letter === 'G' || letter === 'M'){
          return {letter: letter, number: 9, dots:'....',};
        }else if (letter === 'F' || letter === 'L'){
            return {letter: letter, number: 10, dots:'...',};
        }else if (letter === 'I' || letter === 'R'){
          return {letter: letter, number: 11, dots:'..',};
      }else if (letter === 'H'){
        return {letter: letter, number: 12, dots:'.',};
      }
      });
      return arr;
}  

//--cached element references--//

//--event listeners--//

//--functions--//
//initialization functions
function init(){
  gameState.deckOfPlayers = new PlayerDeck(4);
  gameState.deckOfPlayers.populateRoster();

}
//render functions
function render(){
  renderBoard();
}

function renderBoard(){
//display current state of gameBoard
}

function renderTurnCard(){
//render the acive player's options for their turn
}

function buildPlayerCards(){
//
}
//game state functions
function startGame(){
  rollForTurns()
}

function changeTurn(){
  //
  //if it is last player in deck's turn, changeRound
  //set activePlayer to nextPlayer in deck
}

function changeRound(){
// add to round count,
}
//game play functions
function rollForTurns(){
for (plyr in gameState.deckOfPlayers){
  object.setDiceRoll(rollDice());
} 
}

function rollDice(){
  const dieOne = Math.floor(Math.random()*7);
  const dieTwo = Math.floor(Math.random()*7);
  return {one:dieOne, two:dieTwo, total:(dieOne+dieTwo)};
}

function firstAndSecondRoundTurn(player){
//place one settlement and two roads
}

function takeTurn(player){
//roll dice, corresponding resources given to all players
//  if seven move robber, rob peer
//until player clicks end turn or completes all possible moves, gameplay options will be displayed
}

function placeRoad(){
  //check player resources
  //find desired placement
  //
}

function placeSettlement(){
  //check player resources
  //display message for insuffficieint resources
  //allow placement on unoccupied, spaced out vertice
}

function placeCity(){
  //check player resources
  //display message for insuffficieint resources
  //if sufficient resources find desired placement
  //allow placement on vertice occupied by player's own settlement
  //remove settlement
  //place city
}

function offerTrade(){
  // check player resources
  // place message for trade offer in each players id card
  // if player clicks offer with viable input into field, message displays id card of player offering trade
  // multiple trade offers may be made, only one accepted
  // trade pop up has decline button
}

function tradeByPort(){
  //check player resources, find the resources type of the port, exchange resources
}

function robberRolled(){
moveRobber();
robPeer();
}

function moveRobber(){
//place robber in chosen tile
//set tiles number tile value to 0 temporarily
}

function robPeer(){
// allow player to take two random cards from chosen players deck
}