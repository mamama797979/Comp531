//Set timer to stop and resume
var counter1=1;
var counter2=1;
var counter3=1;
var counter4=1;

//Get id of pictures and buttons
var src1 = document.getElementById("id1")
var src2 = document.getElementById("id4")
var src3 = document.getElementById("id5")
var src4 = document.getElementById("id6")

var Btn1 = document.getElementById("button1")
var Btn2 = document.getElementById("button2")
var Btn3 = document.getElementById("button3")
var Btn4 = document.getElementById("button4")

//Start cycle the picture
var time1=setInterval(gocard1,(Math.floor(Math.random() * 5) + 1)*1000);
var time2=setInterval(gocard2,(Math.floor(Math.random() * 5) + 1)*1000);
var time3=setInterval(gocard3,(Math.floor(Math.random() * 5) + 1)*1000);
var time4=setInterval(gocard4,(Math.floor(Math.random() * 5) + 1)*1000);

//Functions to cycle the cycle the pictures
function gocard1(){
	if(counter1%2){
	src1.src="http://news.rice.edu/files/2016/08/14141983_1049363265113012_3976368855154317823_n-1yh9sil-620x417.jpg"
	}
	if(!(counter1%2)){
	src1.src="http://news.rice.edu/files/2016/08/0829_BIRD-2medrmq-310x206.jpg"
	}
	counter1++;
}

function gocard2(){
	if(counter2%2){
	src2.src="http://www.rice.edu/_images/feature-rice-facts.jpg"
	}
	if(!(counter2%2)){
	src2.src="http://news.rice.edu/files/2016/08/14141983_1049363265113012_3976368855154317823_n-1yh9sil-620x417.jpg"
	}
	counter2++;
}

function gocard3(){
	if(counter3%2){
	src3.src="http://www.rice.edu/_images/feature-rice-facts.jpg"
	}
	if(!(counter3%2)){
	src3.src="http://www.rice.edu/_images/feature-why-rice.jpg"
	}
	counter3++;
}

function gocard4(){
	if(counter4%2){
	src4.src="http://www.rice.edu/_images/feature-rice-facts.jpg"
	}
	if(!(counter4%2)){
	src4.src="http://www.rice.edu/_images/feature-why-rice.jpg"
	}
	counter4++;
}

//Functions to pause the timer
function pauseTimer1(){
	clearInterval(time1)
	Btn1.value="Start"
}

function pauseTimer2(){
	clearInterval(time2)
	Btn2.value="Start"
}

function pauseTimer3(){
	clearInterval(time3)
	Btn3.value="Start"
}

function pauseTimer4(){
	clearInterval(time4)
	Btn4.value="Start"
}

//Function to resume the timer
function resume1(){
	time1=setInterval(gocard1,(Math.floor(Math.random() * 5) + 1)*1000)
	Btn1.value="Stop"
}

function resume2(){
	time2=setInterval(gocard2,(Math.floor(Math.random() * 5) + 1)*1000)
	Btn2.value="Stop"
}

function resume3(){
	time3=setInterval(gocard3,(Math.floor(Math.random() * 5) + 1)*1000)
	Btn3.value="Stop"
}

function resume4(){
	time4=setInterval(gocard4,(Math.floor(Math.random() * 5) + 1)*1000)
	Btn4.value="Stop"
}

//Button onclick function to execute pause and resume function 
Btn1.onclick = function() {
	if (Btn1.value =="Stop") {
		pauseTimer1()
	} else {
		resume1()
	}
}

Btn2.onclick = function() {
	if (Btn2.value =="Stop") {
		pauseTimer2()
	} else {
		resume2()
	}
}

Btn3.onclick = function() {
	if (Btn3.value =="Stop") {
		pauseTimer3()
	} else {
		resume3()
	}
}

Btn4.onclick = function() {
	if (Btn4.value =="Stop") {
		pauseTimer4()
	} else {
		resume4()
	}
}
