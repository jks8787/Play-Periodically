var gameArray = ['H','H','He','He','C','C','N','N','Ne','Ne','P','P','Ca','Ca','Li','Li','Mg','Mg','O','O','K','K','Na','Na'];
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
    gameArray.tileShuffle(),
    // Container Div
    $div = $('<div />');
  for(var i = 0; i < gameArray.length; i++){
    var tempDiv = $('<div />', {
      id: 'tile_' + i
    });

    (function(){
      var pos = i;
      tempDiv.on('click', function() {
        gameTileFlip(this, gameArray[pos]);
      });
    }());

    $div.append(tempDiv);
  }

  $('#game-board').append($div.children());

};

var gameTileFlip = function(tile, val){
  var $tile_obj = $(tile);
  $tile_obj.addClass('element_' + val);
  if(tile.innerHTML === "" && gameValues.length < 2){
    // tile.style.background = '#FFF';
    // tile.innerHTML = val;
    $tile_obj.addClass("flipped-over");
    // tile.innerHTML = val;
    if(gameValues.length === 0){
      gameValues.push(val);
      tileIds.push(tile.id);
    } else if(gameValues.length === 1){
      gameValues.push(val);
      tileIds.push(tile.id);
      if(gameValues[0] === gameValues[1]){
        tilesFlipped += 2;
        gameValues = [];
           tileIds = [];
        if(tilesFlipped === gameArray.length){
          alert("you got it!");
          $('#game-board').html('');
          newBoard();
        }
      } else {
        var flipBack = function(){
            var $tile_1, $tile_2;

            $tile_1 = $('#' + tileIds[0]);
            $tile_2 = $('#' + tileIds[1]);

            $tile_1.removeClass('flipped-over');
            $tile_2.removeClass('flipped-over' );

            $tile_1.html('');
            $tile_2.html('');

            $tile_1.addClass("flipped");
            $tile_2.addClass("flipped");

            gameValues = [];
            tileIds = [];

        };

        setTimeout(flipBack, 700);
      }
    }
  }
};
