window.onload = function() {
    var loginBtn = document.getElementById("Loginbutton")
    loginBtn.onclick = function(){
        var Username = document.getElementById("Username").value 
        var Password = document.getElementById("Password").value 
        
        if (Username.trim().length === 0){
            alert("You must input Username!")
            return false
        }
        
        if (Password.trim().length === 0){
            alert("You must input password!")
            return false
        }
        return true
    }
}
