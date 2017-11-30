
var GamePiece;
var ball = [];
var ball2 = [];
var ball3 = [];
var sHeight = 500;
var sWidth = 500;
var nSecond = 00;
var nMinuts = 00;
var lTime;
var balls;
var time;
var interval;
var pause = true;

function startGame(){
	document.getElementById("Pause").src = "img/pause.png";
	document.getElementById("GamePad").style.top = sHeight-150+"px";
	document.getElementById("GamePad").style.left = sWidth/2 - 40+"px";
	
	alert("Start game.");
	GamePiece = new GameObject(document.getElementById("prota"), sWidth/2, sHeight/2);
	ball.push(new object(15,'purple'));	
	balls = setInterval(addBall,5000);
	time = setInterval(showTime,1000);
	interval = setInterval(updateGameArea, 20);
	myGameArea.start();	
}

function pr(){
	if(pause){
		document.getElementById("Pause").src = "img/start.png";
		for(var i = 0;i < 4;i++){
			document.getElementsByClassName("gamePad")[i].setAttribute("onclick"," ");
		}
		clearInterval(interval);
		clearInterval(time);
		clearInterval(balls);
		pause = false;
	}else if(!pause){
		document.getElementById("Pause").src = "img/pause.png";
		document.getElementsByClassName("gamePad")[0].setAttribute("onclick","moveUP()");
		document.getElementsByClassName("gamePad")[1].setAttribute("onclick","moveDown()");
		document.getElementsByClassName("gamePad")[2].setAttribute("onclick","moveLeft()");
		document.getElementsByClassName("gamePad")[3].setAttribute("onclick","moveRight()");
		
		balls = setInterval(addBall,15000);
		time = setInterval(showTime,1000);
		interval = setInterval(updateGameArea, 20);
		pause = true;
	}
}

function gamePad(){
	var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    var img=document.getElementById("scream");
    ctx.drawImage(img,10,10);
}

function showTime(){
	if(nSecond < 9){
		nSecond++;
		lTime = nMinuts + ":" + "0" + nSecond;
	}else if(nSecond >= 9 && nSecond < 59){
		nSecond++;
		lTime = nMinuts + ":" + nSecond;
	}else if(nSecond == 59 && nMinuts < 9){
		nMinuts++;
		nSecond = 00;
		lTime = nMinuts + ":" + nSecond;
	}else if(nMinuts >= 9 && nSecond < 59){
		nMinuts++;
		nSecond = 00;
		lTime = nMinuts + ":" + nSecond;
	}

	document.getElementById("time").innerHTML = lTime;
}

function GameObject(img, x, y,){
	this.width = 40;
    this.height = 80;   
    this.x = x;
    this.y = y;
	this.speedX = 0;
    this.speedY = 0.8;
	//this.color = color;
	this.img = img;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = this.color;
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
		//ctx.fillRect(this.x, this.y, this.width, this.height);
    }
	this.newPos = function(){
		if(this.x < (sWidth-this.width) && this.x > 0 && this.y > 0 && this.y < (sHeight-this.height)){
			this.x += this.speedX;
			this.y += this.speedY;
			
		}else if(this.x <=0){
			this.speedX = 0;
			this.x = 1;
		}else if(this.y <=0){
			this.speedY = 0;
			this.y = 1;
		}else if(this.x >= sWidth-this.width){
			this.speedX = 0;
			this.x = sWidth - (this.width + 1);
		}else if(this.y >= sHeight-this.height){
			this.speedY = 0;
			this.y = sHeight - (this.height + 1);
			//this.img = ;
		}
	}
	this.gameOver = function(ball){
		var gLeft = this.x;
		var gRight = this.x + this.width;
		var gTop = this.y;
		var gBottom = this.y + this.height;
		
		var bLeft = ball.x - ball.r;
		var bRight = ball.x + ball.r;
		var bTop = ball.y - ball.r;
		var bBottom = ball.y + ball.r;
		
		var GameOver = false;
		var c1 = false;
		var c2 = false;
		
		if((gTop <= bBottom && gTop >= bTop )|| (gBottom >= bTop && gBottom <= bBottom)){c1 = true;}
		if((gRight >= bLeft && gRight <= bRight) || (gLeft <= bRight && gLeft >= bLeft)){c2 = true;}
		
		if(c1 && c2){GameOver = true;}
		
		return GameOver;
	}
}

function addBall(){
	var randomBall = Math.floor(Math.random() * 3)+1;
	if(randomBall == 1){
		ball.push(new object(15,'purple'));
	}else if(randomBall == 2){
		ball2.push(new object(10,'blue'));
	}else if(randomBall == 3){
		ball3.push(new object(5,'green'));
	}	
}

var myGameArea = {
	canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = sWidth;
        this.canvas.height = sHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		//this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
	stop : function(){
		clearInterval(interval);
		clearInterval(time);
		clearInterval(balls);
		alert("Your time: " + lTime + "." + "\nRestart game.");
		this.restart();
	},
	restart : function(){
		GamePiece;
		ball = [];
		ball2 = [];
		ball3 = [];
		nSecond = 00;
		nMinuts = 00;
		lTime;
		balls;
		time;
		interval;
		pause = true;
		startGame();
	} 
}

