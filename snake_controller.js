var controller = {

  init: function() {
    model.gridSize = view.getGridSize();
    model.moveSpeed = view.getMoveSpeed();
    model.rotateSpeed = 100;

    view.init(model.gridSize);
    view.setBoard();
    this.setItems();
    view.renderMenu('Press SPACE to begin!');
    view.waitForStart();
  },

  setItems: function() {

    // Set snakeCoords and appleCoords in model
    model.setSnakeInitial();
    model.setApple();

    // Render snake & apple via view object
    view.renderSnake(model.snakeCoords);
    view.addApple(model.appleCoords);

  },

  gameLoop: undefined,

  rotateLoop: undefined,

  runGameLoop: function() {

    // Disable input so that space can't be pressed again
    view.disableInput();

    // Game loop that updates every model.moveSpeed seconds
    this.gameLoop = setInterval(function() {

      // Move snake
      model.moveSnake();
      view.renderSnake(model.snakeCoords, model.oldTailCoords);

      // Look for direction changes (event listener)
      view.lookForDirectionInput();

      // Check if snake head and apple match, then act accordingly
      if (model.appleEaten()) {
        model.growSnake();
        view.renderSnake(model.snakeCoords, model.oldTailCoords);
        view.removeApple(model.appleCoords);
        model.appleCoords = model.getRandCoords();
        view.addApple(model.appleCoords);
      };

      // Check if snake collided with itself or a wall, and act accordingly
      if (model.snakeCollided()) {

        // Clear intervals
        clearInterval(controller.gameLoop);
        clearInterval(controller.rotateLoop);

        // Reset game
        view.renderMenu('Game over! Press SPACE to play again.');
        model.resetGame();
        view.resetBoard();
        controller.setItems();
        view.disableInput();
        view.waitForStart();

      };

    }, model.moveSpeed);
  },

  runRotateLoop: function() {

    // Rotate board
    this.rotateLoop = setInterval(function() {

      // Set rotation direction && randomize speed
      if (model.rotation === model.rotationMax || model.rotation === model.rotationMin) {
        let newRotation = (Math.floor(Math.random() * 5) + 1) * 0.5;
        if (model.rotationRate > 0) {
          model.rotationRate = -newRotation;
        } else {
          model.rotationRate = newRotation;
        }
      }

      // Increase rotation angle
      model.rotation += model.rotationRate;

      // Set CSS
      $('.gameboard').css({
        '-ms-transform': 'rotate(' + model.rotation + 'deg)',
        '-webkit-transform': 'rotate(' + model.rotation + 'deg)',
        'transform': 'rotate((' + model.rotation + 'deg)'
      })
    }, model.rotateSpeed);

  },

  directionResponse: function(keyCode) {
    switch(keyCode) {
      case 38: // Arrow Up
      case 87: // 'w'
        model.updateDirection('U');
        break;
      case 40: // Arrow Down
      case 83: // 's'
        model.updateDirection('D');
        break;
      case 37: // Arrow Left
      case 65: // 'a'
        model.updateDirection('L');
        break;
      case 39: // Arrow Right
      case 68: // 'd'
        model.updateDirection('R');
        break;
      default:
        return;
    };
  }

}

$(document).ready(function() {
  controller.init();
});
