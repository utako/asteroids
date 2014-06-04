(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function(pos, radius, color, theta, mag){
    this.pos = pos;
    this.radius = radius;
    this.color = color;
    this.theta = theta;
    this.mag = mag;
  }
  Ship.inherits(Asteroids.RotatingObject);

  Ship.prototype.power = function (impulse) {
    if (impulse > 0 && impulse + this.mag > 0) {
      this.mag = 0;
    } else {
      this.mag += impulse;
    }
  };

  Ship.prototype.rotate = function (theta) {
    this.theta += theta;
  };

  Ship.prototype.fireBullet = function(game) {
    var ship = this;
    if (ship.vel !== 0) {
      var bulletPos = ship.pos;
      var bulletMag = -40;
      return new Asteroids.Bullet(bulletPos, 2, "white", ship.theta, bulletMag, game)
    }
  };

})(this);
