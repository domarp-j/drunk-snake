var helper = {

  coordsMatch: function(coords1, coords2) {
    return coords1.x === coords2.x && coords1.y === coords2.y;
  },

  cloneObject: function(obj) {
    return $.extend({}, obj);
  },

  oppositeDirection: {
    'U': 'D',
    'D': 'U',
    'L': 'R',
    'R': 'L'
  }
}
