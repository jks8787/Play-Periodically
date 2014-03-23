var gameArray = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L'];
var gameValues = [];
var tileIds = [];
var tilesFlipped = 0;
Array.prototype.tileShuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
};
var newBoard = function(){
  tilesFlipped = 0;
  var output = '';
    gameArray.tileShuffle();
  for(var i = 0; i < gameArray.length; i++){
    output += '<div id="tile_'+i+'" onclick="gameTileFlip(this,\''+gameArray[i]+'\')"></div>';
  }
  document.getElementById('game-board').innerHTML = output;
};

var gameTileFlip = function(tile, val){
  if(tile.innerHTML === "" && gameValues.length < 2){
    tile.style.background = '#FFF';
    tile.innerHTML = val;
    if(gameValues.length === 0){
      gameValues.push(val);
      tileIds.push(tile.id);
    } else if(gameValues.length == 1){
      gameValues.push(val);
      tileIds.push(tile.id);
      if(gameValues[0] == gameValues[1]){
        tilesFlipped += 2;
        gameValues = [];
           tileIds = [];
        if(tilesFlipped == gameArray.length){
          alert("you got it!");
          document.getElementById('game-board').innerHTML = "";
          newBoard();
        }
      } else {
        var flipBack = function(){
            var tile_1 = document.getElementById(tileIds[0]);
            var tile_2 = document.getElementById(tileIds[1]);
            tile_1.style.background = 'url(tile_bg.jpg) no-repeat';
                  tile_1.innerHTML = "";
            tile_2.style.background = 'url(tile_bg.jpg) no-repeat';
                  tile_2.innerHTML = "";
            gameValues = [];
                  tileIds = [];
        };
        setTimeout(flipBack, 700);
      }
    }
  }
};
