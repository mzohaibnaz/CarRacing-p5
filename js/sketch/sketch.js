var carImg = null;
var blockImages = [];
var explode = null;
var speedSound = null;
var explodeSound = null;

var playOnce = 0;
var gameOver = false;
var userScore = 0;

var scatch = function(canvas){
	var car;
	var block = [];
	
	canvas.preload = function() {
		carImg = canvas.loadImage('preloads/car.png');
 	    blockImages[0] = canvas.loadImage('preloads/car-0.png');
		blockImages[1] = canvas.loadImage('preloads/car-1.png');
		blockImages[2] = canvas.loadImage('preloads/car-2.png');
        
		explode = canvas.createImg('preloads/explode.gif');
		explode.hide();
		speedSound = canvas.loadSound('preloads/speed-acc.mp3');
		explodeSound = canvas.loadSound('preloads/explode.mp3');
	}

	canvas.setup = function() {
	   $("#canvas-container").contents().filter(function () {
            return this.nodeType === 3; 
        }).remove();
        canvas.createCanvas(400, 600);
		car = new Car(canvas);
		startGame();
	}

	function startGame(){
		for(var i = 0; i < canvas.floor(canvas.width/50); i++){
			var blockObj = new Block(canvas);
			blockObj.location();
			block.push(blockObj);
		}
	}

	restartGame = function(){
		if(gameOver){
			explode.hide();
			playOnce = 0;
			userScore = 0;
			gameOver = false;
			if(explodeSound.isPlaying()){
				explodeSound.stop();
			}
			startGame();
		}
	}

	canvas.draw = () => {
	   
		canvas.background(90);

		// game score 
                
		canvas.push();
		canvas.textSize(22);
		canvas.fill(0, 0, 0);
		canvas.text('Score: '+userScore, 10, 30);
		canvas.pop();
			
		// if game is over
		if(gameOver){
			
			canvas.push();
			canvas.textSize(32);
			canvas.fill(0, 0, 0);
			canvas.textAlign(canvas.CENTER);
			canvas.text('Game Over!', (canvas.width/2), (canvas.height/2));
			canvas.pop()
			block = [];

			car.explodeIt(explode, explodeSound);

		}
		// blocks
		block.forEach(b => {
			b.show();
			b.move();
			if(b.crash(car)){
				gameOver = true;
			}
		});

		// car
		car.show();
		if(canvas.keyIsDown(39)){
			car.moveRight();
		}else if(canvas.keyIsDown(37)){
			car.moveLeft();
		}

		if(canvas.keyIsDown(32)){
				block.forEach(b => {
					if(b.speed < 13){
						b.speed += 0.1;
					}
				});
				if(!speedSound.isPlaying()){
					speedSound.playMode('restart');
					speedSound.setVolume(0.3);
					speedSound.play();
				}
				car.moveSpeed = 8;
		}else{
			block.forEach(b => {
				if(b.speed >= 5){
					b.speed -= 0.1;
				}
			});
			car.moveSpeed = 5;
			if(speedSound.isPlaying()){
				speedSound.stop();
			}
		}
	}
    
    canvas.keyPressed = function(){
        if(canvas.keyCode == 13){
            restartGame();
        }
    }
}
$(document).ready(function(){
    var game = new p5(scatch, 'canvas-container');
});