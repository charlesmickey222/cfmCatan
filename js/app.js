//--constants--//
//options that player has for colors
const colorOptions = ['Bone','Blood','']
  //array for names of developement cards
const  devCards = ['knight','road-building','year-of-plenty','monopoly'];
//--variables--//
const gameState ={
  roundCount: 0, //the count of how many rounds have been played
  turnCount: 0,// how many turns through round have been played
  leaderboard:[]// array of playerName strings sorted by VP, 
                // not visible to players
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
    //this.placedDevCards: cards[];  -face up development cards already played
    //this.charName:string; -holds player name
    //this.charColor:string; -holds player color
  }
}
//creates and stores objects of classs Player in a object for functions of the game to iterate through.
class PlayerDeck {
  constructor(numPlayers){
    this.numPlayers = numPlayers;
    this.roster = ['player1','player2','player3','player4'];
  }
  populateRoster(){
    this.roster = this.roster.map(function(player, idx){
        let newPlayer = new Player([/*emptyHand*/],player, idx);
        newPlayer.settlements = 5;
        newPlayer.cities = 4;
        newPlayer.roadsHeld = 15;
        return newPlayer;
    })  
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
const numTileList = ['A','B','C','D','E','F','G','H','I','J','K','L','N','O','P','Q','R'];
class BoardTile{
  constructor(tileType){
    this.tileType = tileType;
    this.resourceNames = ['wood','ore','grain','sheep','brick'];
    this.tileNames = ['forest','mountain','fields', 'pasture','hill'];
    
  }
}
class numberChips extends BoardTile{
    constructor(){
       // this.num = num;
        //this.letter = letter;
        //this.dots = '';
    }
    makeChips(){
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
}
//--cached element references--//

//--event listeners--//

//--functions--//

//initialization functions

//render functions

//game state functions

//game play functions