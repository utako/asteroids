(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(pos, vel, radius, color){
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
  };

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.COLORS = ["#A5C7C1", "#D1E0DE", "#8CA39F", "#C8E0E3", "#ACC2B1", "#D3E0BF"];

  Asteroid.randomAsteroid = function () {
    var dimX1 = getRandom(0, window.innerWidth/2 - 100);
    var dimY1 = getRandom(0, window.innerHeight/2 - 100);
    var dimX2 = getRandom(window.innerWidth/2 + 100, window.innerWidth);
    var dimY2 = getRandom(window.innerHeight/2 + 100, window.innerHeight);
    var positions = [[dimX1, dimY1], [dimX2, dimY2], [dimX1, dimY2], [dimX2, dimY1]];
    var pos = positions[Math.floor(Math.random()*4)];
    var vel = Asteroid._randomVec();
    var radius = Math.random() * 100 + 10;
    var color = Asteroid.COLORS[Math.floor(Asteroid.COLORS.length * Math.random())];
    return new Asteroid(pos, vel, radius, color);
  };

  var getRandom = function (min, max) {
    return Math.random() * (max - min) + min;
  }

  Asteroid.subAsteroid = function(asteroid, bullet) {
    var pos = asteroid.pos;
    var vels = Asteroid._computeSubAsteroidVel(asteroid, bullet);
    var radius = asteroid.radius/2;
    var color = asteroid.color;
    return [new Asteroid(pos, vels[0], radius, color), new Asteroid(pos, vels[1], radius, color)]
  };

  Asteroid._computeSubAsteroidVel = function(asteroid, bullet) {
    var orig_vel = asteroid.vel;
    var new_mag = - Math.abs((bullet.mag * Math.sqrt(Math.pow(bullet.radius, 2)/Math.pow(asteroid.radius, 2)) - Math.sqrt(Math.pow(asteroid.vel[0], 2) + Math.pow(asteroid.vel[1], 2))));
    var new_vels = [];
    var newTheta = Asteroid._computeNewTheta(asteroid, bullet);
    new_vels.push([new_mag*cos(newTheta-45), new_mag*sin(newTheta-45)]);
    new_vels.push([new_mag*cos(newTheta+45), new_mag*sin(newTheta+45)]);

    return [new_vels[0], new_vels[1]]
  };

  Asteroid._computeNewTheta = function(asteroid, bullet) {
    var asteroidTheta = Math.atan(-asteroid.pos[1]/asteroid.pos[0]);
    var midTheta = bullet.theta + (bullet.theta - asteroidTheta)/2;
    return midTheta;
  };

  Asteroid._randomVec = function() {
    var max = 5;
    var velX = Math.floor(Math.random() * (max + 1)) - 1;
    var velY = Math.floor(Math.random() * (max + 1)) - 1;
    return [velX, velY]
  };
  

})(this);
