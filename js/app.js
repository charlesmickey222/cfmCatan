
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
const tileRollValues = [4,4,5,2,5,5,1,3,4,6,6,5,3];
const tileResourceKey = ['ore','wood','grain','wood','sheep','brick','DOME','grain','ore','brick','sheep','wood','grain'];
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
const vrtxRoadList = [
  ['r1','r2'],
  ['r1','r3',],
  ['r2','r5'],
  ['r3','r7'],
  ['r4','r9'],
  ['r4','r10'],
  ['r5','r6','r12'],
  ['r6','r7','r12'],
  ['r8','r15'],
  ['r8','r16'],
  ['r9','r17'],
  ['r10','r12','r19'],
  ['r11','r12','r20'],
  ['r13','r14','r20'],
  ['r14','r15','r23'],
  ['r16','r25'],
  ['r17','r28'],
  ['r18','r19','r26'],
  ['r20','r21','r28'],
  ['r21','r22','r29'],
  ['r23','r24','r21'],
  ['r24','r25'],
  ['r26','r27','r33'],
  ['r27','r28','r34'],
  ['r29','r29','r35'],
  ['r30','r31','r37'],
  ['r32','r38'],
  ['r31','r32','r40'],
  ['r34','r35','r42'],
  ['r35','r36','r43'],
  ['r37','r38','r45'],
  ['r38','r46'],
  ['r39','r47'],
  ['r40','r41','r49'],
  ['r41','r42','r50'],
  ['r43','r44','r50'],
  ['r44','r45','r53'],
  ['r46','r55'],
  ['r47','r48'],
  ['r48','r49'],
  ['r50','r51','r56'],
  ['r51','r52','r57'],
  ['r53','r54'],
  ['r54','r55'],
  ['r56','r58'],
  ['r57','r60'],
  ['r58','r59'],
  ['r59','r60'],
];
const vrtxNeighborList = [
  ['v2','v3'],
  ['v1','v4',],
  ['v1','v1'],
  ['rv2','v8'],
  ['v6','v11'],
  ['v5','v12'],
  ['v3','v8','v13'],
  ['v7','v4','v11'],
  ['v10','v15'],
  ['v9','v16'],
  ['v5','v17'],
  ['v6','v13','v18'],
  ['v4','v12','v19'],
  ['v8','v25','v20'],
  ['v9','v14','v21'],
  ['v10','v22'],
  ['v11','v18'],
  ['v12','v17','v23'],
  ['v13','v20','v24'],
  ['v14','v19','v25'],
  ['v15','v22','v26'],
  ['v16','v21'],
  ['v18','v28','v24'],
  ['v23','v19','v29'],
  ['v20','v26','v30'],
  ['v21','v25','v30'],
  ['v28','v33'],
  ['v23','v27','v34'],
  ['v24','v30','v35'],
  ['v25','v29','v36'],
  ['v26','v32','v37'],
  ['v31','v38'],
  ['v27','v39'],
  ['v28','v35','v40'],
  ['v39','v34','v41'],
  ['v30','v37','v42'],
  ['v31','v36','v43'],
  ['v32','v44'],
  ['v33','v40'],
  ['v39','v34'],
  ['v35','v42','v45'],
  ['v36','v41','v46'],
  ['v37','v44'],
  ['v38','v43'],
  ['v41','v47'],
  ['v42','v48'],
  ['v45','v48'],
  ['v46','v47'],
];
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
  ['v19','v20','v24','v25','v29','v30'],
  ['v23','v24','v28','v29','v34','v35'],
  ['v25','v26','v30','v31','v36','v37'],
  ['v27','v28','v33','v34','v39','v40'],
  ['v29','v30','v35','v36','v41','v42'],
  ['v31','v32','v37','v38','v43','v44'],
  ['v41','v42','v45','v46','v47','v48']
];
const tileInfo = boardList.map((tile, index) =>{
  return {name:tile,
    rollValue:tileRollValues[index],
    vertices:tileVertexList[index],
    resource:tileResourceKey[index],
}
})
const vertexInfo = vrtxNames.map((vrtx,index)=>{
    return {name:vrtx, 
      roadsNear:vrtxRoadList[index],
      neighbors:vrtxNeighborList[index],
      occupied:false,
      yield:1,
    }
})
const roadInfo = roadNames.map((road,index)=>{
    return {name:road,
    isBuilt:false,
  }
})

