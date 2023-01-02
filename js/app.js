
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
  turnCount: 0,// how many turns through round have been played
  playing:false,
  leaderboard:[],// array of playerName strings sorted by VP, 
  deckOfPlayers:null,
  cardDeck:{resources:[],
  development:[],
  other:[],},
  currentRoll:null,
  activePlayer:null,
  vrtBuyActive: false,
  rdBuyActive:false,
  upgradeActive:false,
  initTurnCounter:0,
  winner:null,
}
let bonePendingMessage = 'ooo';
let bloodPendingMessage = 'ooo';
//--constants--//
const colors = ['rgb(204, 153, 102)','rgb(204, 51, 0)']
const turnMessage = "its your turn";
const requiredVP = 6;
const roadMessage = "click road";
const nameOptions = ['bone','blood']//options that player has for colors
const devCards = ['knight','road-building','year-of-plenty','monopoly']; //array for names of developement cards
const resourceNames = ['wood','ore','grain','stock','brick'];
const numTileList = ['A','F','G','B','L','H','DOME','k','I','E','J','C','D']; //made into object list later
const tileRollValues = [3,5,4,2,5,5,1,3,4,6,6,3,5];
const tileResourceKey = ['ore','wood','grain','wood','stock','brick','DOME','grain','ore','brick','stock','wood','grain'];
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
  ['v1','v7'],
  ['v2','v8'],
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
      isValid:true,
    }
})
const roadInfo = roadNames.map((road)=>{
    return {name:road,
    isBuilt:false,
  }
})

