var createApp = function(canvas) { 
	var c = canvas.getContext("2d");
	var sun=100;
	var floor = canvas.height/2
	var carheight=canvas.height/20
	var carwidth=canvas.width/10
	var wheelradius=canvas.height/80
	var x=carwidth/4
	var sunx=50
	var suny=100
	var sunr=wheelradius;

	setInterval(repaint,100)
	
	function repaint(){
		fillcircle()
		sunmove()
	}
	//window.requestAnimationFrame(fillcircle);
	function fillcircle(){
		c.clearRect(0,floor-carheight,1000,carheight);
		c.fillStyle="#FF0000";
		c.fillRect(x-carwidth/4, floor-carheight, carwidth, carheight-wheelradius)	
		c.beginPath();
		c.arc(x, floor-wheelradius, wheelradius, 0, 2 * Math.PI)
		c.arc(x+carwidth/2, floor-wheelradius, wheelradius, 0, 2 * Math.PI)
		c.fillStyle="#blue";
		c.fill()
		c.closePath();
		if(x<(800-carwidth)){
			x=x+10;
		}
		else{
			x=carwidth/4
		}
	}

	function sunmove(){
		c.clearRect(0,0,canvas.width,110);	
		c.beginPath();
		c.arc(sunx, suny, wheelradius, 0, 2 * Math.PI)
		c.fillStyle="orange";
		c.fill()
		c.closePath();
		if((sunx<canvas.width-sunr)&(suny>0)){
			sunx=sunx+10;
			suny=suny-10;
		}
		else{
			sunx=50
			suny=100
		}
	}
	// Create the ground
	var floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'] 

	//build a building
	var build = function() { 
		var x0 = Math.random()*canvas.width
		var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
		var blgHeight = Math.random()*canvas.height/2

		c.fillStyle= blgColors[ Math.floor(Math.random()*blgColors.length)]
		c.fillRect(x0, floor - blgHeight, blgWidth, blgHeight)
		c.fillStyle="yellow"
		for (var y = floor - floorSpacing; y > floor - blgHeight; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < blgWidth - windowWidth; x += windowSpacing + windowWidth) {
				c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight)
			}
		}
	}

	return {
		build: build
	}
}

window.onload = function() {
	var app = createApp(document.querySelector("canvas"))
	document.getElementById("build").onclick = app.build
}