function object(r,color){
	this.r = r;
	var randomPlace = Math.floor(Math.random() * 4);	
	if(randomPlace == 0){
		this.x = Math.floor(Math.random() * (myGameArea.canvas.width-10))+10;
		this.y = 1;
	}else if(randomPlace == 1){
		this.x = Math.floor(Math.random() * (myGameArea.canvas.width-10))+10;
		this.y = sHeight - 1;

	}else if(randomPlace == 2){
		this.y = Math.floor(Math.random() * (myGameArea.canvas.height-10))+10;
		this.x = 1;
	}else if(randomPlace == 3){
		this.y = Math.floor(Math.random() * (myGameArea.canvas.height-10))+10;
		this.x = sWidth - 1;
	} 		
	this.speedX = Math.floor(Math.random() * 3) + 1;
	this.speedY = Math.floor(Math.random() * 3) + 1;
	this.sAngle = 0;
	this.eAngle = 2*Math.PI;
	this.update = function() {
        ctx = myGameArea.context;
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.r,this.sAngle,this.eAngle);
		ctx.fillStyle = color;
        ctx.fill();
    }
	this.newPos = function(){
		if(this.x < (sWidth - this.r) && this.y < (sHeight - this.r) && this.x > 0 && this.y > 0){
			this.x += this.speedX;
			this.y += this.speedY;
		}else{
			if(this.y <= 0 || this.y >= sHeight){
				this.speedY = -1*this.speedY;
			}else if(this.x <= 0 || this.x >= sWidth){
				this.speedX = -1*this.speedX;
			}
			this.x += this.speedX;
			this.y += this.speedY;
		}
	}
	this.remove = function(array){
		this.r -=0.01;
		if(this.r <= 0){array.shift()}
	}
	this.bounce = function(ball){
		
		if(ball != undefined){
			var gLeft = this.x - this.r;
			var gRight = this.x + this.r;
			var gTop = this.y - this.r;
			var gBottom = this.y + this.r;
			
			var bLeft = ball.x - ball.r;
			var bRight = ball.x + ball.r;
			var bTop = ball.y - ball.r;
			var bBottom = ball.y + ball.r;
			
			var b1 = false;
			var b2 = false;
			
			if((gTop <= bBottom && gTop >= bTop )|| (gBottom >= bTop && gBottom <= bBottom)){b1 = true;}
			if((gRight >= bLeft && gRight <= bRight) || (gLeft <= bRight && gLeft >= bLeft)){b2 = true;}
			
			if(b1 && b2){
				this.speedY = -1*this.speedY;
				this.speedX = -1*this.speedX;
				this.x -= 1;
				this.y -= 1
				
				ball.speedY = -1*ball.speedY;
				ball.speedX = -1*ball.speedX;
				ball.x -= 1;
				ball.y -= 1;
			}
		}
	}
}
	
function updateGameArea() {
	for(i=0; i < ball.length; i++){
		if(GamePiece.gameOver(ball[i])){
			myGameArea.stop();
		}
	}
	for(i=0; i < ball2.length; i++){
		if(GamePiece.gameOver(ball2[i])){
			myGameArea.stop();
		}
	}
	for(i=0; i < ball3.length; i++){
		if(GamePiece.gameOver(ball3[i])){
			myGameArea.stop();
		}
	}
	myGameArea.clear();
	for (i=0; i < ball.length; i++) {
		ball[i].newPos();
		ball[i].update();
		for(j=0; j < ball.length; j++){
			if(i!=j){ball[i].bounce(ball[j])};
		}
		for(j=0; j < ball2.length; j++){
			ball[i].bounce(ball2[j]);
		}
		for(j=0; j < ball3.length; j++){
			ball[i].bounce(ball3[j]);
		}
		ball[i].remove(ball);
		
	}
	for (i=0; i < ball2.length; i++) {
		ball2[i].newPos();
		ball2[i].update();
		for(j=0; j < ball2.length; j++){
			if(i!=j){ball2[i].bounce(ball2[j])};
		}
		for(j=0; j < ball2.length; j++){
			ball2[i].bounce(ball[j]);
		}
		for(j=0; j < ball3.length; j++){
			ball2[i].bounce(ball3[j]);
		}
		ball2[i].remove(ball2);
	}

	for (i=0; i < ball3.length; i++) {
		ball3[i].newPos();
		ball3[i].update();
		for(j=0; j < ball2.length; j++){
			if(i!=j){ball3[i].bounce(ball3[j])};
		}
		for(j=0; j < ball2.length; j++){
			ball3[i].bounce(ball[j]);
		}
		for(j=0; j < ball3.length; j++){
			ball3[i].bounce(ball2[j]);
		}
		ball3[i].remove(ball3);
	}
	GamePiece.newPos();
	GamePiece.update();
}

function moveUp(){
	GamePiece.speedX = 0;
	GamePiece.speedY = -2;
}

// function moveDown(){
	// GamePiece.speedX = 0;
	// GamePiece.speedY = 2;
// }

function moveRight(){
	GamePiece.speedX = 2;
	GamePiece.speedY = 0;
}

function moveLeft(){
	GamePiece.speedX = -2;
	GamePiece.speedY = 0;
}

function moveClear(){
	GamePiece.speedX = 0;
	GamePiece.speedY = 0.8;
}