//--classes--//
class Player{
  constructor (playerName, playerNum,hand){
    this.hand = hand; //cards[#of card types(development, vp, resources)];
    this.playerName = playerName;
    this.playerNum =  playerNum;
    this.active = false;
    this.settlementsHeld=0; //-number of settlements players hold, 5 @ start
    this.citiesHeld=0; //-number of cities player holds,  4 added @ start
    this.roadsHeld=0; //-number of roads player holds, 15 added @ start
    this.victoryPoints=0; //-number of VP player has, 7 to win, 0 at start
    this.dieRoll=0;
    this.settlementVertices=[];
    this.cityVertices=[];
    this.roadPlacements=[];
    this.resourcesHeld ={
      wood:0,
      ore:0,
      sheep:0,
      brick:0,
      grain:0
    }
  }
  setPlayerNum(num){
    this.playerNum = num;
  }
  canAffordRoad(){
    return (this.resourcesHeld['wood'] >= 1 && this.resourcesHeld['brick'] >= 1);
  }
  canAffordSettlement(){
    return (this.resourcesHeld['wood'] >= 1 && this.resourcesHeld['brick'] >= 1 && this.resourcesHeld['sheep'] >= 1 && this.resourcesHeld['grain'] >= 1);
  }
  canAffordCity(){
    return (this.resourcesHeld['ore'] >= 3 && this.resourcesHeld['grain'] >= 2);
  }
  canAffordCard(){
    return (this.resourcesHeld[sheep] >= 1 && this.resourcesHeld[grain] >= 1 && this.resourcesHeld[ore] >= 1);
  }
  rollDice(){
    const die = Math.floor(Math.random()*6) +1;
    this.dieRoll = die;
  }
  acquireResource(resource,quantity){
    this.resourcesHeld[resource] = this.resourcesHeld[resource] + quantity;
  }
  placeRoad(location){
    if (roadInfo[location].isBuilt){
      console.log('occupied')
    }
    else{
      this.roadPlacements.push(roadInfo[location].name)
      roadInfo[location].isBuilt = true;
      this.roadsHeld--;
    }
  }
  buyRoad(location){
    if(this.canAffordRoad()){
      this.placeRoad(location);
      this.resourcesHeld.wood--;
      this.resourcesHeld.brick--;
    }
  }
  placeSettlement(location){
    if (vertexInfo[location].occupied){
      console.log('occupied')
    }else if(){

    }else{
      this.settlementVertices.push(vertexInfo[location].name)
      roadInfo[location].isBuilt = true;
      this.settlementsHeld--;
    }
  }
  buySettlement(location){
    if(this.canAffordRoad()){
      this.placeRoad(location);
      this.resourcesHeld.wood--;
      this.resourcesHeld.brick--;
    }
  }
  placeCity(location){
    if (this.settlementVertices.some(vertex => {return vertex === vertexInfo[location].name})){
      if (this.canAffordCity){
      
      }
    }
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
/*
class BoardTile{
  constructor(tileType){
    this.tileType = tileType;
    this.tileNames = ['forest','mountain','fields', 'pasture','hill'];
  }
}

switched to declaring as hard coded constants potentially returning to construction in this fashion
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
*/
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

            //game state functions
function startGame(){
  rollForTurns(gameState.deckOfPlayers.roster);
}

function changeTurn(){
  gameState.turnCount--;
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
  console.log('tied roll again');
  rollForTurns();
  return;
}else{
  gameState.deckOfPlayers.sortByRoll();
  }
}

function firstAndSecondRoundTurn(player){
player.placeSettlement();
player.placeRoad(roadInquiry());
}

function takeTurn(player){
  //roll dice, corresponding resources given to all players
  //  if seven move robber, rob peer
  //until player clicks end turn or completes all possible moves, gameplay options will be displayed
  player.rollDice();
  if (gameState.turnCount <=2){
    firstAndSecondRoundTurn(player);
  }else{
    do{

    }while(gameState.playing === true)
  }
}

function checkIfHarvest(currentRoll){
let keyVerts = [];
tileInfo.forEach(tile => {
  if (tile.rollValue === currentRoll){
    keyVerts.concat(tile.vertices);
  }
})
}
function roadInquiry(){
  return '0';
}
function settlementInquiry(){
  return '0';
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
