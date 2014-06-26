(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var RotatingObject = Asteroids.RotatingObject = function (pos, radius, color, theta, mag){
    var colors = ["#155919", "#20918C", "#FADB50", "#7D41CC", "#A3263D"];
    this.pos = pos;
    this.radius = (radius * Math.random());
    this.color = colors[Math.floor(colors.length*Math.random())];
    this.theta = theta;
    this.mag = mag;
  };

  RotatingObject.prototype.move = function(){
    var rotatingObject = this;
    var dx = parseInt(this.mag) * Math.cos((rotatingObject.theta).toRads());
    var dy = parseInt(this.mag) * Math.sin((rotatingObject.theta).toRads());
    this.pos  = [(this.pos[0] + dx), (this.pos[1] + dy)];
  };

  RotatingObject.prototype.draw = function(ctx) {

    var posX = this.pos[0];
    var posY = this.pos[1];
    var width = this.radius;
    var height = 0;
    var start = 2 * Math.PI;
    ctx.save();
    
    ctx.shadowColor = '#FFC363';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(posX, posY, width, height, start, false);
    ctx.fill();
    
    ctx.restore();
  };

  RotatingObject.prototype.drawShip = function(ctx) {
    var posX = this.pos[0];
    var posY = this.pos[1];
    ctx.beginPath();
    // ctx.globalAlpha = 0.5;
    ctx.fillStyle = this.color;
    ctx.moveTo(posX + 15*sin(-(90+this.theta)), posY + 15*cos((90+this.theta)));
    ctx.lineTo(posX+15*sin(-(30+270+this.theta)), posY+15*cos(-(30+270+this.theta)));
    ctx.lineTo(posX+15*sin(-(-30+270+this.theta)), posY+15*cos(-(-30+270+this.theta)));
    ctx.fill();
  };

  RotatingObject.prototype.isCollidedWith = function(otherObj) {
    var x1 = this.pos[0];
    var y1 = this.pos[1];
    var x2 = otherObj.pos[0];
    var y2 = otherObj.pos[1];
    var sumRadii = otherObj.radius + 15;
    var distX = Math.pow((x2-x1),2);
    var distY = Math.pow((y2-y1),2);

    if(Math.sqrt(distX + distY) < (sumRadii)){
      return true;
    }
    else {
      return false;
    }
  };


})(this);
