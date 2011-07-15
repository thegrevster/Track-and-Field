/**
 * LBi Track & Field JS
 * @version 1.0
 * @author Robert Greville - http://www.lbi.com/en
*/

/* Variables
---------------------------------------*/

var canvas;  
var ctx;
var steps = 10;
var r1x = 10;
var r1y = 80;
var r2x = 10;
var r2y = 170;
var width = 600;
var height = 241;
var background = new Image();
var runner1 = new Image();
var runner2 = new Image();
var finished = false;
var player1name = prompt('Player 1 - Enter your name');
var player2name = prompt('Player 2 - Enter your name');
var key1 = false;
var key2 = false;
var key3 = false;
var key4 = false;
var timer = setTimeout(onTimeout, 4000);
var framenumber = 0;
var countdown = 4;

/* Images/imports
---------------------------------------*/

background.src = 'images/bg.gif';
runner1.src = 'images/runner1.png'
runner2.src = 'images/runner2.png'

/* Functions
---------------------------------------*/

function init() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	return setInterval(draw, 10);
}

if(window.G_vmlCanvasManager){
	document.getElementById('canvas');
	ctc = canvas.getContext(canvas);
}

function rect(x,y,w,h) {
	ctx.beginPath();
	ctx.rect(x,y,w,h);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

function clearCanvas() {
	ctx.clearRect(0, 0, width, height);
}

function doKeyDown(evt){	
	if (finished){
		return
	}
	if (evt.keyCode === 90) {
		runner1.src = 'images/runner1.png';
		if(key1){
			key1 = key2 = false;
		}
		key1 = true;
	}
	if (evt.keyCode === 88) {
		runner1.src = 'images/runner1_2.png';
		key2 = true;
	}
	if(key1 && key2){
		//move the guy
		if (r1x + steps < width) {
			r1x += steps; 
		}
		key1 = key2 = false;
	}
	if (evt.keyCode === 78) {
		runner2.src = 'images/runner2.png';
		if(key3){
			key3 = key4 = false;
		}
		key3 = true;
	}
	if (evt.keyCode === 77) {
		runner2.src = 'images/runner2_2.png';
		key4 = true;
	}
	if(key3 && key4){
		//move the guy
		if (r2x + steps < width) {
			r2x += steps; 
		}
		key3 = key4 = false;
	}
}

function names() {
	ctx.font = "bold 20px sans-serif";
	ctx.fillText(player1name, 35, 135);
	ctx.font = "bold 20px sans-serif";
	ctx.fillText(player2name, 35, 225);
}


function draw() {
	clearCanvas();
	rect(0,0,width,height);
	ctx.drawImage(background,0,0);
	names();
	framenumber++;
	if (framenumber%100 === 0 && countdown){
		countdown--;
	}
	if (countdown >= 2){
		ctx.font = "bold 40px sans-serif";
		ctx.fillText(countdown-1, width / 2, 50);
		ctx.textAlign = "center";
	}
	if (countdown === 1){
		ctx.font = "bold 40px sans-serif";
		ctx.fillText("GO", width / 2, 50);
		ctx.textAlign = "center";
	}
	ctx.drawImage(runner1,r1x,r1y);
	ctx.drawImage(runner2,r2x,r2y);
	if (r1x >= 566) {
		finished = true;
		document.getElementById('audio1').pause();
		ctx.clearRect(0, 0, width, height);
		rect(0,0,width,height);
		ctx.drawImage(background,0,0);
		ctx.drawImage(runner1,r1x,r1y);
		ctx.drawImage(runner2,r2x,r2y);
		ctx.font = "bold 20px sans-serif";
		ctx.fillText("The Winner is " + player1name, width / 2, 135);
		ctx.textAlign = "center";
	}
	if (r2x >= 566) {
		finished = true;
		document.getElementById('audio1').pause();
		ctx.clearRect(0, 0, width, height);
		rect(0,0,width,height);
		ctx.drawImage(background,0,0);
		ctx.drawImage(runner1,r1x,r1y);
		ctx.drawImage(runner2,r2x,r2y);
		ctx.font = "bold 20px sans-serif";
		ctx.fillText("The Winner is " + player2name, width / 2, 135);
		ctx.textAlign = "center";
	}
}

/* Initilisation
---------------------------------------*/

window.focus();

document.getElementById('audio1').play();

init();

function onTimeout() {
	window.addEventListener('keydown',doKeyDown,true);
}

document.getElementById('audio1').addEventListener('ended', function(){
	this.currentTime = 0;
}, false);