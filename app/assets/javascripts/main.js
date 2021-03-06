$( document ).ready(function() {
    playPeriodically.newBoard(playPeriodically.gameArray);
});

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

playPeriodically.newBoard = function(cardArray){
  var $div, arrayLength;
  arrayLength = cardArray.length;

  $('#game-board').html('');

  playPeriodically.resetBlockhighlight();

  playPeriodically.flipBackCounter = 0;

  playPeriodically.setScore(0);

  playPeriodically.tilesFlipped = 0;

  cardArray.tileShuffle();

  $div = $('<div />');

  for(var i = 0; i < arrayLength; i++){
    var tempDiv = $('<div />', {
      id: 'tile_' + i
    });

    (function(){
      var pos = i;
      tempDiv.on('click', function() {
        playPeriodically.gameTileFlip(this, cardArray[pos], cardArray);
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

playPeriodically.postScore = function(value){
  $.ajax({
    type: "POST",
    url: '/scores',
    beforeSend: function(xhr){xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
    dataType: 'json',
    data: { value: playPeriodically.flipBackCounter },
    success: playPeriodically.newGameScore,
    error: function(jqXHR,textStatus, errorThrown){
      console.log(errorThrown);
    }
  });
};

playPeriodically.newGameScore = function(data){
  $('#score-board').empty();
  if(data.hasOwnProperty("message")){
    playPeriodically.popUp("#dialog-please-sign-in");
  }
};

playPeriodically.gameTileFlip = function(tile, val, cardArray){
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
        playPeriodically.highlightBlock(playPeriodically.gameValues[0]);
        playPeriodically.tilesFlipped += 2;
        playPeriodically.gameValues = [];
           playPeriodically.tileIds = [];

        if(playPeriodically.tilesFlipped === cardArray.length){
          playPeriodically.popUp("#dialog-you-got-it");
          playPeriodically.postScore();
          playPeriodically.newBoard(playPeriodically.gameArray);
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

playPeriodically.highlightBlock = function(elementSymbol){
  var elementClass, elementBlock, newClass;
  elementClass = "element_block_" + elementSymbol;
  elementBlock = $('.' + elementClass );
  newClass = "matched " + elementClass;
  elementBlock.attr("class", newClass);
};

playPeriodically.resetBlockhighlight = function(){
  var i, classes, newClass, elementBlocks = $(".matched");
  if(elementBlocks.length){
    for (i = 0; i < elementBlocks.length; i++) {
      classes = $(elementBlocks[i]).attr('class').split(' ');
      newClass = classes[1];
      $(elementBlocks[i]).attr("class", newClass);
    }
  }
};

playPeriodically.popUp = function(messageId) {
  $( messageId ).dialog({
    draggable: false,
    resizable: false,
    closeOnEscape: false,
    buttons: {
      Ok: function() {
        $( this ).dialog( "close" );
      }
    },
    open: function(event, ui) { $(".ui-dialog-titlebar-close", ui.dialog || ui).hide(); }
  });
};







