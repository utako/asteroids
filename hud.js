(function(root){

  var Asteroids = root.Asteroids = (root.Asteroids || {});
  var HUD = Asteroids.HUD = function (ctx, game) {
    this.ctx = ctx;
    this.game = game;
    this.highScores;
  };
  
  HUD.prototype.drawStart = function () {
    var ctx = this.ctx;
    var dimX = this.game.width;
    var dimY = this.game.height;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.01)';
    ctx.fillRect(0, 0, dimX, dimY);

    ctx.fillStyle = '#D3DEE3'
    ctx.font = '64px Helvetica';
    ctx.textBaseLine = 'middle';
    ctx.textAlign= 'center';
    ctx.fillText('asteroids', dimX/2, dimY/2 - 25 );

    ctx.font = '20px Helvetica';
    ctx.fillText('please press [ enter ] to begin', dimX/2, dimY/2 + 70 );

    var instruct = "[ " + String.fromCharCode(8592)+ " ]  and  [ " + String.fromCharCode(8594) + " ]  to rotate  |  "
    instruct += "[ " + String.fromCharCode(8593) + " ]  to accelerate  |  "
    instruct += "[ " + String.fromCharCode(8595) + " ] to brake  |  "
    instruct += "[ space ] to fire";

    ctx.font = '16px sans-serif';
    ctx.fillText(instruct, dimX/2, dimY/2 + 100 );
    
  };
  
  HUD.prototype.drawPlay = function (level, score) {
    var ctx = this.ctx;
    var dimX = this.game.width;
    var dimY = this.game.height;
    ctx.font = "14pt sans-serif";
    ctx.fillStyle = "white";
    ctx.textAlign = 'left';
    var level = "Level " + level;
    ctx.fillText(level, 50, 50);
    var score = score + " Points";
    ctx.fillText(score, 50, 75);
  };
  
  HUD.prototype.drawNextLevel = function(level, score) {
    var ctx = this.ctx;
    ctx.save()
    var dimX = this.game.width;
    var dimY = this.game.height;
    ctx.fillStyle = 'white';
    ctx.font = "80pt sans-serif";
    ctx.textAlign = 'center';
    var level = "Level " + (parseInt(level)-1) + " Cleared";
    ctx.fillText(level, dimX/2, dimY/2);
    ctx.font = '20px Helvetica';
    ctx.fillText('please press [ enter ] to begin next level', dimX/2, dimY/2 + 70 );
    ctx.reset();
  };
  
  HUD.prototype.drawGameOver = function() {
    this.getHighScores();
    var highScores = this.highScores;
    var ctx = this.ctx;
    var dimX = this.game.width;
    var dimY = this.game.height;
    var j = 0;
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.globalAlpha=0.9;
    ctx.fillRect(dimX/2-175,dimY/4-58,350,365);
    ctx.restore();
    ctx.textAlign = 'center';
    ctx.fillStyle = '#9C2424';
    ctx.font = '40px Helvetica';
    var title = "HALL OF FAME";
    ctx.fillText(title, dimX/2, dimY/3-40);
    for (var i=(highScores.length-1); i>=(highScores.length-11); i--) {
      ctx.font = '20px Helvetica';
      ctx.fillStyle = '#9C2424';
      var name = highScores[i].name;
      var score = highScores[i].score;
      ctx.fillText(name, dimX/2-50, dimY/3+j*20);
      ctx.fillText(score, dimX/2+50, dimY/3+j*20);
      j++;
    };
  };
  
  HUD.prototype.getHighScores = function() {
    var url = 'https://api.mongolab.com/api/1/databases/asteroids/collections/highscores';
    var queryString = '?apiKey=YuwrD4eop-WZwClUO0P7jqNNaXh9uLLD';
    var HUD = this;
    $.ajax({
      url: url + queryString,
      type: "GET",
      dataType: 'json',
      success: function(data) {
        var sortedScores = _.sortBy(data, function(score) { return score.score } )
        HUD.highScores = sortedScores;
      }
    });
  };
  
  HUD.prototype.addHighScore = function(score, name) {
    var url = 'https://api.mongolab.com/api/1/databases/asteroids/collections/highscores';
    var queryString = '?apiKey=YuwrD4eop-WZwClUO0P7jqNNaXh9uLLD';
    var HUD = this;
    var scoreData = {
      name: name,
      score: score
    };
    $.ajax({
      url: url + queryString,
      type: "POST",
      data: JSON.stringify(scoreData),
      contentType: "application/json",
      success: function() {
        HUD.getHighScores();
      }
    });
  };

})(this);