//--classes--//
class Player{
  constructor (playerName, color){
    this.playerName = playerName;
    this.color = color;
    this.active = false;
    this.settlementsHeld=5; //-number of settlements players hold, 5 @ start
    this.citiesHeld=4; //-number of cities player holds,  4 added @ start
    this.roadsHeld=15; //-number of roads player holds, 15 added @ start
    this.victoryPoints=0; //-number of VP player has, 7 to win, 0 at start
    this.dieRoll=0;
    this.settlementVertices=[];
    this.cityVertices=[];
    this.roadPlacements=[];
    this.message='';
    this.hand = []; //cards[#of card types(development, vp, resources)];
    this.turnCondition = false;
    this.resourcesHeld =  {
      wood:0,
      ore:0,
      stock:0,
      brick:0,
      grain:0
    }
  }
  rollDice(){
    this.dieRoll = Math.floor(Math.random()*6)+1;
    this.message = `u rolled ${this.dieRoll}`;
  }
  setPlayerNum(num){
    this.playerNum = num;
  }
  startTurn(){
    if(gameState.roundCount  < 3){
      this.message = 'place 1 stlmnt + 1 road';
      gameState.vrtBuyActive = true;
      gameState.rdBuyActive = true;
    }else{
    this.message = 'roll 4 the harvest!';
    }
    renderMessages();
  }
  canAffordRoad(){
    return (this.resourcesHeld['wood'] >= 1 && this.resourcesHeld['brick'] >= 1);
  }
  canAffordSettlement(){
    return (this.resourcesHeld['wood'] >= 1 && this.resourcesHeld['brick'] >= 1 && this.resourcesHeld['stock'] >= 1 && this.resourcesHeld['grain'] >= 1);
  }
  canAffordCity(){
    return (this.resourcesHeld['ore'] >= 3 && this.resourcesHeld['grain'] >= 2);
  }
  canAffordCard(){
    return (this.resourcesHeld[stock] >= 2 && this.resourcesHeld[grain] >= 1 && this.resourcesHeld[ore] >= 1);
  }
  acquireResource(resource,quantity){
    this.resourcesHeld[resource] = this.resourcesHeld[resource] + quantity;
  }
  resourceStr(){
    let tempK = Object.keys(this.resourcesHeld);
    let result = tempK.map((str)=>{
      let val = this.resourcesHeld[str];
      return `${str}: ${val}`;
    })
    return result.join(' ');
  }
  placeRoad(location){
    if (roadInfo[location].isBuilt){
      this.setMessage('occupied');
    }
    else{
      this.roadPlacements.push(roadInfo[location].name)
      roadInfo[location].isBuilt = true;
      this.roadsHeld--;
      renderBoard();
      gameState.rdBuyActive = false;
    }
  }
  buyRoad(location){
    if(this.canAffordRoad()&&!roadInfo[location].isBuilt){
      this.placeRoad(location);
      this.resourcesHeld.wood--;
      this.resourcesHeld.brick--;
      this.setMessage('solid investment');
      renderResourceValues();
    }else{
      this.setMessage('cant build there try again');
    }
    gameState.rdBuyActive = false;
  }
  placeSettlement(location){
    if (vertexInfo[location].occupied || vertexInfo[location].isValid === false){
      this.setMessage('invalid placement')
    }else{
      this.settlementVertices.push(vertexInfo[location].name)
      vertexInfo[location].occupied = true;
      vertexInfo[location].isValid = false;
      vertexInfo[location].neighbors.forEach(neighbor =>{
        let idx = vertexInfo.findIndex(function(element){return element.name === neighbor})
        vertexInfo[idx].isValid = false;
      })
      this.settlementsHeld--;
      this.victoryPoints++;
      renderBoard();
      gameState.vrtBuyActive = false;
    }
  }
  buySettlement(location){
    if(this.canAffordSettlement() && vertexInfo[location].isValid){
      this.placeSettlement(location);
      this.resourcesHeld.wood--;
      this.resourcesHeld.brick--;
      this.resourcesHeld.stock--;
      this.resourcesHeld.grain--;
      renderResourceValues();
      this.setMessage('solid investment');
    }else{
      this.setMessage('cant build there try again');
    }
    gameState.vrtBuyActive = false;
  }
  buyCity(location){
    if(this.canAffordCity){
      this.placeCity(location);
      renderResourceValues();
    }
    gameState.upgradeActive = false;
  }
  placeCity(location){
    if (this.settlementVertices.some(vertex => {return vertex === vertexInfo[location].name})){
      this.cityVertices.push(vrtxNames[location])
      let temp = this.settlementVertices.indexOf(vrtxNames[location])
      this.settlementVertices.splice(temp, 1);
      this.citiesHeld--;
      this.resourcesHeld['ore']-=3;
      this.resourcesHeld['grain']-=2;
      gameState.upgradeActive = false;
      renderBoard();
      this.setMessage('yield doubled!');
      this.victoryPoints++;
    }else{
      this.setMessage('invalid upgrade try again');
    }
  }
  buyVP(){
    if(this.canAffordCard()){
      this.victoryPoints++;
      this.resourcesHeld.grain--;
      this.resourcesHeld.ore--;
      this.resourcesHeld.stock-=2;
      this.setMessage('Victory Point Added');
    }else{
      this.setMessage('cannot afford');
    }
  }
  getRobbed(){
    if (this.resourcesHeld.ore >= 1) this.resourcesHeld.ore--;
    if (this.resourcesHeld.wood >= 1) this.resourcesHeld.wood--;
    if (this.resourcesHeld.brick >= 1) this.resourcesHeld.brick--;
    if (this.resourcesHeld.stock >= 1) this.resourcesHeld.stock--;
    if (this.resourcesHeld.grain >= 1) this.resourcesHeld.grain--;
  }
  setMessage(str){
    this.message = str;
    renderMessages();
  }
}
  //creates and stores objects of classs Player in a object for functions of the game to iterate through.
