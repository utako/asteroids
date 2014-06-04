(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var Game = Asteroids.Game = function (height, width, ctx) {
    this.ctx = ctx;
    this.level = 1;
    this.score = 0;
    this.maxAsteroids = 10;
    this.height = height;
    this.width = width;
    this.HUD = new Asteroids.HUD(ctx, this);
    this.bindKeyHandlers();
    this.mode = 'start';
    this.startScreen();
  };
  
  Game.FPS = 30;
    
  Game.prototype.setUp = function () {
    this.asteroids = [];
    this.bullets = [];
    this.ship = new Asteroids.Ship([(this.width/2),(this.height/2)], 20, "#A83B00", 90, 0);
  };
  
  Game.prototype.startScreen = function() {
    this.asteroids = [];
    this.bullets = [];
    this.ship = new Asteroids.Ship([(this.width/2),(this.height/2)], 20, "#A83B00", 45, -1);
    this.addAsteroids(20);
  };
  
  Game.prototype.draw = function () {
    ctx.clearRect(0, 0, this.width, this.height);
    var game = this;
    this.ship.drawShip(ctx);
    this.asteroids.forEach ( function (asteroid) {
      asteroid.draw(ctx);
    });
    this.bullets.forEach ( function (bullet) {
      bullet.draw(ctx);
    });
    if (this.mode === 'start') {
      this.HUD.drawStart();      
    } else if (this.mode === 'play') {
      this.HUD.drawPlay(this.level, this.score);
    } else if (this.mode == 'nextLevel') {
      this.HUD.drawNextLevel(this.level, this.score);
    }
  };
  
  Game.prototype.winningConditions = function () {
    if (this.asteroids.length === 0) {
      this.mode = 'nextLevel';
      this.maxAsteroids = this.maxAsteroids + 5;
      this.addAsteroids(this.maxAsteroids);
      this.level++;
      this.ship.mag = 0;
      this.ship.pos = [(this.width/2),(this.height/2)];
    }
  };
  
  Game.prototype.step = function() {
    this.move();
    this.draw(this.ctx);

    var keys = key.getPressedKeyCodes();
    if (keys.indexOf(38) > -1) {
      game.ship.power(-.25);
    }
    if (keys.indexOf(37) > -1) {
      game.ship.rotate(-5);
    }
    if (keys.indexOf(39) > -1) {
      game.ship.rotate(5);
    }
    if (keys.indexOf(40) > -1) {
      game.ship.power(.25);
    }
    
    if (this.mode === 'play') {
      this.checkCollisions();
      game = this;
      game.bullets.forEach(function(bullet) {
        bullet.hitAsteroids.bind(bullet)();
      });
      this.winningConditions();
    }
  };
  
  Game.prototype.move = function(){
    var asteroids = this.asteroids;
    var game = this
    this.asteroids.forEach(function(asteroid){
      asteroid.move();
      if (asteroid.pos[0] >= window.innerWidth){
        var newVel = [-asteroid.vel[0], asteroid.vel[1]];
        game.asteroids.push(new Asteroids.Asteroid(asteroid.pos, newVel, asteroid.radius, asteroid.color));
        asteroids.splice(asteroids.indexOf(asteroid), 1);
      }
      else if (asteroid.pos[1] >= window.innerHeight ){
        var newVel = [asteroid.vel[0], -asteroid.vel[1]];
        game.asteroids.push(new Asteroids.Asteroid(asteroid.pos, newVel, asteroid.radius, asteroid.color));
        asteroids.splice(asteroids.indexOf(asteroid), 1);
      }
      else if (asteroid.pos[0] <= 0) {
        var newVel = [-asteroid.vel[0], asteroid.vel[1]];
        game.asteroids.push(new Asteroids.Asteroid(asteroid.pos, newVel, asteroid.radius, asteroid.color));
        asteroids.splice(asteroids.indexOf(asteroid), 1);
      }
      else if (asteroid.pos[1] <= 0){
        var newVel = [asteroid.vel[0], -asteroid.vel[1]];
        game.asteroids.push(new Asteroids.Asteroid(asteroid.pos, newVel, asteroid.radius, asteroid.color));
        asteroids.splice(asteroids.indexOf(asteroid), 1);
      }

    });
    this.ship.move();
    if (this.ship.pos[0] <= 0 || this.ship.pos[0] >= window.innerWidth || this.ship.pos[1] <= 0 || this.ship.pos[1] >= window.innerHeight) {
    var pos;
      if (this.ship.pos[0] <= 0) {
        pos = [window.innerWidth, window.innerHeight-this.ship.pos[1]];
      } else if (this.ship.pos[0] >= window.innerWidth) {
        pos = [0, window.innerHeight - this.ship.pos[1]];
      } else if (this.ship.pos[1] <= 0) {
        pos = [window.innerWidth - this.ship.pos[0], window.innerHeight];
      } else if (this.ship.pos[1] >= window.innerHeight) {
        pos = [window.innerWidth - this.ship.pos[0], 0];
      }
      var radius = this.ship.radius;
      var color = this.ship.color;
      var theta = this.ship.theta;
      var mag = this.ship.mag;
      this.ship = new Asteroids.Ship(pos, radius, color, theta, mag);
    }
    this.bullets.forEach (function(bullet) {
      bullet.move();
    });
  };
  
  Game.prototype.resetObjects = function () {
    this.asteroids = [];
    this.ship = null;
    this.bullets = [];
  };
  
  Game.prototype.startPlaying = function (numAsteroids) {
    this.mode = 'play';
    this.stop();
    this.resetObjects();
    this.setUp();
    this.start();
    this.addAsteroids(numAsteroids);
  };
  
  
  Game.prototype.start = function () {
    var game = this;
    this.interval = setInterval(game.step.bind(game), Game.FPS);
  };
  
  Game.prototype.stop = function () {
    clearInterval(this.interval);
  };
  
  Game.prototype.addAsteroids = function (numAsteroids) {
    for (var i=0; i<numAsteroids; i++) {
      var randAsteroid = Asteroids.Asteroid.randomAsteroid();
      this.asteroids.push(randAsteroid);
    }
  };

  Game.prototype.addSubAsteroids = function (asteroid, bullet) {
      var subAsteroid0 = Asteroids.Asteroid.subAsteroid(asteroid, bullet)[0];
      var subAsteroid1 = Asteroids.Asteroid.subAsteroid(asteroid, bullet)[1];
      this.asteroids.push(subAsteroid0);
      this.asteroids.push(subAsteroid1);
  };

  Game.prototype.fireBullet = function() {
    var game = this;
    var bullet = this.ship.fireBullet(game);
    this.bullets.push(bullet);
  };

  Game.prototype.removeAsteroid = function(asteroid) {
    this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
//    delete this.asteroids[this.asteroids.indexOf(asteroid)];
  };

  Game.prototype.removeBullet = function(bullet) {
    // delete this.bullets[this.bullets.indexOf(bullet)];
    this.bullets.splice(this.bullets.indexOf(bullet), 1);
  };

  Game.prototype.checkCollisions = function() {
    var ship = this.ship;
    var game = this;
    this.asteroids.forEach(function(asteroid) {
      if (ship.isCollidedWith.bind(ship, asteroid)()) {
        // game.explodeShip();
       game.stop();
       var message = "GAME OVER. YOUR SCORE: " + game.score;
       game.ctx.textAlign = 'center';
       game.ctx.font = "60px sans-serif";
       game.ctx.fillStyle = "white";
       game.ctx.fillText(message, canvas.width/2, canvas.height/2);

      }
    });
  };

  Game.prototype.bindKeyHandlers = function(){
    var game = this;
    key('f', function() {game.start(10)} );
    key('enter', function() {game.startPlaying(game.maxAsteroids)});
    $(document).keyup(function(event) {
      if (event.keyCode === 32) {
        game.fireBullet();
      }
    })
  };
  
})(this);
