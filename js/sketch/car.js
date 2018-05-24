function Car(canvas){
  this.w = 40;
  this.h = 60;
  this. y = canvas.height - (this.h+30);
  this.x = canvas.width/2;
  this.moveSpeed = 5;

  this.show = function(){
    canvas.fill(255);
    canvas.image(carImg, this.x, this.y, this.w, this.h);
  }

  this.moveLeft = function(){
    if(gameOver){
      return false;
    }
    if(this.x <= 0){
      this.x = 10;
    }else{
      this.x -= this.moveSpeed;
    }
  }

  this.moveRight = function(){
    if(gameOver){
      return false;
    }
    if((this.x+this.w) >= canvas.width){
      this.x = canvas.width - (this.w+10);
    }else{
      this.x += this.moveSpeed;
    }
  }

  this.explodeIt = function(explode, explodeSound){
    var jqueryCanvas = $("#canvas-container > canvas");
			explode.position( (jqueryCanvas.position().left+(this.x - 50)) , (jqueryCanvas.position().top+(this.y - 100)));
			explode.show();

			if(playOnce == 0){
				if(!explodeSound.isPlaying()){
					explodeSound.playMode('restart');
					explodeSound.setVolume(0.3);
					explodeSound.play();
				}
				playOnce = 1;
			}
  }

}
