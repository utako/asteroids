(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function(pos, radius, color, theta, mag, game){
    this.pos = pos;
    this.radius = radius;
    this.color = color;
    this.theta = theta;
    this.mag = mag;
    this.game = game;
  };

  Bullet.inherits(Asteroids.RotatingObject);

  Bullet.prototype.hitAsteroids = function() {
    var bullet = this;
    var game = this.game;
    game.asteroids.forEach ( function(asteroid) {
      if (asteroid.isCollidedWith(bullet)) {
        if (asteroid.radius >= 30) {
          game.addSubAsteroids(asteroid, bullet);
        }
        game.removeAsteroid(asteroid);
        game.removeBullet(bullet);
        // if (game.score === 0) {
        //   game.score = 2;
        // } else {
        //   game.score *= 2;
        // }
        game.score += 5;
        bullet.explode();
      }
    });
  };

  Bullet.prototype.explode = function() {
    // var QUALITY = 4,
		// 	WIDTH = Math.floor(window.innerWidth / QUALITY),
    //   HEIGHT = Math.floor(window.innerHeight / QUALITY),
    //   SIZE = WIDTH * HEIGHT,
    // pixel, tempbuffer, buffer1, buffer2, data, image, pointers;
		// var iMax = (WIDTH * HEIGHT) - WIDTH;
    //
		// for (var i = WIDTH; i < iMax; i ++) {
    //
		// 	pixel = ((buffer1[i - 1] + buffer1[i + 1] + buffer1[i - WIDTH] + buffer1[i + WIDTH]) >> 1) - buffer2[i];
		// 	pixel -= pixel >> 20;
    //
		// 	buffer2[i] = pixel;
    //
		// 	pixel = pixel > 255 ? 255 : pixel < 0 ? 0 : pixel;
    //
		// 	data[ (i * 4) + 1 ] = pixel;
		// 	data[ ((i + 1) * 4) + 2 ] = pixel;
    //
		// }
    //
    // image = game.ctx.getImageData(0, 0, WIDTH, HEIGHT);
    // data = image.data;
    //
		// buffer1 = [];
		// buffer2 = [];
    //
		// for (var i = 0; i < SIZE; i ++) {
    //
		// 	buffer1[i] = 0;
		// 	buffer2[i] = i > WIDTH && i < SIZE - WIDTH && Math.random() > 0.995 ? 255 : 0;
		// }
    //
    //
		// tempbuffer = buffer1;
		// buffer1 = buffer2;
		// buffer2 = tempbuffer;
    //
		// game.ctx.putImageData(image, 0, 0);


    audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'blop.mp3');
    audioElement.play();
  };

})(this);
