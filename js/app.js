
/*  ASCII BOARD
>           __
>         / 1  \
> __      \ __ /      __
/ 2  \ __ /  3 \ __ /  4 \
\ __ / 5  \ __ / 6  \ __ /
>    \ __ / 7  \ __ /
> __ / 8  \ __ / 9  \ __
/ 10 \ __ / 11 \ __ / 12 \
\ __ /    \ __ /    \ __ /
>         / 13 \
>         \ __ /
>
>           __
>         / A4 \
> __      \ __ /      __
/ F4 \ __ / G5 \ __ / B2 \
\ __ / L5 \ __ / H5 \ __ /
>    \ __ / TD \ __ /
> __ / K3 \ __ / I4 \ __
/ E6 \ __ / J6 \ __ / C5 \
\ __ /    \ __ /    \ __ /
>         / D3 \
>         \ __ /
>
*/
//--variables--//
let playerNames = [];
const gameState ={
  roundCount: 0, //the count of how many rounds have been played
  turnCount: 1,// how many turns through round have been played
  playing:false,
  leaderboard:[],// array of playerName strings sorted by VP, 
  deckOfPlayers:null,
  cardDeck:{resources:[],
  development:[],
  other:[],},
  currentRoll:null,
}

//--constants--//
const colorOptions = ['Bone','Blood']//options that player has for colors
const devCards = ['knight','road-building','year-of-plenty','monopoly']; //array for names of developement cards
const resourceNames = ['wood','ore','grain','sheep','brick'];
const numTileList = ['A','F','G','B','L','H','DOME','k','I','E','J','C','D']; //made into object list later
//const longestRoadReq = 5; iced
//const largestArmyReq = 3; iced
const roadNames =    ['r1', 
                  'r2',  'r3',
    'r4',        'r5','r6','r7',           'r8',
'r9',  'r10','r11','r12','r13','r14','r15',   'r16',
'r17','r18','r19','r20','r21','r22','r23','r24','r25',
      'r26','r27','r28','r29','r30','r31',
'r32','r33','r34','r35','r36','r37','r38',
    'r39' ,'r40','r41','r42','r43','r44','r45', 'r46',
'r47', 'r48','r49','r50','r51','r52','r53','r54', 'r55',
                   'r56','r57',
                'r58','r59','r60'];
const vrtxNames = ['v1','v2',  
                'v3',    'v4', 
  'v5', 'v6',    'v7',  'v8',     'v9', 'v10',
'v11',   'v12','v13',    'v14', 'v15',      'v16',
 'v17', 'v18',   'v19', 'v20',    'v21', 'v22',
         'v23','v24',    'v25', 'v26',
  'v27','v28',   'v29',  'v30',  'v31', 'v32',    
'v33',   'v34', 'v35',    'v36','v37',   'v38',
  'v39','v40',   'v41', 'v42',   'v43', 'v44',
                'v45',    'v46',
                  'v47','v48',];

const boardList =['t1',
          't2',   't3',    't4', 
              't5',   't6',    
                  't7', 
              't8',    't9', 
          't10',  't11',   't12',
                  't13'];
const tileVertexList = [
  ['v1','v2','v3','v4','v7','v8'],
  ['v5','v6','v11','v12','v17','v18'],
  ['v7','v8','v13','v14','v19','v20'],
  ['v9','v10','v15','v16','v21','v22'],
  ['v12','v13','v18','v19','v23','v24'],
  ['v14','v15','v20','v21','v25','v26'],
  ['v19','v20','v24','v25','v29','v30',],
  ['v23','v24','v28','v29','v34','v35'],
  ['v25','v26','v30','v31','v36','v37'],
  ['v27','v28','v33','v34','v39','v40'],
  ['v29','v30','v35','v36','v41','v42'],
  ['v31','v32','v37','v38','v43','v44'],
  ['v41','v42','v45','v46','v47','v48']
]
//--classes--//
class Player{
  constructor (playerName, playerNum,hand){
    this.hand = hand; //cards[#of card types(development, vp, resources)];
    this.playerName = playerName;
    this.playerNum =  playerNum;
    this.settlements=0; //-number of settlements players hold, 5 @ start
    this.cities=0; //-number of cities player holds,  4 added @ start
    this.roadsHeld=0; //-number of roads player holds, 15 added @ start
    this.victoryPoints=0; //-number of VP player has, 7 to win, 0 at start
    this.dieRoll=0;
    this.resourcesHeld ={
      wood:0,
      ore:0,
      sheep:0,
      brick:0,
      grain:0
    }
  }
  setdieRoll(obj){
    this.dieRoll = obj;
  }
  setPlayerNum(num){
    this.playerNum = num;
  }
  canAffordRoad(){
    return (this.resourcesHeld[wood] >= 1 && this.resourcesHeld[brick] >= 1);
  }
  canAffordSettlement(){
    return (this.resourcesHeld[wood] >= 1 && this.resourcesHeld[brick] >= 1);
  }
  canAffordCity(){
    return (this.resourcesHeld[wood] >= 1 && this.resourcesHeld[brick] >= 1);
  }
  canAffordCard(){
    return (this.resourcesHeld[wood] >= 1 && this.resourcesHeld[brick] >= 1);
  }
  rollDice(){
    const die = Math.floor(Math.random()*6) +1;
    this.dieRoll = die;
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
        let newPlayer = new Player(player, idx, [/*vp&devCards*/]);
        newPlayer.settlements = 5;
        newPlayer.cities = 4;
        newPlayer.roadsHeld = 15;
        return newPlayer;
    })  
  }
  getRoster(){
    return this.roster;
  }
  sortByRoll(){
    this.roster.sort((a,b) =>{
      return b.dieRoll - a.dieRoll;
    })
    this.roster[0].setPlayerNum[1];
    this.roster[1].setPlayerNum[-1];
  }
  }