class PlayerDeck {
  constructor(numPlayers){
    this.numPlayers = numPlayers;
    this.roster = nameOptions;
  }
  populateRoster(){
    this.roster = [new Player(nameOptions[0],colors[0]), new Player(nameOptions[1],colors[1])];
  }
  getRoster(){
    return this.roster;
  }
  sortByRoll(){
      this.roster.sort((a,b) =>{
      return a.dieRoll - b.dieRoll;
    })
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

const vertexElements = document.querySelectorAll('.vertice');
const hexElements = document.querySelectorAll('.hex');
const roadElements = document.querySelectorAll('.road');
const keyBttn = document.querySelector('#keyButton');

const startGameBttn = document.querySelector('#gameStart');
const rollDiceBttn = document.querySelector('#rollDice');

const boneSettleBttn = document.querySelector('#boneSettlement');
const boneRoadBttn = document.querySelector('#boneRoad');
const boneUpgradeBttn = document.querySelector('#boneUpgrade');
//const boneVpBttn = document.querySelector('#boneVP');
const boneEndTurnButton = document.querySelector('#boneEndTurn');
const boneAlertMessage = document.querySelector('#pOneMessage');
const boneResourceElement = document.querySelector('#boneResources');

const bloodSettleBttn = document.querySelector('#bloodSettlement');
const bloodRoadBttn = document.querySelector('#bloodRoad');
const bloodUpgradeBttn = document.querySelector('#bloodUpgrade');
//const bloodVpBttn = document.querySelector('#bloodVP');
const bloodEndTurnButton = document.querySelector('#bloodEndTurn');
const bloodAlertMessage = document.querySelector('#pTwoMessage');
const bloodResourceElement = document.querySelector('#bloodResources');

//--event listeners--//
startGameBttn.addEventListener('click',function(){
  startGameBttn.style = "display:none;";
  if (gameState.playing){
    gameState.turnCount = 1;
    gameState.roundCount = 1;
    gameState.deckOfPlayers.roster.forEach(player=> {
      player.message = '---';
    })
    gameState.activePlayer.startTurn();
    if(gameState.roundCount === 1){
      firstTurnButton();
    }
  }else{
    rollDiceBttn.style = "display:block;";
    init();
  }
})
rollDiceBttn.addEventListener('click', function(){
  if(gameState.playing !==true){return};
  rollDiceBttn.innerHTML = 'Roll The Dice';
  startGameBttn.innerHTML= 'begin';
  if(gameState.activePlayer){
    gameState.activePlayer.rollDice();
    rollDiceBttn.style = "display:none;";
    if(gameState.roundCount >2){
      gameState.activePlayer.turnCondition  = true;
      harvest(gameState.activePlayer.dieRoll);
    }
  }
  else{
    rollForTurns(gameState.deckOfPlayers.roster);
    gameState.deckOfPlayers.sortByRoll();
    rollDiceBttn.style = "display:none;";
    gameState.activePlayer = gameState.deckOfPlayers.roster[1];
    gameState.activePlayer.active = true;
    startGameBttn.style = "display:block;";
    startGameBttn.innerHTMl = 'begin';
  }
  renderMessages();
})
keyBttn.addEventListener('click', function(){
  let keys = document.querySelectorAll('.keyItem');
  keys.forEach(key=>{key.classList.toggle('showKey')})
})
window.addEventListener('click', function(event){
  if (!event.target.matches('#keyButton')){
    let targs = this.document.getElementsByClassName('keyItem');
    for (let i=0; i<targs.length;i++){
      let openKeyItem = targs[i];
      if(openKeyItem.classList.contains('showKey')){
        openKeyItem.classList.remove('showKey');
      }
    }
  }
})

boneEndTurnButton.addEventListener('click',function(){
  if (gameState.activePlayer.turnCondition === true){
    boneEndTurnButton.style = "display:none;";
    endTurn();
  }else{
    gameState.activePlayer.setMessage('ur not done!');
  }
})
bloodEndTurnButton.addEventListener('click',function(){
  if (gameState.activePlayer.turnCondition === true){
  bloodEndTurnButton.style = "display:none;";
  endTurn();
  }else{
    gameState.activePlayer.setMessage('ur not done!');
  }
})
vertexElements.forEach(element=>{
  element.addEventListener('click', function(){
    if (gameState.playing !== true){return;}
    let loc = vrtxNames.indexOf(`${element.innerHTML}`);
    if(gameState.vrtBuyActive === true){
      if(gameState.roundCount >2){
      gameState.activePlayer.buySettlement(loc);
      }else{
        gameState.activePlayer.placeSettlement(loc);
        if(gameState.initTurnCounter === 1){
          gameState.initTurnCounter = 0;
          gameState.activePlayer.turnCondition = true;
        }else{ gameState.initTurnCounter++}
      }
    }else if(gameState.upgradeActive){
      gameState.activePlayer.buyCity(loc);
    }else{
      gameState.activePlayer.setMessage('bum click');
    }
  })
})
roadElements.forEach(element=>{
  element.addEventListener('click', function(){
    if (gameState.playing !== true){return;}
    if(gameState.rdBuyActive === true){
      let rd = roadNames.indexOf(`${element.innerHTML}`);
      if (gameState.roundCount > 2){
        gameState.activePlayer.buyRoad(rd);
      }else{
        gameState.activePlayer.placeRoad(rd);
        if(gameState.initTurnCounter === 1){
          gameState.initTurnCounter = 0;
          gameState.activePlayer.turnCondition = true;
        }else{ gameState.initTurnCounter++}
      }
    }else{
      gameState.activePlayer.setMessage('bum click');
    }
  })
})

boneRoadBttn.addEventListener('click', function(){
  if (gameState.playing !== true){return;}
  if(gameState.roundCount > 2){
    if (gameState.activePlayer.playerName === 'bone'){
      if(gameState.activePlayer.canAffordRoad()){
        gameState.activePlayer.setMessage('which 1 do u want?')
        gameState.rdBuyActive = true;
      }else{
        gameState.activePlayer.setMessage('u cannot afford');
      }
    }
  }
})
boneSettleBttn.addEventListener('click', function(){
  if (gameState.playing !== true){return;}
  if(gameState.roundCount > 2){
    if (gameState.activePlayer.playerName === 'bone'){
      if(gameState.activePlayer.canAffordSettlement()){
        gameState.activePlayer.setMessage('which 1 do u want?');
        gameState.vrtBuyActive = true;
      }else{
        gameState.activePlayer.setMessage('u cannot afford');
      }
    }else{
      gameState.activePlayer.setMessage('over here!');
    }
  }
})
boneUpgradeBttn.addEventListener('click', function(){
  if (gameState.playing !== true){return;}
  gameState.vrtBuyActive = false;
  if(gameState.roundCount > 2){
    if (gameState.activePlayer.playerName === 'bone'){
      if(gameState.activePlayer.canAffordCity()){
        gameState.activePlayer.setMessage('upgrade a settlement');
        gameState.upgradeActive = true;
      }else{
        gameState.activePlayer.setMessage('u cannot afford');
      }
    }else{
      gameState.activePlayer.setMessage('over here!');
    }
  }
})
/*
boneVpBttn.onclick = function(){
  if (gameState.playing !== true){return;}
  if(gameState.roundCount > 2){
    if (gameState.activePlayer.playerName === 'bone'){
    gameState.activePlayer.buyVP();
    }else{
      gameState.activePlayer.setMessage('over here!')
    }
  }
}
*/
bloodRoadBttn.addEventListener('click', function(){
  if (gameState.playing !== true){return;}
  if(gameState.roundCount > 2){
    if (gameState.activePlayer.playerName === 'blood'){
      if(gameState.activePlayer.canAffordRoad()){
        gameState.activePlayer.setMessage('which 1 do u want?');
        gameState.rdBuyActive = true;
      }else{
        gameState.activePlayer.setMessage('u cannot afford');
      }
    }
  }
})
bloodSettleBttn.addEventListener('click', function(){
  if (gameState.playing !== true){return;}
  if(gameState.roundCount > 2){
    if (gameState.activePlayer.playerName === 'blood'){
      if(gameState.activePlayer.canAffordSettlement()){
        gameState.activePlayer.setMessage('which 1 do u want?');
        gameState.vrtBuyActive = true;
      }else{
        gameState.activePlayer.setMessage('u cannot afford');
      }
    }else{
      gameState.activePlayer.setMessage('over here!');
    }
  }
})
bloodUpgradeBttn.addEventListener('click', function(){
  if (gameState.playing !== true){return;}
  gameState.vrtBuyActive = false;
  if(gameState.roundCount > 2){
    if (gameState.activePlayer.playerName === 'blood'){
      if(gameState.activePlayer.canAffordCity()){
        gameState.activePlayer.setMessage('upgrade a settlement');
        gameState.upgradeActive = true;
      }else{
        gameState.activePlayer.setMessage('u cannot afford');
      }
    }else{
      gameState.activePlayer.setMessage('over here!');
    }
  }
})
/*
bloodVpBttn.addEventListener('click', function(){
  if (gameState.playing !== true){return;}
  if(gameState.roundCount > 2){
    if (gameState.activePlayer.playerName === 'blood'){
    gameState.activePlayer.buyVP();
    }else{
      gameState.activePlayer.setMessage('over here!')
    }
  }
})
*/


//--functions--//
            //initialization functions
function init(){
  gameState.deckOfPlayers = new PlayerDeck(2);
  gameState.deckOfPlayers.populateRoster();
  const rDeck = new ResourceCards();
  const vpDeck = new VpCards();
  gameState.cardDeck.resources = rDeck;
  gameState.cardDeck.development = vpDeck;
  gameState.playing = true;
  render();
}
            //render functions
function render(){
  renderBoard();
  renderMessages();
}
function renderResourceValues(){
  gameState.deckOfPlayers.roster.forEach(plyr=>{
    if(plyr.playerName === 'bone'){
        boneResourceElement.innerHTML = plyr.resourceStr();
      }
    if (plyr.playerName === 'blood'){
      bloodResourceElement.innerHTML = plyr.resourceStr();
    }
  })
}
function renderBoard(){
  gameState.deckOfPlayers.roster.forEach(player=>{
    player.settlementVertices.forEach(vert =>{
    document.querySelector(`#${vert}`).style.backgroundColor = `${player.color}`;
    })
  })
  gameState.deckOfPlayers.roster.forEach(player=>{
    player.roadPlacements.forEach(road =>{
    document.querySelector(`#${road}`).style.backgroundColor = `${player.color}`;
    })
  })
  gameState.deckOfPlayers.roster.forEach(player=>{
    player.cityVertices.forEach(city=>{
      document.querySelector(`#${city}`).style.borderRadius = '10%';
    })
  })
}
function renderMessages(){
  gameState.deckOfPlayers.roster.forEach(player=>{
    if (player.playerName === 'bone'){
      boneAlertMessage.innerHTML = player.message;
    }else{
      bloodAlertMessage.innerHTML = player.message;
    }
  })
}


            //game state functions

function startGame(){
  init();
}
function endTurn(){
  if (gameState.turnCount === 1){
    changeTurn();
  }else{
    changeRound();
  }
  if (gameState.roundCount>2){
    rollDiceBttn.style = "display:block;";
    gameState.rdBuyActive = false;
    gameState.vrtBuyActive = false;
    gameState.upgradeActive = false;
    checkForWinner();
  }
}
function firstTurnButton(){
  if (gameState.activePlayer.playerName === 'blood'){
    bloodEndTurnButton.style = "display:inline-block;";
  }else{
    boneEndTurnButton.style = "display:inline-block;";
  }
}
function flipTurnButton(){
  if (gameState.activePlayer.playerName === 'blood'){
    boneEndTurnButton.style = "display:inline-block;";
  }else{
    bloodEndTurnButton.style = "display:inline-block;";
  }
}

function changeTurn(){
  gameState.turnCount--;
  flipTurnButton()
  gameState.activePlayer.active = false;
  gameState.activePlayer.setMessage('---');
  gameState.activePlayer = gameState.deckOfPlayers.roster[gameState.turnCount];
  gameState.activePlayer.active = true;
  gameState.activePlayer.startTurn();
}

function changeRound(){
  if(gameState.roundCount === 2){initialHarvest()}
  gameState.roundCount++;
  gameState.turnCount = 1;
  flipTurnButton();
  gameState.activePlayer.setMessage('---');
  gameState.activePlayer.active = false;
  gameState.activePlayer = gameState.deckOfPlayers.roster[gameState.turnCount];
  gameState.activePlayer.active = true;
  gameState.activePlayer.startTurn();
}
function checkForWinner(){
  gameState.deckOfPlayers.roster.forEach(plyr=>{
    if(plyr.victoryPoints >= requiredVP){
      gameState.winner = plyr;
      gameState.playing = false;
      gameState.winner.setMessage('You Have Won!');
    }
  })
}
//possibly extraneous
function hasNeighbors(location){
  let suspect = vertexInfo[location];
  let susNeighbors = suspect.neighbors;
  let indicator = false;
  susNeighbors.forEach(neighbor => {
    let temp = vertexInfo.find(vertex => vertex.name === neighbor);
    indicator = !temp.isValid;
  })
  return indicator;
}
            //game play functions

function rollForTurns(plyrRstr){
  plyrRstr.forEach(plyr =>{
    plyr.rollDice();
  })
  while(gameState.deckOfPlayers.roster[0].dieRoll === gameState.deckOfPlayers.roster[1].dieRoll){
    plyrRstr.forEach(plyr =>{
      plyr.rollDice();
    })
  }
}


function harvest(currentRoll){
  if (currentRoll >1){
    let keyTiles = [];
    tileInfo.forEach(tile => {
      if (tile.rollValue === currentRoll){
        keyTiles.push({resource:tile.resource, vList:tile.vertices});
      }
    })
    gameState.deckOfPlayers.roster.forEach(player =>{
      player.settlementVertices.forEach(vertex =>{
        keyTiles.forEach(tile => {
          if (tile.vList.includes(vertex)){
            player.acquireResource(tile.resource, 1);
          }
        })
      })
      player.cityVertices.forEach(vertex =>{
        keyTiles.forEach(tile => {
          if (tile.vList.includes(vertex)){
            player.acquireResource(tile.resource, 2);
          }
        })
      })
    })
  }else{robberRolled()}
  renderResourceValues(); 
}
function initialHarvest(){
  for(let i=0;i <2; i++){
    for(let j=2; j<7; j++){
      harvest(j);
    }
  }
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
  gameState.activePlayer.setMessage('your luck has run out');
  gameState.activePlayer.getRobbed();
}



function thunderDome(){
// combat >8}
}

function test(){
}