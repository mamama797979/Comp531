//Get element id
var v1=document.getElementById("id1")
var v2=document.getElementById("id2")
var v3=document.getElementById("id3")
var v4=document.getElementById("id4")
var v5=document.getElementById("id5")
var v6=document.getElementById("id6")
var v7=document.getElementById("id7")
var v8=document.getElementById("id8")
var v9=document.getElementById("id9")
var v10=document.getElementById("id10")
var v11=document.getElementById("id11")
var v12=document.getElementById("id12")

//Main function to check validity of the field, set field to new value and pop up alert information.
function update(){

    if (!v5.checkValidity()) {
        window.alert("Fill out your phone number! Must be ten digits");
		return;
	}

	if (!v7.checkValidity()) {
        window.alert("Fill out Zipcode! Must be five digits");
		return;
	}

    if (!v9.checkValidity()) {
        window.alert("Fill out password!");
		return;
	}

    if (!v11.checkValidity()) {
        window.alert("Retype your password! Password must match");
		return;
	}	
    
    if(Validatepassword()){
    	return;
    }
        
     Setfield();   

} 

//A seperate function defined to validate email, it is executed in update.
function validateEmail() {
    var x = v3.value;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        window.alert("Not a valid e-mail address!");
        return true;
    }
}

//A seperate function defined to validate password, it is executed in update.
function Validatepassword() {
    var password = v9.value;
    var confirmPassword = document.getElementById("id11").value;
    if (password != confirmPassword) {
        window.alert("Passwords do not match.");
        return true;
    }
}

//A seperate function to set the text, it is executed in update.
function Setfield(){
    if (v1.value){
        if (v2.innerHTML!=v1.value) {
            window.alert("Display name have been changed from "+v2.innerHTML+" to "+v1.value);
            v2.innerHTML=v1.value;
            v1.value=""
        }
    }

    if (v3.value){
        if(validateEmail()){
            return;
        }

        if (v4.innerHTML!=v3.value) {
            window.alert("Email have been changed from "+v4.innerHTML+" to "+v3.value);
            v4.innerHTML=v3.value;
            v3.value=""
        }
    }

    if (v5.value){
        if (v6.innerHTML!=v5.value) {
            window.alert("Phone number have been changed from "+v6.innerHTML+" to "+v5.value);
            v6.innerHTML=v5.value;
            v5.value=""
        }
    }

    if (v7.value){
        if (v8.innerHTML!=v7.value) {
            window.alert("Zipcode have been changed from "+v8.innerHTML+" to "+v7.value);
            v8.innerHTML=v7.value;
            v7.value=""
        }
    }

    if (v9.value){
        if (v10.innerHTML!=v9.value) {
            window.alert("Password have been changed from "+v10.innerHTML+" to "+v9.value);
            v10.innerHTML=v9.value;
            v9.value=""
        }
    }

    if (v11.value){
        if (v12.innerHTML!=v11.value) {
            window.alert("Password confirmation have been changed from "+v12.innerHTML+" to "+v11.value);
            v12.innerHTML=v11.value; 
            v11.value=""
        }
    }
}
