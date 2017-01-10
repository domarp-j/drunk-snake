var view = {

  init: function(gridSize) {
    this.gridSize = gridSize;
  },

  getGridSize() {
    return 21; // TODO: have player set size
  },

  getMoveSpeed() {
    return 100; // TODO: have player set speed
  },

  setBoard: function() {
    this.setRows();
    this.setColumns();
  },

  setRows: function() {
    var i = this.gridSize;
    while (i--) {
      var rowDiv = this.createDiv("row");
      $(".gameboard").append(rowDiv.attr("id", i));
    };
  },

  setColumns: function() {
    var self = this
    $(".row").each(function(index, element) {
      var i = self.gridSize;
      while (i--) {
        var columnDiv = self.createDiv("square");
        $(element).append(columnDiv.attr("id", i));
      };
    });
  },

  createDiv: function(className) {
    var $div = $("<div>");
    $div.addClass(className);
    return $div;
  },

  addClassAtCoords: function(className, coords) {
    var targetRow = $('.row').filter('#' + coords.y);
    var targetSquare = targetRow.children('#' + coords.x);
    targetSquare.addClass(className);
  },

  removeClassAtCoords: function(className, coords) {
    var targetRow = $('.row').filter('#' + coords.y);
    var targetSquare = targetRow.children('#' + coords.x);
    targetSquare.removeClass(className);
  },

  renderSnake: function(snakeCoords, oldTailCoords) {
    snakeCoords.forEach(function(coords) {
      view.addClassAtCoords('snake', coords);
    });
    if (oldTailCoords) {
      this.removeClassAtCoords('snake', oldTailCoords)
    }
  },

  addApple: function(coords) {
    this.addClassAtCoords('apple', coords);
  },

  removeApple: function(coords) {
    this.removeClassAtCoords('apple', coords);
  },

  renderMenu: function(message) {
    $('.menu').show();
    $('.menu p').text(message);
  },

  waitForStart: function() {
    $(document).on('keyup', function(event) {
      if (event.keyCode === 32) {
        $('.menu').hide();
        controller.runGameLoop();
        controller.runRotateLoop();
      }
    });
  },

  disableInput: function() {
    $(document).off();
  },

  lookForDirectionInput: function() {
    $(document).on('keyup', function(event) {
      controller.directionResponse(event.keyCode);
    });
  },

  resetBoard: function() {
    $('.square').removeClass('snake');
    $('.square').removeClass('apple');
    $('.gameboard').css({
      '-ms-transform': 'rotate(0deg)',
      '-webkit-transform': 'rotate(0deg)',
      'transform': 'rotate(0deg)'
    })
  }

};
