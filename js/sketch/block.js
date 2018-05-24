function Block(canvas){
    
    this.x = 10;
    this.y = -20;
    this.w = 40;
    this.h = 60;
    this.speed = 5;
    this.easyEdge = -3;
    this.r = 255;
    this.g = 255;
    this.b = 255;
    
    this.image = blockImages[0];
    
    this.location = () => {
        var cols = canvas.floor(canvas.width/this.w);
        var r = canvas.floor(canvas.random(0,cols));
        this.x = (r*this.w);
        if(r == 0){
            r = 1;
        }
        this.y = - ((r*this.h) + canvas.random(r*100,r*200)) ;
        var rimg = canvas.floor(canvas.random(0, 3));
        this.image = blockImages[rimg];
    }

    this.show = () => {
        canvas.fill(this.r, this.g, this.b);
        canvas.image(this.image, this.x , this.y, this.w, this.h);
    }

    this.crash = (car) => {
        if((car.x+car.w) > this.x && car.x < (this.x+this.w) && (this.y+this.h) > car.y && this.y < (car.y+car.h)){
            this.g = 0;
            this.b = 0;
            return true;
        }   
        return false;
    }

    this.move = () => {
        if(this.y > canvas.height){
            this.g = 255;
            this.b = 255;
            userScore++;
            this.location();
        }
        
        this.y += this.speed;
    }

}