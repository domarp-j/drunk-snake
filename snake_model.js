var model = {

  gridSize: undefined, // set by controller
  moveSpeed: undefined, // set by controller
  rotateSpeed: undefined, // set by controller
  snakeCoords: [], // set by controller, [tail, ..., head],
  headCoords: {}, // set by controller
  tailCoords: {},
  oldTailCoords: {}, // for updating the view
  currentDirection: 'R', // direction that snake is moving,
  appleCoords: {}, // location of apple,
  rotation: 0, // deg
  rotationMax: 60, // deg
  rotationMin: -60, // deg
  rotationRate: 0.5, // deg

  getMidCoords: function() {
    var mid = Math.floor(this.gridSize / 2);
    return { x: mid, y: mid };
  },

  getRandCoords: function() {
    var x = Math.floor(Math.random() * this.gridSize);
    var y = Math.floor(Math.random() * this.gridSize);
    return { 'x': x, 'y': y };
  },

  setSnakeInitial: function() {
    this.snakeCoords = [this.getMidCoords()];
    this.headCoords = this.snakeCoords[0]; // only one piece
  },

  setApple: function() {
    this.appleCoords = this.getRandCoords();
    this.snakeCoords.forEach(function(coords) {
      if (helper.coordsMatch(model.appleCoords, coords)) {
        model.setApple();
        return;
      }
    });
  },

  moveSnake: function() {

    // Get duplicate of current head & initialize
    var newHeadCoords = helper.cloneObject(this.headCoords);

    // Get coordinates of new head
    switch(this.currentDirection) {
      case 'U': // up
        newHeadCoords.y += 1;
        break;
      case 'D': // down
        newHeadCoords.y -= 1;
        break;
      case 'L': // left
        newHeadCoords.x += 1;
        break;
      case 'R': // right
        newHeadCoords.x -= 1;
        break;
      default:
        return false;
    }

    // Set new head
    this.snakeCoords.push(newHeadCoords);
    this.headCoords = this.snakeCoords[this.snakeCoords.length - 1];

    // Remove tail, but save it to update view
    this.oldTailCoords = this.snakeCoords.shift();

    // Set new tail
    this.tailCoords = this.snakeCoords[0];

  },

  updateDirection: function(newDirection) {
    if (helper.oppositeDirection[this.currentDirection] !== newDirection) {
      this.currentDirection = newDirection;
    }
  },

  appleEaten: function() {
    return helper.coordsMatch(
      this.snakeCoords[this.snakeCoords.length - 1], // snake head
      this.appleCoords
    );
  },

  growSnake: function() { // same as moveSnake, doesn't delete tail

    // Get duplicate of current head & initialize
    var newHeadCoords = helper.cloneObject(this.headCoords);

    // Get coordinates of new head
    switch(this.currentDirection) {
      case 'U': // up
        newHeadCoords.y += 1;
        break;
      case 'D': // down
        newHeadCoords.y -= 1;
        break;
      case 'L': // left
        newHeadCoords.x += 1;
        break;
      case 'R': // right
        newHeadCoords.x -= 1;
        break;
      default:
        return false;
    }

    // Set new head
    this.snakeCoords.push(newHeadCoords);
    this.headCoords = this.snakeCoords[this.snakeCoords.length - 1];

  },

  snakeCollided: function() {

    // Check if head's X values are out of bounds
    if (this.headCoords.x < 0 || this.headCoords.x >= this.gridSize) {
      return true;
    };

    // Check if head's Y values are out of bounds
    if (this.headCoords.y < 0 || this.headCoords.y >= this.gridSize) {
      return true;
    };

    // Check if snake collided with itself
    var selfCollision = false;
    if (this.snakeCoords.length > 1) {
      this.snakeCoords.slice(0, this.snakeCoords.length-1).forEach(function(coords) {
        if (helper.coordsMatch(model.headCoords, coords)) {
          selfCollision = true;
        }
      });
    }
    if (selfCollision) { return true; }

    // No collisions
    return false;

  },

  resetGame: function() {
    this.snakeCoords = [];
    this.headCoords = {};
    this.tailCoords = {};
    this.oldTailCoords = {};
    this.currentDirection = 'R';
    this.appleCoords = {};
    this.rotation = 0;
  }

};
