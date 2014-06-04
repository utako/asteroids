(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  sin = function (degrees) {
    var rads = degrees.toRads();
    return Math.sin(rads);
  };

  cos = function (degrees) {
    var rads = degrees.toRads();
    return Math.cos(rads);
  };

  Number.prototype.toRads = function () {
    return (2 * parseInt(this) * Math.PI)/360;
  };

})(this);
