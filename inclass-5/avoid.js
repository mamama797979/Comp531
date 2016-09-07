var Obj = null;
var Obj = document.getElementById('button'); 

function init(){
    Obj.style.position= 'relative'; 
    Obj.style.left = '0px'; 
    div = document.getElementById('div');
    div.style.visibility="hidden";
}
            
function moveRight(){

	if(parseInt(Obj.style.left)<1200){
    	Obj.style.left = parseInt(Obj.style.left) + 100+ 'px';
	}
	else{
		Obj.style.left = parseInt(Obj.style.left) - 1000+ 'px';
	}
}

Obj.onclick=function (){
	if(Obj.value=="Click Me"){
		div.style.visibility="visible";
		Obj.value="Play Again"
	}
	else{
		Obj.value="Click Me"
		Obj.style.position= 'relative'
		div.style.visibility="hidden";
	}
}
            
window.onload =init;

function verify(){
    if(event.keyCode==16){
    	Obj.style.position= 'static';
    }
}
        
