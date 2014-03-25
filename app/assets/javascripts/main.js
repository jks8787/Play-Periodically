var playPeriodically= playPeriodically || {};

playPeriodically.gameArray = ['H','H','He','He','C','C','N','N','Ne','Ne','P','P','Si','Si','Li','Li','Mg','Mg','O','O','B','B','Na','Na'];
playPeriodically.gameValues = [];
playPeriodically.tileIds = [];
playPeriodically.tilesFlipped = 0;
playPeriodically.flipBackCounter = 0;


Array.prototype.tileShuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
};

playPeriodically.newBoard = function(){
  var $div;
  playPeriodically.renderScoreBoard();

  playPeriodically.flipBackCounter = 0;

  playPeriodically.setScore(0);

  playPeriodically.tilesFlipped = 0;

  // playPeriodically.gameArray.tileShuffle(),

    $div = $('<div />');
  for(var i = 0; i < playPeriodically.gameArray.length; i++){
    var tempDiv = $('<div />', {
      id: 'tile_' + i
    });

    (function(){
      var pos = i;
      tempDiv.on('click', function() {
        playPeriodically.gameTileFlip(this, playPeriodically.gameArray[pos]);
      });
    }());

    $div.append(tempDiv);
  }

  $('#game-board').append($div.children());

};

playPeriodically.setScore = function(value){
  playPeriodically.flipBackCounter += value ;
  var $scoreElement = $('#score-board');
  $scoreElement.html( playPeriodically.flipBackCounter );
};

playPeriodically.renderScoreBoard = function(value){
  if($('#score-board').length){
    $.ajax({
      type: "POST",
      url: '/scores',
      dataType: 'json',
      data: { value: playPeriodically.flipBackCounter },
      success:  $('#score-board').empty()
    });
  }
};

playPeriodically.gameTileFlip = function(tile, val){
  var $tile_obj = $(tile);
  $tile_obj.addClass('element_' + val);
  if(tile.innerHTML === "" && playPeriodically.gameValues.length < 2){

    $tile_obj.addClass("flipped-over");
    if(playPeriodically.gameValues.length === 0){
      playPeriodically.gameValues.push(val);
      playPeriodically.tileIds.push(tile.id);

    } else if(playPeriodically.gameValues.length === 1){
      playPeriodically.gameValues.push(val);
      playPeriodically.tileIds.push(tile.id);

      if(playPeriodically.gameValues[0] === playPeriodically.gameValues[1]){
        playPeriodically.tilesFlipped += 2;
        playPeriodically.gameValues = [];
           playPeriodically.tileIds = [];

        if(playPeriodically.tilesFlipped === playPeriodically.gameArray.length){
          alert("you got it!");
          $('#game-board').html('');
          playPeriodically.newBoard();
        }
      } else {
        playPeriodically.flipBack = function(){

            var $tile_1, $tile_2, $scoreElement;
            $tile_1 = $('#' + playPeriodically.tileIds[0]);
            $tile_2 = $('#' + playPeriodically.tileIds[1]);

            $tile_1.removeClass('flipped-over');
            $tile_2.removeClass('flipped-over' );

            $tile_1.html('');
            $tile_2.html('');

            $tile_1.addClass("flipped");
            $tile_2.addClass("flipped");

            playPeriodically.gameValues = [];
            playPeriodically.tileIds = [];
            playPeriodically.setScore(1);
        };

        setTimeout(playPeriodically.flipBack, 700);
      }
    }
  }
};