//general card class to create a deck holding every kind of card
class Cards{
  constructor(grantsVP, cardType){
    this.grantsVp = grantsVP;
    this.cardType = cardType;
  }
}
class VpCards extends Cards{
  constructor(){
      super(true, 'victoryPoint');
      //array for names of development cards that grant 1 Victory Point
      this.deck =['great hall','library','market','chapel','university'];
  }
}
class ResourceCards extends Cards{
  constructor(){
    super(false, 'resource');
    this.resource = '';
    this.count = 13; //amount of for each type of resource
    this.deck = [];
  }
  initResourceDeck(){
    let temp = [];
    let n = 0;
    do{
      temp.push([])
      for (let i=0; i<this.count;i++){
        temp[n].push(resourceNames[n]);
      }
      n++;
    }while(n < resourceNames.length)
    this.deck = temp;
  }
}
class DevelopmentCards extends Cards{
    constructor (){
      super(false, 'development');
    }
    initDevCards(){
      return;
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
class KnightCard extends DevelopmentCards{
  constructor(){
    this.cardType = 'knight';
    this.quantity = 14;
  }
}
class SpecialCards extends Cards{
  constructor(){
    //longest road or biggest army
    //icebox goal
  }
}
class Board{
  constructor(){
    this.roads = roadNames;
    this.vertices = vrtxNames;
  }
}

class BoardTile{
  constructor(tileType){
    this.tileType = tileType;
    this.tileNames = ['forest','mountain','fields', 'pasture','hill'];
    this.verticesTouching = [];
    this.roadsTouching = [];
  }
  initTiles(){

  }
}

function makeChips(){
      let arr = numTileList.map(function(letter){
        if(letter ==='B'){return {letter: letter, number:2, dots:'.',};
        }else if (letter === 'D' || letter === 'K'){
          return {letter: letter, number: 3, dots:'..',}
        }else if (letter === 'A' || letter === 'F'|| letter === 'I'){
          return {letter: letter, number: 4, dots:'...',};
        }else if (letter === 'C' || letter === 'G'|| letter === 'H'|| letter === 'L'){
            return {letter: letter, number: 5, dots:'....',};
        }else if (letter === 'E' || letter === 'J'){
          return {letter: letter, number: 6, dots:'..',};
        }else if (letter === 'DOME'){
          return {letter: letter, number: 1, dots:'.',};
        }
      })
      return arr;
}  

//--cached element references--//

//--event listeners--//

//--functions--//
            //initialization functions
function init(){
  gameState.deckOfPlayers = new PlayerDeck(2);
  gameState.deckOfPlayers.populateRoster();
  const rDeck = new ResourceCards();
  rDeck.initResourceDeck();
  const vpDeck = new VpCards();
  gameState.cardDeck.resources = rDeck;
  gameState.cardDeck.development = vpDeck;
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
            //game state functions
function startGame(){
  rollForTurns(gameState.deckOfPlayers.roster);
}

function changeTurn(){
  gameState.turnCount *= -1;
}

function changeRound(){
gameState.roundCount++;
gameState.turnCount = 1;
}
            //game play functions

function rollForTurns(plyrRstr){
plyrRstr.forEach(plyr =>{
  plyr.rollDice();
  })
if(gameState.deckOfPlayers.roster[0].dieRoll === gameState.deckOfPlayers.roster[1].dieRoll){
  rollForTurns();
  return;
}else{
  gameState.deckOfPlayers.sortByRoll();
  }
}

function firstAndSecondRoundTurn(player){
//place one settlement and two roads
}

function takeTurn(player){
  //roll dice, corresponding resources given to all players
  //  if seven move robber, rob peer
  //until player clicks end turn or completes all possible moves, gameplay options will be displayed
  if (gameState.turnCount <=2){
    firstAndSecondRoundTurn(player);
  }else{
    do{

    }while(gameState.playing === true)
  }
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
moveDomeMaster();
thunderDome();
}

function moveDomeMaster(){
  //place thunder dome games master in chosen tile
  //set tiles number tile value to 0 temporarily
}

function thunderDome(){
// combat >8}
}
